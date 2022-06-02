var currentpage = 0;
var pages = 
  [
  { title:"basic tags",
    feedback:"during",
    instructions:"Complete the HTML tags",
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
    instructions:
      `<p>Complete the HTML tags below to create a link for text 
         "click here" so the page will change to 
          <b>http://www.example.com/info.html</b></p>`,
    inputstrings:[
                  "< [[a]] href=' [[http://www.example.com/info.html]] '> Click here < [[/a]]>"]

  }
  
];

