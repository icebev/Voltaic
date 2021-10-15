//// GLOBAL VARIABLE INITIALISATION FOR VOLTAIC ////

// retrieve the adventure text from the JSON file using AJAX
var adventureTextNodes = [];
const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = function() {
  adventureTextNodes = JSON.parse(this.responseText);
  };
xmlhttp.open("GET", "adventureText.json", true);
xmlhttp.send();

// declare key global variables for use throughout the code
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
var disableTransferAnimations = false;

// variables used by the audio system
var tracksPlaying  = [];
var buttonSounds = [];

/* TRACK SET REFERENCE:
The tracklist array contains the alphabetical IDs of all of the music track loops in the file system.
A: Colossal Game Music Collection\5. Retro Music\Chiptunes Vol. I\3 - Dangerous Circuits
B: Colossal Game Music Collection\5. Retro Music\Chiptunes Vol. I\4 - Digital Journey 
*/
const trackNameList = 
[ "Sa",
  "Aa", "Ab", "Ac", "Ad", 
  "Ba", "Bb", "Bc","Bd"];

// constant variables used for referring to changing HTML elements
const adventureTextContainerElement = document.getElementById("adventureTextContainer");
const dialogueChoicesElement = document.getElementById("dialogueChoices");
const namePlateLeftElement = document.getElementById("namePlateLeft");
const namePlateRightElement = document.getElementById("namePlateRight");
const continueButtonElement = document.getElementById("continueButton");
const skipButtonElement = document.getElementById("skipButton");

