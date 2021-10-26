//// GLOBAL VARIABLE INITIALISATION FOR VOLTAIC ////
//----------------------------------------------------
// Contains global variables to be accessed by any part of the code. This also includes the adventure text nodes.
// Last modified by Joe Bevis 22/10/2021
//----------------------------------------------------

// retrieve the adventure text from the JSON file using AJAX
var adventureTextNodes = [];
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  adventureTextNodes = JSON.parse(this.responseText);
  };
xmlhttp.open("GET", "adventureText.json", true);
xmlhttp.send();
// comment out the above block of code if the JSON file request is not working and the altAdventureText.js file is to be used instead

var _playerName = '';
var currentTextNode = {};
var gameStarted = false;

// variables for adaptive energy level and inventory system
var energyLevel = 50;
var shownEnergyLevel = 50;
var timeSinceCorrection = 0;
var maxEnergyLevel = 100;
var inventory = [];

// variables to keep track of animations and the typewriter effect
var lastFrameTime = 0;
var timeSinceLastCharacter = 0;
var characterSpans = [];
var characterRevealDelay = 80;
var allCharactersRevealed = false;
var transitionOpacity = 1;

// variable used by the audio system to keep track of music tracks playing
var tracksPlaying  = [];
/* 
TRACK SET REFERENCE:
The tracklist array contains the alphabetical IDs of all of the music track loops in the file system.
S: Colossal Game Music Collection\8. Sci-Fi Music\Sci-Fi Music Vol. II\4 - Undiscovered
A: Colossal Game Music Collection\5. Retro Music\Chiptunes Vol. I\3 - Dangerous Circuits
B: Colossal Game Music Collection\5. Retro Music\Chiptunes Vol. I\4 - Digital Journey 
C: Colossal Game Music Collection\8. Sci-Fi Music\Sci-Fi Music Vol. I\1 - Citadel
*/
const trackNameList = 
[ "Sa",
  "Aa", "Ab", "Ac", "Ad", 
  "Ba", "Bb", "Bc","Bd",
  "Ca", "Cb", "Cc"];

// constant variables used for referring to changing HTML elements
const adventureTextContainerElement = document.getElementById("adventureTextContainer");
const dialogueChoicesElement = document.getElementById("dialogueChoices");
const namePlateLeftElement = document.getElementById("namePlateLeft");
const namePlateRightElement = document.getElementById("namePlateRight");
const continueButtonElement = document.getElementById("continueButton");
const skipButtonElement = document.getElementById("skipButton");

