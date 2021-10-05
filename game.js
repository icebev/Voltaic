// declare global variables
var _playerName = '';

// function that checks the player name entered
function nameEntrySubmit() {
    let textFieldElement = document.getElementById("nameInput");
    let nameWarningElement = document.getElementById("nameWarning");
    let enteredName = textFieldElement.value;
    if (enteredName.length > 8) {
        nameWarningElement.innerHTML = "Enter a shorter name.";
    } else if (enteredName) {
        _playerName = enteredName;
        document.getElementById("nameEntryContainer").style.visibility = "Hidden";
        document.getElementById("mainContainer").style.visibility = "Visible";
        document.getElementById("adventureText").innerHTML = "Hello, " + _playerName + ". You have awoken at last.";
    } else {
        nameWarningElement.innerHTML = "Enter a name.";
    };
};

// Referencing the main canvas using the HTML ID
const canvas = document.getElementById("mainCanvas");
// Set up the canvas
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 1;
canvas.height = window.innerHeight * 1;

