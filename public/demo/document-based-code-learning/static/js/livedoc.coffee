$ = jQuery

$create = (tag, cls='') ->
  $(document.createElement(tag)).addClass(cls)

$span = (s, cls) ->
  $create('span', cls).text s

$div = (s, cls) ->
  $create('div', cls).text s

$rightMark = () ->
  $span '✔', 'correct eval-mark'

$wrongMark = () ->
  $span '✘', 'wrong eval-mark'

$rightResult = (result) ->
  $span result, 'correct'

$wrongResult = (result) ->
  $span result, 'wrong'

$rightMsg = () ->
  $span 'Correct!', 'correct'

$wrongMsg = (result, expected, isCE) ->
  msg = 'Please try again.'
  if isCE and result and expected?
    return $span msg, 'wrong sorry'
  else if isCE and expected?
    return $span expected, 'wrong sorry'
  else if (not errored result) and (expected? and String(expected).indexOf('ReferenceError') == 0)
    return $span expected[16..]+'.', 'wrong sorry'
  $span msg, 'wrong sorry'

errored = (result) ->
  String(result).indexOf('null') == 0 or
  String(result).indexOf('SyntaxError') == 0 or
  String(result).indexOf('ReferenceError') == 0 

altEval = (result, altSolution) ->
  for sol in altSolution
    for method, val of sol
      if method == 'contains'
        if result.indexOf(val) == -1
          return false
      else if method == 'minLength'
        if result.length < val
          return false
  return true
    
stripQuotes = (s) ->
  s = s.replace /"\'/g, '"'
  s = s.replace /"\"/g, '"'
  s = s.replace /\'"/g, '"'
  s = s.replace /\""/g, '"'
  return s

ease =
  show: 'easeOutCirc'
  scrollNext: 'easeInOutQuad'
  scrollTo: 'easeOutCubic'
  speed: 1700

class Course
  constructor: ($course, $courseCE, @lessons) ->
    # @lessons: content lessons 
    @lesson = 1
    @exercise = 1
    @iExercise = 0

    @score = _(@lessons).map (lesson) -> 
      _.map lesson.exercises, (ex) -> 0
    @attempt = _.clone @score

    @_numExercises = [].concat(_.map @score, (lesson) -> lesson.length)
    @_nextExercise = _.map @score, (lesson) -> 1
    @_editors = []

    LiveCode.scan($course, (ed) ->
      @_editors.push(ed)
      ed.setOption 'extraKeys', 
        'Enter': ()-> ed.getOption("onBlur")()
    @)
    LiveCode.scan($courseCE, (ed) ->
      @_editors.push(ed)
      ed.setOption 'extraKeys', 
        'Ctrl-Enter': ()-> ed.getOption("onBlur")()
      ed.setOption 'lineNumbers', true
    @)
    @_exerciseCnt = @_editors.length
    @_scrollY = _.map @score, (lesson) -> 0

  keepScore: (correct, lesson=@lesson, exercise=@exercise) ->
    if correct
      @score[lesson-1][exercise-1] = 1
    @attempt[lesson-1][exercise-1] += 1

  getAttempt: (lesson=@lesson, exercise=@exercise) ->
    @attempt[lesson-1][exercise-1]

  completedLesson: (lesson=@lesson) ->
    _.every @score[lesson-1], _.identity

  setCurrent: (lesson, exercise) ->
    @lesson = lesson
    @exercise = exercise or @nextExercise(@lesson)
    # console.log @nextExercise(@lesson), @exercise
    @iExercise = @getiExercise(lesson, @exercise)

  nextExercise: (lesson) ->
    @_nextExercise[lesson-1]

  setNextExercise: () ->
    @_nextExercise[@lesson-1] = if @onLastExerciseInLesson() then @exercise else @exercise+1

  getiExercise: (lesson=@lesson, exercise=@exercise) ->
    # returns 0-based ith exercise in course
    numExercises = _.reduce @_numExercises, (mem, cnt, i) -> 
      if i < lesson-1 then cnt+mem else mem
    , 0
    numExercises + exercise - 1

  onLastExerciseInLesson: (exercise=@exercise) ->
    exercise == @lessons[@lesson-1].count

  onEndOfCourse: (exercise=@exercise) ->
    @onLastExerciseInLesson and (@lesson == @lessons.length)

  curEditor: (lesson=@lesson, exercise=@exercise) ->
    @_editors[@getiExercise(lesson, exercise)]

  nextEditor: () ->
    iNext = if @iExercise+1 < @_exerciseCnt then @iExercise+1 else @iExercise
    @_editors[iNext]

  grade: (correct, $result, result, expected, isCE) ->
    if correct
      $result.empty().append $rightResult(result), $rightMark()
    else
      $result.empty().append $wrongResult(result), $wrongMark(), $wrongMsg(result, expected, isCE)
    $result.parent().removeClass('hide')

  evaluate: (result, exercise, codeblock, $output, isCE, cb) ->
    @setCurrent(@lesson, exercise)
    data = @lessons[@lesson-1].exercises[exercise]
    @evalAndGrade(result, data, codeblock, $output, isCE, cb)

  evalAndGrade: (result, exercise, codeblock, $output, isCE, cb) ->
      $result = $output.find '.result-wrap'
      $remark = $output.find('.remark').filter(':hidden')
      [expected, evaluation] = @_eval(result, exercise, codeblock, isCE)
      if result == undefined and not isCE
        result = 'undefined'
      if evaluation
        @grade(true, $result, result, isCE)
        if $remark.length
          $remark.slideDown(500, ease.show, ()-> 
            cb.call(@, true, $output))
        else
          cb.call(@, true, $output)
      else
        @grade(false, $result, result, expected, isCE)
        cb.call(@, false)

  _eval: (result, exercise, codeblock, isCE) ->
    noError = not errored result
    if isCE
      # hack, nothing works (seems needed for discreet JS course only eg. "\'My name is Joe\'")
      # solution = stripQuotes exercise.Solution
      # solution = exercise.Solution
      codeblock.context.eval exercise.Solution
      expected = codeblock.context.eval "ls_validate(#{result})"#, code, output)"
      [expected, noError and (expected == 'true')]
    else
      expected = codeblock.context.eval exercise.Solution
      [expected, noError and (
       (result == expected) or
       (errored(expected) and exercise.AltSolution? and altEval(result, exercise.AltSolution))
      )]

  scrollNext: ($output, isCE) ->
    if isCE
      top = $output.offset().top+100
    else
      top = $output.prev().offset().top-10
    $('html,body').animate {scrollTop: top}, ease.speed, ease.scrollNext

  saveScroll: (lesson=@lesson) ->
    @_scrollY[lesson-1] = window.scrollY || window.pageYOffset

  showLesson: (lesson=@lesson) ->
    @focusExercise()
    y = if @exercise==1 then 0 else @_scrollY[lesson-1]
    setTimeout (() -> window.scrollTo(0, y)), 100

  focusExercise: (next) ->
    $('.toc-exercises').eq(@lesson-1).find('.exercise-link').removeClass('is-on')
    if next
      nextExercise = if @onLastExerciseInLesson(@exercise) then @exercise else @exercise+1
      $('.toc-exercises').eq(@lesson-1).find('.exercise-link').eq(nextExercise-1).addClass('is-on')
      @nextEditor().focus()
    else
      $('.toc-exercises').eq(@lesson-1).find('.exercise-link').eq(@exercise-1).addClass('is-on')
      @curEditor().focus()

  onClick: (node, what) ->
    lesson = $(node).data('lesson')#parent().parent().index()+1
    exercise = $(node).data('exercise')#parent().index(".lesson:eq(#{lesson-1}) .exercise")+1
    @setCurrent(lesson, exercise)
    @focusExercise()
    if what == 'run'
      @curEditor().getOption('onBlur')()

  scrollTo: (prvExercise) ->
    # scroll to exercise based on prvExercise
    lesson = $('.lesson').eq(@lesson-1)
    from = lesson.find('.exercise').eq(prvExercise-1).offset().top
    to = lesson.find('.exercise').eq(@exercise-1).offset().top-10
    ms = Math.abs(from - to)/2
    $('html,body').animate {scrollTop: to}, ms, ease.scrollTo, () =>
      @focusExercise()

  loadLesson: (init, prvLesson) ->
    $('.lesson').hide().eq(@lesson-1).show()
    $('.toc-lesson .lesson-link').removeClass('is-on').eq(@lesson-1).addClass('is-on')
    if init
      $('.toc-exercises').hide().eq(@lesson-1).show()
    else if prvLesson != @lesson
      $('.toc-exercises').slideUp().eq(@lesson-1).slideDown()
    @showLesson()

  switchLesson: (link) ->
    @saveScroll()
    prvLesson = @lesson
    @setCurrent $(link).data('next'), $(link).data('exercise')
    @loadLesson(false, prvLesson)

  loadExercise: (link) ->
    prvLesson = @lesson
    prvExercise = @exercise
    lesson = $(link).data('next')
    exercise = $(link).data('exercise')
    if prvLesson != lesson
      @switchLesson(link)
    else
      @setCurrent lesson, exercise
      @scrollTo(prvExercise)

  markCorrect: () ->
    exerciseNode = $('.toc-exercises').eq(@lesson-1)
    exerciseNode.find('li').eq(@exercise-1).addClass('completed')
    exerciseNode.find('.eval-mark').eq(@exercise-1).removeClass('hide')
    if @completedLesson()
      $('.toc-lesson').eq(@lesson-1).addClass('completed')
      $('.toc-lesson .eval-mark').eq(@lesson-1).removeClass('hide')

  onCorrect: ($output, isCE) ->
    @keepScore(true)
    @markCorrect()
    @scrollNext($output, isCE)

    if @onLastExerciseInLesson()
      $('.next-lesson').eq(@lesson-1).removeClass('hide')
    @setNextExercise()
    @focusExercise(true)

  showHint: (node) =>
    $btn = $(node)
    hints = $btn.parent().next().find('.hint.hiddenState')
    $btn.siblings('.hint-title').css('visibility', 'visible')
    if hints.length
      hints.first().slideToggle(200).removeClass('hiddenState')

    noHints = hints.length <= 1
    hintBtnTxt = if noHints then "No more hints" else 'Show more hints'
    $btn.text(hintBtnTxt)
    if noHints
      $btn.addClass('disabled')

    if @onLastExerciseInLesson $btn.data('exercise')
      top = $btn.offset().top-10
      $('html,body').animate {scrollTop: top}, ease.speed, ease.scrollNext
      @saveScroll()



# Export globally.
@Course = Course
