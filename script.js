
// DARK BUTTON //
  let themeButton = document.getElementById("theme-button"); // define variable
  
  const toggleDarkMode = () => { // making function that will change background
    document.body.classList.toggle("dark-mode");
  }
  
  themeButton.addEventListener('click', toggleDarkMode); // when clicked, activateDark function will go off

// -----------------------------//

// PETITION + COUNT TOTAL SIG //
  // Add your query for the sign now button here, defining it
let signNowButton = document.getElementById("sign-now-button"); // defines button

let count = 3; // counts sig. default has 3.

//function that does the stuff
  const addSignature = (person) => { 

    // pull out user inputs
    let name = document.getElementById('name').value; // grabs value "melody"
    let hometown = document.getElementById('hometown').value; // grabs val "houston"

    //first, create an element paragraph
    const para = document.createElement("p");
    
    //customize element p
    const node = document.createTextNode("🖊️ " + name + " from " + hometown + " supports this."); // node = "melody from houston supports this."

    //append element p to parent node
    para.appendChild(node); // para = "melody from houston supports this."

    // now append para to existing section element (signatures)
    const element = document.getElementById("signatures"); // find paragraph section w id 'signatures'
    
element.appendChild(para);
    // add para, "melody from houston", to found existing section

    //remove the "3 ppl have signed..."
document.getElementById("counter").remove(); // removes p with "counter"
    
    count = count + 1;
    
    let pcount = document.createElement("p"); // make new paragraph counter
    pcount.setAttribute('id','counter'); // assign new pcounter with same id
    const padd = document.createTextNode("🖊️" + count + " people have signed this petition and support this cause.");
    pcount.appendChild(padd);
    element.appendChild(pcount);

    toggleModal(person);
    
  }
  
  // Add a click event listener to the sign now button here, performs the action/function
// signNowButton.addEventListener('click', addSignature); // removing this (U7)

// -----------------------------//

// PETITION INPUT VALIDATION //

const validateForm = () => {

  let containsErrors = false; // boolean track if error seen

  let petitionInputs = document.getElementById("sign-petition").elements; // hold user inputs -- "melody","houston","me@gmail.com"

  
  let person = { // creating object to reference easier
    name: petitionInputs[0].value, // accesses and saves value of the first input
    hometown: petitionInputs[1].value,
    email: petitionInputs[2].value
  }
  
  // Loop through all inputs
  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true; // user did not fill in 3/3 blanks
      petitionInputs[i].classList.add('error');
    }
    else {
  petitionInputs[i].classList.remove('error');
    }
  }

  //checking email has ".com"
  const email = document.getElementById('email');
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
}
  else{ // remove the 'error' if previously there
    email.classList.remove('error');
  }

  if (containsErrors == false) { // if there are no errors, then you can add the signature
    addSignature(person);

    // from U9: calling toggleModal
    

    // create another for loop to clear the form
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    // reset containsErrors boolean
    containsErrors = false;
  }


}


signNowButton.addEventListener('click', validateForm);


// ------------------------------------ //
// U8: ANIMATION, OBJECTS //
let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

//select every element that has the class called "revealable"
let revealableContainers = document.querySelectorAll('.revealable');

const reveal = () => {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;
    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
  /* add the active class to the revealableContainer's classlist */
revealableContainers[i].classList.add('active');
} else {
  /* remove the active class to the revealableContainer's classlist */
      revealableContainers[i].classList.remove('active');
}
    
  }
}

window.addEventListener('scroll', reveal);

// ------------------------------------ //
// U9: MODAL TOGGLE //
const toggleModal = (person) => {
  const modal = document.getElementById('thanks-modal');
  const modalContent = document.getElementById('thanks-modal-content');
  let intervalId = setInterval(scaleImage, 500);
  
  modal.style.display = "flex";

  modalContent.innerHTML = "Thanks for your support <b>" + person.name + "</b> all the way from <b>" + person.hometown + "</b>!";
  
 //  let edited = `Thanks for your support ${person.name} all the way from ${person.hometown}!`;

  // doesnt work
  /*
  modalContent.innerHTML = "Thanks for your support " + <b> person.name </b> + " from " + person.hometown;
  */
  
// modalContent.textContent = edited;

  // hide the model after a few seconds 
  // --------------------------- 
  setTimeout(() => {
    clearInterval(intervalId)
    modal.style.display = "none";
  }, 8000)
  // --------------------------
  
}

let scaleFactor = 1;
let modalImage = document.getElementById('modal-image');

const scaleImage = () => {
  if (scaleFactor == 1){
    scaleFactor = 0.8;
  }
    else{
    scaleFactor = 1;
    }

  //apply function
  modalImage.style.transform = `scale(${scaleFactor})`;
}


// function to hide modal again when button pushed
let closeButton = document.getElementById('closeButt');

const closeModal = () => {
  const modal = document.getElementById('thanks-modal');
  modal.style.display = "none";
}

closeButton.addEventListener('click', closeModal);