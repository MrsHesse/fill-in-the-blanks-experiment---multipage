//console.log("LINE 1\n");

// feedback can be given immediately ("during") or at the end ("end")
//var feedback = "end";

initialisePageNavigation();
createPageHTML();


function createPageHTML()
{
  // get the details for the current page
  var feedback = pages[currentpage].feedback;
  var instructions = pages[currentpage].instructions;
  var inputstrs = pages[currentpage].inputstrings;
  var title = pages[currentpage].title;
  
  addInstructions(instructions);
  addFillins(inputstrs, feedback);
  addFeedbackButton(feedback);
  addTitle(title);
}
  



/* ----------------------------------------------------------
  Functions to process the formated input strings and create
  the HTML to display the strings with text boxes in the place
  of the blanks.
  ---------------------------------------------------------- */
    
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
        //console.log("pushing text : " + str);
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
      //console.log("pushing blank : " + str);
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

/* ----------------------------------------------------------
  Functions to provide feedback including the event handler
  functions required to link events to functions.
  ---------------------------------------------------------- */
// e is the event that triggered the checkFillinEvent()
function checkFillinEvent(e){
  checkAnswer(e.target);
}

// check all of the .fillin elements at once and provide feedback
function checkAllAnswers(){

  const fillin_elems = document.querySelectorAll(".fillin");  
    
  fillin_elems.forEach(item => {
    checkAnswer(item);
  });
}


// check the answer for the element specified by target
function checkAnswer(target){

  // only process if he target is class .fillin
  if (!target.classList.contains("fillin")){
    return;
  }
  
  // get the answer
  const attempt = target.value.toLowerCase();
  const correctanswer = target.getAttribute('data').toLowerCase()

  //console.log("checkAnswer()");
  //console.log("ending fillin");

  target.classList.remove("fillin-started");  
  
  if (attempt===""){
    target.classList.remove("wrong");
    target.classList.remove("correct");
    return;
  }  

  if (attempt==correctanswer){
    target.classList.remove("wrong");
    target.classList.add("correct");
  } else {
    target.classList.remove("correct");
    target.classList.add("wrong");
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
  //console.log("processFillin( " + e.key + " )")

  if(!excludedKeys.includes(e.key)){
    if (!this.classList.contains('fillin-started')){
      //console.log("starting filling")
      this.value=""
      this.classList.remove("wrong");
      this.classList.remove("correct");  
      this.classList.add("fillin-started");  
    }
    else{
      //console.log("\t...")
    }
  } else {
    //console.log("key ignored")
  }
}

/* ----------------------------------------------------------
  Add the feedback button along with the event listener so
  button press causes the checkAllAnswers() function to be
  run.
  ---------------------------------------------------------- */
function addFeedbackButton(feedbacktype){

  // get the feedback div
  const feedbackdiv = document.getElementById("feedback-container");

  removeAllChildNodes(feedbackdiv);
    
  if (feedbacktype!="during"){
      
    // create a new button
    const fbutton  = document.createElement('button');
  
    fbutton.textContent = "Check answers"
    
    fbutton.addEventListener("click",checkAllAnswers);
    feedbackdiv.appendChild(fbutton);
  }
}

function addInstructions(instructhtml){

  // get the instructions div
  const container = document.getElementById("instructions-container");

  container.innerHTML = instructhtml;  
  
  if (instructhtml!==""){
    container.style.visibility = "visible";
  } else {
    container.style.visibility = "hidden";  
  }
}


function addFillins(inputstrs, feedback)
{

    // get the div element to contain this Fillin
    const fillincontainer = document.getElementById('fillin-container');
    //console.log("fillin container : ",  fillincontainer);

    // remove all existing fillin divs present in the fillin-container
    removeAllChildNodes(fillincontainer);

  
    // create the HTML for each item in the inputstre array
    //console.log("processing input strings")
    for (instr of inputstrs) {
    
      // generate a new div containing the text and inputs for this fillin and add to the container element
      //console.log("\tinput string = ", instr)
    
      var fillinspec = processFillinInput(instr);
      //console.log("\tfill in spec = ", fillinspec);
    
      const fillin = generateFillin(fillinspec,fillincontainer);
    
    }
    //console.log("processing input strings - COMPLETED")
    
    
    const fillin_elems = document.querySelectorAll(".fillin");  
    
    // resize blank based on the number of characters
    // apply the onchange event handler to each fillin - if feedback is set to "during"
    // apply the onfocus event handler to each fillin
    fillin_elems.forEach(item => {
      var wordlen = item.getAttribute("data").length;
      item.style.width = (wordlen+2) +"ch";
      
      item.addEventListener('keydown', processFillin);
    
      // if feedback is set to "during" then feedback is given immediately
      if (feedback=="during"){
        //console.log("adding immediate feedback")
        item.addEventListener('change', checkFillinEvent);
      }
    } );

  // at the start - move focus to the first fillin
  fillin_elems[0].focus();
}



function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function addTitle(title){
  document.title = title;
}


/* ----------------------------------------------------------
   functions to navigate between pages
   ---------------------------------------------------------- */

function initialisePageNavigation(){
  var prev = document.getElementById("before");
  var next = document.getElementById("after");
  
  // add the even listeners
  prev.addEventListener('click', prevPage);
  next.addEventListener('click', nextPage);

  
}

function updatePageNavButtons(){
  var prev = document.getElementById("before");
  var next = document.getElementById("after");
  
  prev.disabled = true;
  next.disabled = true;
  
  // disable buttons if required
  if(currentpage>0){
    prev.disabled = false;
    }
  if(currentpage<pages.length-1){
    next.disabled = false;
  }
  
}
function nextPage(){
    currentpage = currentpage+1;
    if(currentpage>pages.length-1){
      currentpage=pages.length-1;
    }
    createPageHTML();
    updatePageNavButtons();    
    console.log("nextPage() ->", currentpage)
}

function prevPage(){
    currentpage = currentpage-1;
    if(currentpage<0){
      currentpage=0;
    }
    createPageHTML();
    updatePageNavButtons();   
    console.log("prevPage() ->", currentpage)
    
}