var currentpage = 0;
var pages = 
  [
  { title:"basic tags",
    feedback:"during",
    instructions:"Complete the HTML tags",
    hints: "here is some useful information to help you fill in the blanks",
    inputstrings:[
                  "< [[b]] > This test is a bold < [[/b]] >",
                  "< [[i]] > This test is a italic < [[/i]] >",
                  "< [[p]] > This test is in a paragraph < [[/p]] >",
                  "< [[h1]] > This is the most important heading< [[/h1]] >",
                  "< b > < [[i]] > This text is bold and italic < [[/i]] > < [[/b]] >",]
  },
    
  { title:"ordered lists",
    feedback:"during",
    instructions:
      `<p>Complete the HTML tags to display the following html</p> 
       <p>Animals listed by height - tallest first</p>
       <ol> <li>giraffe</li]><li>elephant</li]>
       <li>bear</li]><li>cat</li]><li>mouse</li]></ol>`,
    inputstrings:[
                  "< p > Animals listed by height - tallest first < /p >",
                  "< [[ol]] > ",
                  "   < [[li]] > giraffe < [[/li]] >",
                  "   < [[li]] > elephant < [[/li]] >",
                  "   < [[li]] > bear < [[/li]] >",
                  "   < [[li]] > cat < [[/li]] >",
                  "   < [[li]] > mouse < [[/li]] >",
                  "< [[/ol]] > "]

  },
  
  { title:"hypertext links",
    feedback:"end",
    hints:`<p>Add a hypertext link to a piece of text using the <pre><a>< ... </a> tags</p>`,
    instructions:
      `<p>Complete the HTML tags below to create a link for text 
         "click here" so the page will change to 
          <b>http://www.example.com/info.html</b></p>`,
    inputstrings:[
                  "< a [[href]] = 'http://[[www.example.com/info.html]] '> Click here </a>"]

  },

  { title:"hypertext links",
    feedback:"end",
    instructions:
      `<p>Complete the HTML tags below to create a link for text 
         "click here" so the page will change to 
          <b>http://www.example.com/info.html</b></p>`,
    inputstrings:[
                  "< [[a]] href=' [[http://www.example.com/info.html]] '> Click here < [[/a]]>"]

  },

  { title:"images",
    feedback:"end",
    instructions:
      `<p>Complete the HTML below to insert an image called <b>"hello.jpg"</b> into a webpage</p>`,
    inputstrings:[
                  "< [[img]] src = 'hello.jpg' >"]

  },

  { title:"images",
    feedback:"end",
    instructions:
      `<p>Complete the HTML below to insert an image called <b>"goodbye.jpg"</b> into a webpage</p>`,
    inputstrings:[
                  "< img [[src]] = 'goodbye.jpg' >"]

  },

  { title:"images",
    feedback:"end",
    instructions:
      `<p>Complete the HTML below to insert an image called <b>"catsanddogs.jpg"</b> into a webpage</p>`,
    inputstrings:[
                  "< img src = '[[catsanddogs.jpg]]' >"]

  },

  { title:"images",
    feedback:"end",
    instructions:
      `<p>Complete the HTML below to insert an image called <b>"greycourt.jpg"</b> into a webpage</p>`,
    inputstrings:[
                  "< [[img]] [[src]] = '[[greycourt.jpg]]' >"]

  }
  
];

