// SafeString
Handlebars.registerHelper('safe', function (s, options) {
    return new Handlebars.SafeString(s);
});

// http://berzniz.com/post/24743062344/handling-handlebars-js-like-a-pro
Handlebars.getTemplate = function(name, path) {
  if (Handlebars.templates === undefined || Handlebars.templates[name] === undefined) {
    $.ajax({
      url : path,
      success : function(data) {
        if (Handlebars.templates === undefined) {
          Handlebars.templates = {};
        }
        Handlebars.templates[name] = Handlebars.compile(data);
      },
      async : false
    });
  }
  return Handlebars.templates[name];
};