"""
Living code in documents

generalises coding.js for multiple languages
also name-spaces it

dependiences:
  scheme: BiwaScheme
  javascript: SandboxJS - https://github.com/TooTallNate/SandboxJS
"""

# Constants
LIB_CLASS = "livecode"
RUNNING_CLASS = "running"
DEBUG = false

# Module
exports = {}


###
Helper functions --------------------------------------------------------------
###
if DEBUG
  log      = -> console.log.apply(console, arguments)
  logStart = -> console.group.apply(console, arguments)
  logEnd   = -> console.groupEnd.apply(console, arguments)
else
  log = logStart = logEnd = ->

$create = (tag) ->
  $(document.createElement(tag))

$get = (node) ->
  $(node).get(0)

hashContains = (hash, val) ->
  hash[val] != undefined


###
Helper classes ----------------------------------------------------------------
###
# A two-way dictionary lookup table, optionally constructable from a normal JS object
class TwoWayDict
  constructor: (hash) ->
    @key_value = {}
    @value_key = {}

    if hash?
      @key_value = hash
      for k, v of hash
        @value_key[v] = k

  # do we store a given value?
  contains: (v) ->
    hashContains(@key_value, v) or hashContains(@value_key, v)

  # add a new item
  assoc: (k, v) ->
    @key_value[k] = v
    @value_key[v] = k

  # do a lookup
  get: (k) ->
    val = @key_value[k]
    key = @value_key[k]
    val ? key


# Basic sets, relying on toString
class Set
  constructor: (array) ->
    @dict = {}

    if array?
      for o in array
        @add(o)

  add: (obj) ->
    @dict[obj] = true

  remove: (obj) ->
    delete @dict[obj]
    obj

  contains: (obj) ->
    @dict[obj] != undefined


# Provides basic toString uniqueness
class Id
# mainly used to add uniqueness to Id.toString()
  uuid_counter = 0
  uuid = ->
    uuid_counter = uuid_counter + 1
    "##{uuid_counter}"

  constructor: ->
    @__id = uuid()
  toString: ->
    "#{@constructor.name}<#{@__id}>"





###
Language Contexts -------------------------------------------------------------

a language environment with its own global scope
must have one method: eval, which takes code as a string,
and returns the result of evaluating that code in the context
  eval: returns any object suitable to append to the DOM.
        strings, DOM elemnts, numbers are OK
###
class Context extends Id
  eval: (code) ->
    log('evaling code in context', this, code)
    return code
  toString: ->
    "Context:#{super()}"

# REQUIRES: Sandbox.js
class JavascriptContext extends Context
  constructor: ->
    super()
    @ctx = new Sandbox(true)
  eval: (code) ->
    code = super(code)
    try
      return JSON.stringify(@ctx.eval(code))
    catch err
      return err.toString()

# REQUIRES: BiwaScheme
# class SchemeContext extends Context
#   constructor: ->
#     super()
#     @ctx = new BiwaScheme.Interpreter((e) ->
#       log(e.message))

#   eval: (code) ->
#     code = super(code)
#     try
#       return ctx.evaluate(code)
#     catch e
#       return e.toString()

# Note: code in the HTML context is never composed, and dependencies mean nothing.
# As of right now
class HTMLContext extends Context
  # template object
  iframe = $('<iframe seamless></iframe>').css
    width: '100%'
    height: '100%'

  eval: (code) ->
    # use load event to wait for a contentDocument DOM to be created
    elem = window.latest_frame = iframe.clone().load ->
      doc = this.contentDocument || this.contentWindow.document

      # 'eval' by writing HTML as the document of an iframe
      doc.open()
      doc.write(code)
      doc.close()

      # then resize the iframe to be as small as needed
      $(this).height(doc.body.scrollHeight)

    # return the iframe
    return elem



###
Module language exports -------------------------------------------------------

To add support for a language, add an entry to exports.languages with
  name:     [String]   name of the language to pass to editors
  context:  [Context]  evaluation context class for this language
###
exports.languages = {
  # scheme: {
  #   name: 'scheme'
  #   context: SchemeContext
  # }
  javascript: {
    name: 'javascript'
    context: JavascriptContext
  }
  html: {
    name: 'text/html'
    context: HTMLContext
  }
}

###
Codeblock ---------------------------------------------------------------------

###

class Codeblock extends Id
  constructor: (node, @language_name, @context, dependencies, cb, cbThis) ->
    super()
    $(node).addClass(RUNNING_CLASS)
    @depended_on_by = []
    @dependencies = []
    @current_evaluation_contexts = new Set()

    # tell dependencies that they'll need to reload us when they change
    if dependencies?
      for d in dependencies
        @addDep(d)

    # basic textarea-based editor UI
    @editor = new Editor(node, @language_name, cb, cbThis)
    @editor.addChangeCallback =>
      @eval()

  # evaluate asks editors up and down the dependency graph to re-evaluate
  # themselves
  eval: (special_context) ->
    # what context to use
    ctx = special_context || @context
    logStart('Codeblock Evaluation', @toString(), ctx.toString())

    # only run again if I haven't evaled for this graph traversal
    if @current_evaluation_contexts.contains(ctx)
      log('eval aborted: already evaled in this context')
      logEnd()
      return
    @current_evaluation_contexts.add(ctx)

    # first re-evaluate dependencies in the special context
    if @dependencies?
      for d in @dependencies
        d.eval(ctx)

    # EVALUATE IN CONTEXT -- WHERE THE MAGIC HAPPENS
    res = ctx.eval(@getCode())

    # re-evaluate everything depended-on by this
    if @depended_on_by?
      for d in @depended_on_by
        d.eval()

    # finished evaluating this item in its dependency graph
    @current_evaluation_contexts.remove(ctx)

    # run callbacks
    if @callbacks?
      for c in @callbacks
        c[0].call(c[1] ? null, res, this)

    # return the evaluation result
    logEnd()
    return res


  # Get the current value of the DOM editor
  getCode: ->
    @editor.getCode()

  # add a post-eval callback
  addCallback: (cbk, thisObject) ->
    if @callbacks?
      @callbacks.push([cbk, thisObject])
    else
      @callbacks = [[cbk, thisObject]]

  # add another codeblock as a dependence
  addDep: (ed) ->
    log('adding dep', ed)
    @dependencies.push(ed)
    ed.depended_on_by.push(this)

###
DOM UI Widgets-----------------------------------------------------------------
###

class Editor
  constructor: (node, lang_name, cb, cbThis) ->
    @changeCallbacks = []

    $node = $(node)
    log('Editor init', node, lang_name)
    code = $node.get(0).innerHTML
    # clean whitespace
    code = code.replace(/^\n/, "").replace(/\n*$/, "").replace(/[ \t]*\n/g, "\n").replace(/\s*$/, "")

    $node.empty()

    ed = CodeMirror($node[0], {
      value: code
      mode: lang_name
      # theme: 'vibrant-ink'
      onBlur: =>
        log('Editor.onBlur', @)
        for c in @changeCallbacks
          c(ed.getValue(), @)
    })

    # ed.setOption('extraKeys', {'Ctrl-Enter': ->
    #   ed.getOption("onBlur")()
    # })
    ed.setOption 'cursorBlinkRate', 460
    ed.setOption 'cursorHeight', 1.2
    ed.setOption 'lineWrapping', true # default is false (= scroll)
    if cb && !$node.hasClass('hide')
      cb.call cbThis, ed
    @editor = ed

  getCode: ->
    val = @editor.getValue()

    # var definitions returns 'undefined', console based lessons can wait
    #  for 2nd answer.  Don't work here, so need to get rid of it. 
    startsWithVar = /^\s*var\s+/

    # except for emptyCan exercise, which we'll need to show 'undefined'.
    #  Will need to come up w/ real fix..
    if val.indexOf('emptyCan') == -1 
      val = val.replace startsWithVar, ''
    val.replace /\s*\/\/((?!\n).)*\n/g, ';'

  addChangeCallback: (fn) ->
    @changeCallbacks.push(fn)



# Output the results from editors
class OutputWindow extends Id
  constructor: (node, @codeblock) ->
    log('OutputWindow init', node, @codeblock)

    # make sure we have the right classes
    # also we don't want to be scanned again
    @node = $(node).addClass("#{RUNNING_CLASS} output")

    @codeblock.addCallback(@updateCallback, @)
    # run code once so we start with an output
    # @codeblock.eval()

  updateCallback: (result) ->
    @node.trigger 'evaluate', [result, @codeblock]
    # @node.empty().append($create('span').append(result))


###
Declarative scanner -------------------------------------------------------

turns HTML5 like the following into LiveCode objects and widgets.
Manages contexts, named editors, and outputs.

See the documentation for information on the HTML5 API

  <div class="living-script javascript no-output" id="derp-1">
    log('derp')
  </div>

  <div class="living-script javascript" data-depends-on="derp-1">
    log('derp')
  </div>

  <div class="living-script javascript" data-context="new">
    log('derp')
  </div>
###
class Scanner
  constructor: ->
    # language controllers handle context management for thier own language
    @languageControllers = {}
    for name, lang of exports.languages
      @languageControllers[name] = new LanguageController(lang)

  allBlocks: ->
    res = []
    for _, controller of @languageControllers
      res = res.concat(controller.blocks)
    return res

  getNamedBlock: (name) ->
    for _, controller of @languageControllers
      candidate = controller.namedBlocks.get(name)
      if candidate?
        return candidate
    undefined

  scan: (node, cb, cbThis) ->
    block_nodes = $(node).find(".#{LIB_CLASS}:not(.#{RUNNING_CLASS}, .output)")
    block_nodes.each (_, n) =>
      # buid block (which calls the cb) on each codeblock found in node
      $n = $(n)
      for lang, controller of @languageControllers
        if $n.hasClass(lang)
          return controller.buildBlock(n, cb, cbThis)

    output_nodes = $(node).find(".#{LIB_CLASS}.output:not(.#{RUNNING_CLASS})")
    output_nodes.each((_, n) => @buildOutput(n))

    # other return values don't make much sense
    return this

  buildOutput: (node) ->
    $node = $(node)
    log(node, 'building output')
    output_for = $node.data('for')

    if not output_for
      throw Error("Script outputs must display results for a named editor")

    ed = @getNamedBlock(output_for)
    if not ed
      throw Error("No living-script named #{output_for} found")

    output = new OutputWindow(node, ed)


###
Language Controller -----------------------------------------------------------

A meta-context that manages named blocks, named contexts, and finding dependencies
using the HTML5 API. If you want to use LanguageController features, you should
use the HTML5 API right now -- There's no reason to use the LanguageController
outside of a scanning situation. You don't need one for dependencies and contexts to work.
You'll just have to track and store contexts yourself.

In charge of creating codeblocks and contexts from DOM nodes.
Tracks codeblock names
Tracks context names
see LanguageController.blocks for a list of all blocks scanned in this language

One controller per language in a Scanner.
###
class LanguageController
  constructor: (@language) ->
    @Context = @language.context
    @defaultContext = new @Context()
    @contexts = new TwoWayDict()
    @namedBlocks = new TwoWayDict()

    @blocks = []

  buildBlock: (node, cb, cbThis) ->
    $node = $(node)
    log(node, 'building editor')

    # determine context
    ctx_name = $node.data('context')
    if ctx_name
      if @contexts.contains(ctx_name)
        ctx = @contexts.get(ctx_name)
      else
        ctx = new @Context()
        @contexts.assoc(ctx_name, ctx)
    else
      ctx = @defaultContext

    # get dependiencies
    deps = $node.data('dependsOn')
    if deps
      log('with dependency', deps)
      deps = deps.split(' ').map (d) =>
        if @namedBlocks.contains(d)
          return @namedBlocks.get(d)
        else
          throw new Error("Named depencency #{d} undefined for language #{@language.name}")
    log('deps', deps)

    # create the block and save it
    block = new Codeblock(node, @language.name, ctx, deps, cb, cbThis)
    @blocks.push(block)

    # add output by default
    if not $node.hasClass('no-output')
      out_node = $create('div').insertAfter(node)
      out = new OutputWindow($get(out_node), block)

    # save to named editors so we can retrieve it for deps and outputs
    id = $node.attr('id')
    if id
      log('saved named editor', id, block)
      @namedBlocks.assoc(id, block)


# High-level HTML5 API activation
exports.scan = (node, cb, cbThis) ->
  (new Scanner()).scan(node, cb, cbThis)


# Code execution
exports.Context = Context
exports.Codeblock = Codeblock

# DOM widgets
exports.Editor = Editor
exports.OutputWindpw = OutputWindow

# scanning & building
exports.Scanner = Scanner
exports.LanguageController = LanguageController

window.LiveCode = exports
return exports