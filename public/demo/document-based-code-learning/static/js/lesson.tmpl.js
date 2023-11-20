(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['lesson'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; data = data || {};
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "\n  <div class=\"exercise\">\n    <h4>";
  stack1 = depth0.Description;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "</h4>\n    <p>";
  stack1 = depth0.Prompt;
  stack2 = {};
  foundHelper = helpers.safe;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "safe", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</p>\n\n    ";
  stack1 = depth0.ExerciseCode;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program2, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n    <div class=\"livecode javascript no-output\" id=\"ex";
  stack1 = depth1.lesson;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "-";
  stack1 = data.key;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\"\n    ";
  stack1 = depth0.ExerciseCode;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program4, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    ></div>\n    <div class=\"livecode output final\" data-for=\"ex";
  stack1 = depth1.lesson;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "-";
  stack1 = data.key;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\" data-exercise=";
  stack1 = data.key;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "></div>\n\n    <div class=\"hint-bar\">\n      <div class=\"hint-title\">Hints:</div>\n      <div class=\"hint-btn\">Show hints</div>\n    </div>\n    <ol>\n    ";
  stack1 = depth0.Hint;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(6, program6, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n    </ol>\n\n    <div class=\"summary hide\">";
  stack1 = depth0.Summary;
  stack2 = {};
  foundHelper = helpers.safe;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "safe", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</div>\n  </div>\n";
  return buffer;}
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "\n    <div class=\"livecode javascript hide no-output\" id=\"ex";
  stack1 = depth1.lesson;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "-";
  stack1 = data.key;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "code\">\n      ";
  stack1 = depth0.ExerciseCode;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "\n    </div>\n    ";
  return buffer;}

function program4(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += " data-depends-on=\"ex";
  stack1 = depth1.lesson;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "-";
  stack1 = data.key;
  stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1;
  buffer += escapeExpression(stack1) + "code\" ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n      <li class=\"hint hid\">";
  stack1 = {};
  foundHelper = helpers.safe;
  stack1 = foundHelper ? foundHelper.call(depth0, depth0, {hash:stack1,data:data}) : helperMissing.call(depth0, "safe", depth0, {hash:stack1,data:data});
  buffer += escapeExpression(stack1) + "</li>\n    ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "\n  <a href='#' class=\"next lesson-link hide\" data-next=\"";
  foundHelper = helpers.next;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.next; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "\">Go To Next Lesson</a>\n";
  return buffer;}

  buffer += "<div class=\"lesson\">\n  <h2>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h2>\n  <p>";
  stack1 = depth0.description;
  stack2 = {};
  foundHelper = helpers.safe;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:stack2,data:data}) : helperMissing.call(depth0, "safe", stack1, {hash:stack2,data:data});
  buffer += escapeExpression(stack1) + "</p>\n  <h3>Lesson ";
  foundHelper = helpers.lesson;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.lesson; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1) + "</h3>\n\n";
  stack1 = depth0.exercises;
  stack2 = {};
  stack1 = helpers.each.call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.programWithDepth(program1, data, depth0),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n";
  stack1 = depth0.next;
  stack2 = {};
  stack1 = helpers['if'].call(depth0, stack1, {hash:stack2,inverse:self.noop,fn:self.program(8, program8, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</div>\n";
  return buffer;});
})();