console.log("LINE 1\n");

// this is the input string 
// the words between [[ ... ]] appear as blanks
// the string needs to be processed to produce a list of text-element objects (text not brackets), and fillin objects
// text objects - just a type and the text
// fillin objects - the fillin type, and the answer
//const inputstr = "Networks are used to share [[resources]] and [[communicate]] between computers.";

var inputstr = "< [[b]] > This test is a bold < [[/b]] >";
var inputstrs = [inputstr];


// get the div element to contain this Fillin
const fillincontainer = document.getElementById('fillincontainer');
console.log("fillin container : ",  fillincontainer);

// process each input string in the array
console.log("processing input strings")
for instr of inputstrs {
  // generate a new div containing the text and inputs for this fillin and add to the container element
  console.log("\t\tinput string = ", instr)
  var fillinspec = processFillinInput(instr);
  console.log("\t\tfill in spec = ", fillinspec);

  const fillin = generateFillin(fillinspec,fillincontainer);
}
console.log("processing input strings - COMPLETED")


function generateFillin(spec, containerelem){

  // create a new div to contain all the parts
  const fillin  = document.createElement('div');
  fillin.className = 'fillin-sentence';
  containerelem.appendChild(fillin);

  const fillinp  = document.createElement('p');
  fillin.appendChild(fillinp);

  spec.forEach(specitem => {
    if (specitem.type=="text"){
      let textNode = document.createTextNode(specitem.text); 
      fillinp.appendChild(textNode);
    } else if (specitem.type=="fillin"){
      var blankNode = document.createElement("input");
      blankNode.setAttribute("type", "text");
      blankNode.setAttribute('data', specitem.text);
      blankNode.classList.add('fillin');
      fillinp.appendChild(blankNode);
    }
  });
  return fillin;
}


function processFillinInput(s)
{
  var fillin = [];
  var type="text";
  var str=""; 
  for (let i=0; i<(s.length-1); i++){
    if (s[i]==="[" & s[i+1]==="["){
      // end the previous text and add
      if (str!==""){
        console.log("pushing text : " + str);
        fillin.push({ 
          type:"text",
          text:str
        });
      }
      // start of a fillin
      i=i+2;
      str=s[i];
      type="fillin";
    } else if (s[i]==="]" & s[i+1]==="]"){
      // end of fillin
      i=i+1;
      console.log("pushing blank : " + str);
      fillin.push({ 
        type:"fillin",
          text:str
        });

      type="text";
      str=""
    } else {
      // just text - add to the current string
      str+=s[i];
    }

  }
  if (type=="text"){
    str+=s[s.length-1];
    fillin.push({ 
          type:"text",
          text:str
        });
  }
  return fillin;
}


console.log("running")


const fillin_elems = document.querySelectorAll(".fillin");  

// resize blank based on the number of characters
// apply the onchange event handler to each fillin
// apply the onfocus event handler to each fillin
fillin_elems.forEach(item => {
  var wordlen = item.getAttribute("data").length;
  item.style.width = (wordlen+2) +"ch";
  item.addEventListener('change', checkAnswer);
  //item.addEventListener('input', restartFillin);
  item.addEventListener('keydown', processFillin);
})

fillin_elems[0].focus();


// e is the element
function checkAnswer(){
  // get the answer
  const attempt = this.value.toLowerCase();
  const correctanswer = this.getAttribute('data').toLowerCase()

  console.log("checkAnswer()");
  console.log("ending fillin");

  this.classList.remove("fillin-started");  
  
  if (attempt===""){
    this.classList.remove("wrong");
    this.classList.remove("correct");
    return;
  }  

  if (attempt==correctanswer){
    this.classList.remove("wrong");
    this.classList.add("correct");
  } else {
    this.classList.remove("correct");
    this.classList.add("wrong");
  }

}

// when focus returns to the fillin
// set to blank and remove correct or wrong classes
function restartFillin(){
  this.value=""
  this.classList.remove("wrong");
  this.classList.remove("correct");
}

// when focus returns to the fillin
// set to blank and remove correct or wrong classes
function processFillin(e){
  let excludedKeys=["Tab", "Shift", "Alt", "Ctrl", "Space"];

  // make sure a tab key does not trigger a refress
  console.log("processFillin( " + e.key + " )")

  if(!excludedKeys.includes(e.key)){
    if (!this.classList.contains('fillin-started')){
      console.log("starting filling")
      this.value=""
      this.classList.remove("wrong");
      this.classList.remove("correct");  
      this.classList.add("fillin-started");  
    }
    else{
      console.log("\t...")
    }
  } else {
    console.log("key ignored")
  }
}
