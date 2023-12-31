// Generated by CoffeeScript 1.4.0
(function() {
  CourseContent.lessons.push({
    number: 2,
    title: "Variables and Operators",
    description: "Welcome to the second section of the beginner JS course. In this section, we will cover variables and operators.  Variables can be used to hold values or expressions. Creating a variable is called declaring a variable. You declare a variable by using the var keyword, like <code>var name;</code>. You can assign values to variables by using the <code>=</code> (assignment) operator, like <code>var age = 20;</code>. Note that unlike in math, the <code>=</code> operator is the assignment operator, not the equality operator.",
    overviewText: "Variable Names and Operators",
    overview: {
      "Variable Names": "JS variable names are case-sensitive (so <code>name</code> and <code>Name</code> are different variables), and must begin with a letter, the $ or the _ symbol, and may contain (but not start with) numbers.  The common practice in JavaScript is to use lower case characters for variable names.  If it consists of more than one word, the common practice is to capitalize all words except the first, e.g.: <code>myAge</code>.  This is know as (lower) camel case.",
      "Operators": "Operators are corner stones for any programming language.  The most common operators are math operators like <code>+</code>, which also acts as a string concatenation operator as well in JavaScript as we have seen in the previous lesson.  Other common JavaScript operator include the assignment operator <code>=</code>, and the dot <code>.</code> operator which accesses properties belonging to an object.  We will introduce you to more operators here."
    },
    exercises: {
      1: {
        Prompt: ' First, let\'s go back to what we did in the previous section. <action>Try typing the word JavaScript between two double quotes again, like this: <code>"JavaScript"</code>. Then press Enter.</action> ',
        Hint: [' Make sure to capitalize the J and the S, since \'j\' and \'J\' are different in JS. ', ' Make sure you surround the word with two double quotes, like this: <code>"JavaScript"</code>. ', ' Type <code>"JavaScript"</code> exactly as shown and press Enter. '],
        Solution: '"JavaScript"',
        Summary: ' There\'s a reason we had you repeat this exercise -- you\'ll see! ',
        Description: ' Favorite Language, Again ',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020dd2a25767825cd00000c"
      },
      2: {
        Prompt: ' In the previous exercise, you had to type my favorite coding language again, even though you\'d already done so in the first section. Imagine if Facebook had to keep asking you for your favorite music every time you logged in. Wouldn\'t that be annoying? We need a way to store data so we can refer to it later. Variables are one way to do this. \n\nLet\'s see how we can create a variable to store my favorite programming language, JavaScript. <action>Type <code>var favoriteLanguage = "JavaScript";</code> and press Enter.</action> ',
        Hint: [' Make sure the variable name is <code>favoriteLanguage</code>, with the same capitalization. Case matters for variable names, so <code>favoriteLanguage</code> and <code>FavoriteLanguage</code> are different variables, for example. ', ' Remember to use the <code>var</code> keyword to let the JS console know that you are declaring (creating) a variable. Put quotes around the word. Also, it\'s good practice to end with a semicolon, which indicates the end of a line of code. ', ' Type <code>var favoriteLanguage = "JavaScript";</code> and press Enter to assign the value to the variable.'],
        Solution: 'favoriteLanguage == "JavaScript" && favoriteLanguage',
        Summary: ' Great! You just created a variable called <code>favoriteLanguage</code>. Let\'s try to understand what you just typed. The first part, <code>var</code>, lets the JS console know you are declaring a variable. The assignment operator <code>=</code> tells it that you are trying to assign a value to the variable. Lastly, the string on the right side of the assignment operator is the actual value that you are assigning to the variable. ',
        Description: ' What is a Variable? ',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020de4e25767825cd00000d"
      },
      3: {
        Prompt: ' Let\'s try another example, for practice. <action>Create a variable called <code>myName</code> and set it to a string containing your name.</action> ',
        Hint: [' Make sure the variable name is <code>myName</code>, with the same capitalization. ', ' Use the <code>var</code> keyword to let the console know you are declaring a variable. Put quotes around your name and end with a semicolon for good style. ', ' Type <code>var myName ="your name here";</code> and press Enter to run the code. '],
        Solution: 'myName',
        Summary: ' Pleased to make your acquaintance. People like to call me the JS console. ',
        Description: ' Your Name ',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020df7225767825cd00000e"
      },
      4: {
        Prompt: ' Now that you\'ve created two variables -- one for my favorite coding language and one for your name -- let\'s use them to create a sentence. <action>Replace the blanks with the correct variable names in the following code: <code>"My name is " + ____ + " and I am learning " + ____;</code></action> ',
        Hint: [' Make sure to use the same case (e.g. capitalize the \'M\' in \'My\'), and be careful about what\'s in quotes and what isn\'t. ', ' The variable names don\'t go inside the quotes. ', ' Type <code>"My name is " + myName + " and I am learning " + favoriteLanguage;</code> exactly as shown (note the space after "is" and "learning") and press Enter. ', 'If <code>myName</code> and <code>favoriteLanguage</code> is not defined, go back to the above exercises and define them first.'],
        Solution: '"My name is " + myName + " and I am learning " + favoriteLanguage', 
        AltSolution: [{'contains': "My name is"}, {'contains': "and I am learning"}, {'minLength': 34}], 
        Summary: ' Hope you\'re enjoying learning JavaScript! ',
        Description: ' Let\'s Make a Sentence ',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020e0a925767825cd00000f"
      },
      5: {
        Prompt: ' We can use variables to store more than just words (technically strings, but we\'ll get to that later). You can also use variables to store numbers. <action>Try creating a variable called <code>myAge</code> that stores your age.</action> ',
        Hint: [' Remember to use the <code>var</code> keyword to let the JS console know that you are declaring a variable. ', ' Unlike in the previous exercises, you don\'t need quotes here because your age is a number and not a string. ', ' Type <code> var myAge = 22</code> (or whatever your age is) and press Enter. '],
        Solution: 'typeof myAge == \'number\' && myAge',
        Summary: ' Wow, you\'re young! Now you\'ve used variables to store strings and numbers. We\'ll learn later about other data types you can store using variables. ',
        Description: ' Numbers in Variables ',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020e14925767825cd000010"
      },
      6: {
        ExerciseCode: 'var oldAge = myAge;',
        Prompt: ' An important characteristic of variables is that you can change them once they\'ve been declared. But since you\'ve already created the variable, you don\'t need to use the <code>var</code> keyword again to simply change its value. Now, suppose one year has passed and you\'re one year older. <action>Can you update <code>myAge</code> to reflect your new age? </action> ',
        Hint: [' You can simply assign a new value to the variable. Because you\'re updating it and not declaring it, you don\'t need to use the <code>var</code> keyword. ', ' If you\'re currently 22 and you want to update your age to 23, you can just type <code>myAge = 23;</code>. '],
        Solution: 'oldAge + 1;',
        Summary: ' You\'re one year older -- happy birthday!  ',
        Description: ' Changing Variable Values ',
        ReInitialize: 'True',
        EvalSolution: 'True',
        ExerciseID: "5020e21825767825cd000011"
      },
      7: {
        Prompt: ' As you just saw, variable values can be changed. Not only can they be changed to values of the same type, but they can also be changed to different data types. <action>Try setting <code>myAge</code> to a string that spells out your current age.</action>  ',
        Hint: [' Remember you don\'t need to use the <code>var</code> keyword since the variable <code>myAge</code> was already declared, and you\'re simply updating its value. ', ' Remember you have to put quotes around the text to tell JS that it\'s a string.  ', ' If you\'re 22 years old, type <code> myAge = "twenty two";</code>. '],
        Solution: 'typeof myAge == \'string\' && myAge',
        Summary: ' See, you just changed the type of the variable from a number to a string! ',
        Description: ' Changing Variable Types ',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020e36625767825cd000012"
      },
      8: {
        ExerciseCode: 'var alicesAge = 19;\nvar bobsAge = 20;',
        Prompt: ' Now that we\'ve created several variables, what can we do besides changing their values? A useful operation is to check if two variables are equal, that is, they have the same value. This is done by using the <code>==</code>, or equality, operator. Notice that there are two equal signs instead of one.\n\n<action>Try checking if the variables <code>alicesAge</code> and <code>bobsAge</code> have the same values using the equality operator.</action> (These two variables have been created for you already).',
        Hint: [' You can check if two variables, x and y, have the same value by doing <code>x == y</code>. ', ' Type <code>alicesAge == bobsAge</code> to check if they have the same value. '],
        Solution: 'alicesAge == bobsAge',
        Summary: ' That returned <code>false</code> because Alice is 19 and Bob is 20. If they were the same age, your code would have evaluated to <code>true</code>. We\'covered a few operators already, but check out some other commonly used operators in the description. ',
        Description: ' Equality ',
        ReInitialize: 'True',
        EvalSolution: 'True',
        ExerciseID: "5020e46f25767825cd000014"
      },
      9: {
        ExerciseCode: 'secret = 42',
        Prompt: ' We\'ve seen that variables have values, but did you know they also have types? The type of a variable is essentially the data type (e.g. string, number, etc.) that the variable stores. So how do we know if a variable stores a number or a string? We can use the handy <code>typeof</code> operator to figure it out. We\'ve created a variable for you called <code>secret</code> that contains -- you guessed it -- a secret value. <action>Can you figure out its type? Give it a try!</action> ',
        Hint: [' You can get the type of a variable by using the <code>typeof</code> operator, like <code>typeof x;</code> ', ' Type <code>typeof secret;</code> and press Enter. '],
        Solution: 'typeof secret',
        Summary: ' The secret variable stored the answer to the meaning of Life, the Universe, and Everything, thanks to Douglas Adams. Do you know what number it was? ',
        Description: ' What\'s Your Type? ',
        ReInitialize: 'True',
        EvalSolution: 'True',
        ExerciseID: "5020e4d325767825cd000015"
      },
      10: {
        Prompt: ' Sometimes you might want to create a variable for later use, but don\'t know the value you want to assign to it just yet. JS lets you declare variables without assigning a specific value. In this case, the variable will have an <code>"undefined"</code> value. You can do this by declaring a variable and leaving out the assignment operator and any value. <action>Try creating an undefined variable called <code>emptyCan</code>.</action> ',
        Hint: [' You must use the <code>var</code> keyword but not the assignment (<code>=</code>) operator. ', ' This is how you\'d declare an undefined variable named <code>x</code>: <code>var x;</code>. ', ' Type <code>var emptyCan;</code> and press enter.'],
        Solution: 'undefined',
        Description: ' Empty Cans, Empty Variables ',
        Summary: ' You have created an empty variable to be used later. ',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020e52425767825cd000016"
      },
      11: {
        Prompt: 'Now check the type of the variable using the appropriate operator.',
        Hint: [' Make sure you have entered <code>var emptyCan;</code> in the above exercise. Now use the <code>typeof</code> operator to check its type by typing <code>typeof emptyCan;</code> here.'],
        Solution: '"undefined"',
        Description: '',
        Summary: ' Yup, the type of en empty variable is <code>"undefined"</code>.',
        Description: ' Type Check',
        ReInitialize: 'False',
        EvalSolution: 'True',
        ExerciseID: "5020e52425767825cd000016"
      },
      12: {
        ExerciseCode: 'var counter = 1;',
        Prompt: ' Now you know how to create and change variables. A common task in programming is incrementing the value of a variable, like we did when we increased the myAge variable by one. This is such a common task that there\'s a special operator for it in JS, the <code>++</code>, or increment, operator. <action>Increment the value of the variable called <code>counter</code> which we have already created for you.</action>',
        Hint: [' You can increment a variable by putting <code>++</code> after it. ', ' Type <code>counter++;</code> and press Enter. '],
        Solution: '1',
        Summary: ' Awesome! The increment operator will be handy when you\'re writing a lot of code. There is also a similar decrement operator, <code>--</code>, which is used to decrease the value of a variable by one. ',
        Description: ' Increment Operator ',
        ReInitialize: 'True',
        EvalSolution: 'True',
        ExerciseID: "5020e56e25767825cd000017"
      },
      13: {
        ExerciseCode: 'var counter = 1;',
        Prompt: ' What if you wanted to increment the value of a variable by any number, not just one? There is a way to do this using the assignment operator. For example, if you want to increase the value of a variable <code>x</code> by 10, you can use the code <code>x = x + 10;</code>. \n\nThis works because the code on the right hand side of the assignment operator is evaluated first, then the resulting value is assigned to the variable <code>x</code>. So JS evaluates <code>x + 10</code> and then reassigns the result to the variable <code>x</code>.\n\n<action>Increment the value of the variable <code>counter</code> by 5.</action> ',
        Hint: [' Type <code> counter = counter + 5;</code> and press Enter. '],
        Solution: '6',
        Summary: ' You can also subtract any number from a variable similarly, by using the <code>-</code> operator instead of the <code>+</code> operator. ',
        Description: ' Adding Numbers, Again ',
        ReInitialize: 'True',
        EvalSolution: 'True',
        ExerciseID: "5020e5c625767825cd000018"
      },
      14: {
        ExerciseCode: 'var counter = 21;',
        Prompt: ' Adding numbers to variables is such a common task in programming that there is a special operator for it. The <code>+=</code> operator is short hand for incrementing a variable by a number. For example, instead of <code>x = x + 10;</code>, you can write <code>x += 10;</code>. They both do the same thing.\n\n<action>Use this operator to increment the variable <code>counter</code> by itself.</action> ',
        Hint: [' Just like with the assignment operator, the right hand side of an expression involving the <code>+=</code> operator will get evaluated first, then assigned to the variable on the left hand side. ', ' Type <code>counter += counter;</code> and press Enter. '],
        Solution: '42',
        Summary: ' Congratulations, you have completed lesson 2 of Beginning JavaScript course! ',
        // Summary: '<p>Congratulations on completing your second lesson!</p><p>Thank you for trying out our new approach on language learning.  That is all the lessons we have at the moment.  <a href="https://docs.google.com/a/learnstreet.com/spreadsheet/viewform?formkey=dGhMcXNqLTFpYTE3T1JIVkQtUFhOaVE6MQ">Please complete our short survey to let us know how you like this new course learning experience</a>.',
        Description: ' Another Addition Operator ',
        ReInitialize: 'True',
        EvalSolution: 'True',
        ExerciseID: "5064d57b5773533e0800006f"
      }
    },
    Summary: '<p>Congratulations on completing your second lesson!<br/>\n    <p></p>\n	 In this section, you learned about variables and operators. They’re really important concepts, so make sure to review these notes and remember what you learned for future sections.  </p>  <br><br><p>Thank you for trying out our new course learning approach.  That is all the lessons we have at the moment, please let us know how you like this new learning approach.',
    CurrentLang: "javascript",
    count: 14
  });

}).call(this);
