//// DIALOGUE SYSTEM CODE FOR VOLTAIC ////

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
var maxEnergyLevel = 100;
var inventory = [];

// variables to keep track of animations and typewriter effect
var lastFrameTime = 0;
var timeSinceLastCharacter = 0;
var characterSpans = [];
var characterRevealDelay = 80;
var transitionOpacity = 1;

// constant variables used for referring to changing HTML elements
const adventureTextContainerElement = document.getElementById("adventureTextContainer");
const dialogueChoicesElement = document.getElementById("dialogueChoices");
const namePlateLeftElement = document.getElementById("namePlateLeft");
const namePlateRightElement = document.getElementById("namePlateRight");
const continueButtonElement = document.getElementById("continueButton");
const skipButtonElement = document.getElementById("skipButton");

// function that checks the player name entered
function NameEntrySubmit() {
    let nameWarningElement = document.getElementById("nameWarning");
    let enteredName = document.getElementById("nameInput").value;
    if (enteredName.length > 8) {
        nameWarningElement.innerHTML = "Enter a shorter name.";
    } else if (enteredName) {
        // if the name is acceptable store it and start the game
        _playerName = enteredName;
        namePlateLeftElement.innerHTML = _playerName;
        // switch the visible elements
        document.getElementById("nameEntryContainer").style.visibility = "Hidden";
        document.getElementById("dialogueChoicesContainer").style.visibility = "Visible";
        adventureTextContainerElement.style.visibility = "Visible";
        gameStarted = true;
        StartGame();
    } else {
        nameWarningElement.innerHTML = "Enter a name.";
    };
};

// function called when the game should begin or restart
function StartGame() {
    UpdateGameText(1);
    energyLevel = 50;
    inventory = [];
    transitionOpacity = 1.5;
};

// large function that takes in the target node ID to change what is being displayed
function UpdateGameText(targetNodeId) {
    // find the specified text node inside the array literal using the target node ID
    let targetTextNode = adventureTextNodes.find(textNode => textNode.nodeId === targetNodeId);
    // if successful the current text node becomes the original target
    if (targetTextNode) {
        currentTextNode = targetTextNode;
        console.log("Text node retrieved: " + currentTextNode.nodeId);
    } else {
        console.log("Failed to retrieve a node with ID: " + targetNodeId);
        return false;
    };    
    // update the main adventure text, reveal speed, character nameplates and dialogue option buttons passing properties of the retrieved node
    ChangeTextSpeed(currentTextNode.textSpeed);
    ChangeAdventureText(currentTextNode.text);
    UpdateNamePlates(currentTextNode.speaker);
    CreateChoiceButtons(currentTextNode.dialogueChoices);
};

// called before new text is displayed or when the skip button is clicked and changes the character delay value in ms
function ChangeTextSpeed(speed) {
    switch (speed) {
        case "slow":
            characterRevealDelay = 100;
            break;
        case "fast":
            characterRevealDelay = 50;
            break;
        case "superfast":
            characterRevealDelay = 10;
            break;    
        default:
            characterRevealDelay = 80;
            break;
    };
};

// function that will display the adventure text with a typewriter effect by first creating invisible span elements for each letter
function ChangeAdventureText(inputString) {
    // remove any old text first
    while (adventureTextContainerElement.firstChild) {
        adventureTextContainerElement.removeChild(adventureTextContainerElement.firstChild);
    };
    // show the skip button when the text is changed and hide any dialogue choices
    skipButtonElement.style.visibility = "Visible";
    dialogueChoicesElement.style.visibility = "Hidden";
    // iterate through each word of the input string to include the player name if applicable
    let words = inputString.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (words[i] === "_playerName") {
            words[i] = _playerName;
        };
    };
    let revivedString = words.join(" ");
    // set the array of span elements back to empty before adding the new hidden ones
    characterSpans = [];
    revivedString.split("").forEach((character) => {
        let newSpan = document.createElement("span");
        newSpan.innerHTML = character;
        newSpan.classList.add("hidden");
        adventureTextContainerElement.appendChild(newSpan);
        characterSpans.push({
           span: newSpan,
        });
    });
};

// show or hide the dialogue name plates based on the current speaker
function UpdateNamePlates(speaker) {
    switch (speaker) {
        case "player":
            namePlateLeftElement.style.visibility = "Visible";
            namePlateRightElement.style.visibility = "Hidden";
            break;
        default:
            if (speaker) {
                namePlateRightElement.innerHTML = speaker
                namePlateLeftElement.style.visibility = "Hidden";
                namePlateRightElement.style.visibility = "Visible";
            } else {
                namePlateLeftElement.style.visibility = "Hidden";
                namePlateRightElement.style.visibility = "Hidden";
            };
    };
};

function CreateChoiceButtons(dialogueChoices) {
    // clear any previous dialogue choices by removing the dialogue option buttons entirely
    while (dialogueChoicesElement.firstChild) {
        dialogueChoicesElement.removeChild(dialogueChoicesElement.firstChild);
    };
    // create new button elements that respond to being clicked
    if (dialogueChoices) {
        dialogueChoices.forEach(dialogueChoice => {
            // before displaying the choice check whether the requirements are met
            if (CheckChoiceRequirements(dialogueChoice)) {
                let newButton = document.createElement("button");
                newButton.innerText = dialogueChoice.text;
                newButton.classList.add("genericButton");
                newButton.classList.add("choiceButton");
                newButton.onclick = function() {SelectChoice(dialogueChoice)};
                dialogueChoicesElement.appendChild(newButton);
            };
        });
    };
};

// function to check any prerequisistes for the dialogue choice and return true only if they are met
function CheckChoiceRequirements(dialogueChoice) {
    // check inventory requirements
    if (dialogueChoice.inventoryRequired) {
        for (let i = 0; i < dialogueChoice.inventoryRequired.length; i++) {
            let requiredItem = dialogueChoice.inventoryRequired[i];
            if (!inventory.includes(requiredItem)) {
                console.log(`The required item ${requiredItem} for node ${currentTextNode.nodeId} dialogue choice has not been acquired.`)
                return false;
            };
        };       
    }; 
    // check energy level requirements
    if (dialogueChoice.energyLevelRequired) {
        if (dialogueChoice.energyLevelRequired > energyLevel) {
            console.log(`The ${dialogueChoice.energyLevelRequired} energy required by node ${currentTextNode.nodeId} dialogue choice exceeds current energy.`);
            return false  
        };
    };
    return true;       
}; 

// the continue button skips to the desired node if applicable 
function SelectContinue(currentNode) {
    continueButtonElement.style.visibility = "Hidden";
    if (currentNode.skipToNode) {
        UpdateGameText(currentNode.skipToNode);
    } else {
        UpdateGameText(currentNode.nodeId + 1);
        console.log("No skipToNode specified.")
    };
};

// function to execute whenever a dialogue choice is selected taking that dialogue choice object as a parameter
function SelectChoice(dialogueChoiceSelected) {
    // alter the inventory and update energy level based on the choice
    UpdateInventory(dialogueChoiceSelected);
    UpdateEnergy(dialogueChoiceSelected);
    // retrieve the next target node from the dialogue choice object
    let nextTargetNodeId = dialogueChoiceSelected.nextText;
    // restart the game if a value of 0 is received, otherwise continue to the target node
    if (nextTargetNodeId === 0) {
        return StartGame();
    } else {
        UpdateGameText(nextTargetNodeId);
    };
};

// function to update the inventory array whenever a dialogue choice is selected
function UpdateInventory(dialogueChoice) {
    if (dialogueChoice.inventoryAdd) {
        dialogueChoice.inventoryAdd.forEach((itemToAdd) => AddToInventory(itemToAdd));
    };
    if (dialogueChoice.inventoryRemove) {
        dialogueChoice.inventoryRemove.forEach((itemToRemove) => RemoveFromInventory(itemToRemove));
    };
    console.log("Current inventory: " + inventory);
};

// function to add a string to the inventory array
function AddToInventory(stringToAdd) {
    inventory.push(stringToAdd);
};

// function to remove a string from the inventory array
function RemoveFromInventory(stringToRemove) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === stringToRemove) {
            inventory.splice(i, 1);
            // return true once an item has been removed to avoid removing multiple of the same item
            return true;
        };
    };
};

// function to alter the player energy level if the dialogue choice object includes an energyChange
function UpdateEnergy(dialogueChoice) {
    if (Math.abs(dialogueChoice.energyChange)) {
        energyLevel += dialogueChoice.energyChange;
        console.log(`Energy level has been changed by ${dialogueChoice.energyChange} to a new value of ${energyLevel}`);
        if (energyLevel > maxEnergyLevel) {
            console.log(`Maximum energy level was exceeded by ${energyLevel - maxEnergyLevel}!`)
            energyLevel = 100;
        }
    };
};

