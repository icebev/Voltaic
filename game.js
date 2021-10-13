// declare global variables
var adventureTextNodes = [];
var _playerName = '';
var currentTextNode = {};

var energyLevel = 50;
var maxEnergyLevel = 100;
var inventory = [];
var lastTime = 0;

var timeSinceLastCharacter = 0;
var characterSpans = [];
var characterRevealDelay = 80;

var gameStarted = false;
var transistionOpacity = 1;

const adventureTextContainerElement = document.getElementById("adventureTextContainer");
const dialogueChoicesElement = document.getElementById("dialogueChoices");
const continueButtonElement = document.getElementById("continueButton");
const skipButtonElement = document.getElementById("skipButton");
const namePlateLeftElement = document.getElementById("namePlateLeft");
const namePlateRightElement = document.getElementById("namePlateRight");


// function that checks the player name entered
function NameEntrySubmit() {
    let textFieldElement = document.getElementById("nameInput");
    let nameWarningElement = document.getElementById("nameWarning");
    let enteredName = textFieldElement.value;
    if (enteredName.length > 8) {
        nameWarningElement.innerHTML = "Enter a shorter name.";
    } else if (enteredName) {
        // if the name is fine, get ready to start the game
        _playerName = enteredName;
        namePlateLeftElement.innerHTML = _playerName;
        UpdateTextNodes();
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
    UpdateText(1);
    energyLevel = 50;
    inventory = [];
    transistionOpacity = 1.5;
};

// function that takes in the target node ID to change what is being displayed
function UpdateText(targetNodeId) {
    
    // find the specified text node using the target node ID
    let targetTextNode = adventureTextNodes.find(textNode => textNode.nodeId === targetNodeId);

    // update the main adventure text
    ChangeTextSpeed(targetTextNode.textSpeed);
    ChangeAdventureText(targetTextNode.text);
    UpdateNamePlates(targetTextNode.speaker);

    // clear any previous dialogue choices by removing the dialogue option buttons entirely
    while (dialogueChoicesElement.firstChild) {
        dialogueChoicesElement.removeChild(dialogueChoicesElement.firstChild);
    };
        
    // create new button elements that respond to being clicked
    if (targetTextNode.dialogueChoices) {
        targetTextNode.dialogueChoices.forEach(dialogueChoice => {
            // before displaying the choice check whether the requirements are met
            if (CheckChoiceRequirements(dialogueChoice, targetNodeId)) {
                let newButton = document.createElement("button");
                newButton.innerText = dialogueChoice.text;
                newButton.classList.add("genericButton");
                newButton.classList.add("choiceButton");
                newButton.onclick = function() {SelectChoice(dialogueChoice)};
                dialogueChoicesElement.appendChild(newButton);
            };
        });
    };

    // if successful the current text node becomes the original target
    currentTextNode = targetTextNode;
    console.log("Text node retrieved: " + currentTextNode.nodeId);
};

// function to display the correct buttons once all adventure text is revealed
function DisplayChoiceButtons(textNode) {
    // if there are no dialogue choices to display, display the continue button instead
    if (!currentTextNode.dialogueChoices) {
        continueButtonElement.style.visibility = "Visible";
        continueButtonElement.onclick = function() {SelectContinue(textNode)};
    } else {
        dialogueChoicesElement.style.visibility = "Visible";
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

    // set the array of span elements back to empty before adding the new hidden ones
    characterSpans = [];
    inputString.split("").forEach((character) => {
        let newSpan = document.createElement("span");
        newSpan.innerHTML = character;
        newSpan.classList.add("hidden");
        adventureTextContainerElement.appendChild(newSpan);
        characterSpans.push({
           span: newSpan,
        });
    });
};
 
// called before new text is displayed and changes the character delay value in ms
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
    }
}

// function that adds the 'revealed' class to each of the span elements over time to make them visible
function RevealSpanCharacters(revealList, deltatime) {
    timeSinceLastCharacter += deltatime;
    if (timeSinceLastCharacter > characterRevealDelay && revealList.length > 0) {
        var spanToReveal = revealList.splice(0, 1)[0];
        spanToReveal.span.classList.remove('hidden');
        spanToReveal.span.classList.add('revealed');
        timeSinceLastCharacter = 0 + (timeSinceLastCharacter % 100);
    // hide the skip button if all the text is visible   
    } else if (revealList.length === 0 && currentTextNode.nodeId) {
        skipButtonElement.style.visibility = "Hidden";
        DisplayChoiceButtons(currentTextNode);
    };
};

// the continue button skips to the desired node if applicable 
function SelectContinue(currentNode) {
    continueButtonElement.style.visibility = "Hidden";
    if (currentNode.skipToNode) {
        UpdateText(currentNode.skipToNode);
    } else {
        UpdateText(currentNode.nodeId + 1);
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
    // restart the game if a value of 0 is recieved, otherwise continue to the target node
    if (nextTargetNodeId === 0) {
        return StartGame();
    } else {
        UpdateText(nextTargetNodeId);
    };
};

// function to check any prerequisistes for the dialogue choice and return true only if they are met
function CheckChoiceRequirements(dialogueChoice, nodeReference) {
    // check inventory requirements
    if (dialogueChoice.inventoryRequired) {
        for (let i = 0; i < dialogueChoice.inventoryRequired.length; i++) {
            let requiredItem = dialogueChoice.inventoryRequired[i];
            if (!inventory.includes(requiredItem)) {
                console.log(`The required item ${requiredItem} for node ${nodeReference} dialogue choice has not been acquired.`)
                return false;
            };
        };       
    }; 
    // check energy level requirements
    if (dialogueChoice.energyLevelRequired) {
        if (dialogueChoice.energyLevelRequired > energyLevel) {
            console.log(`The ${dialogueChoice.energyLevelRequired} energy required by node ${nodeReference} dialogue choice exceeds current energy.`);
            return false  
        };
    };
    return true;       
}; 

// master function to update the inventory array whenever a dialogue choice is selected
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

// drawing an energy bar on the canvas with the appearance of a battery
function DrawEnergyBar() {
    let centerLineX = canvas.width / 2;
    let batteryWidth = maxEnergyLevel * 2;
    let batteryHeight = 75;
    let batteryX = centerLineX - batteryWidth / 2;
    let batteryY = 100;
    console.log(centerLineX);
    // translucent background
    ctx.fillStyle = "rgb(255, 255, 255, 0.4)";
    ctx.fillRect(centerLineX - batteryWidth / 2, batteryY, batteryWidth, batteryHeight);
    // alter player sprite mood and battery fill color based on the energy level
    switch (true) {
        case energyLevel <= 20:
            changePlayerMood('sad');
            ctx.fillStyle = "red";
            break;
        case energyLevel <= 70:
            changePlayerMood();
            ctx.fillStyle = "yellow";
            break;
        default:
            changePlayerMood('happy');
            ctx.fillStyle = "green";
    };
    ctx.fillRect(batteryX, batteryY, energyLevel * 2, batteryHeight);
    // add a numeric energy indicator and a descriptive label on top
    ctx.font = '35px Impact';
    ctx.fillStyle = "black";
    ctx.fillText(energyLevel, centerLineX + 20, batteryY + 50);
    ctx.fillText('Energy Level:', batteryX, batteryY - 20);
    // draw the black outline on top of the energy bar and background
    ctx.beginPath();
    ctx.rect(batteryX, batteryY, batteryWidth, batteryHeight);
    ctx.rect(batteryX + batteryWidth , batteryY + batteryHeight / 2 - 10, 6, 20);
    ctx.lineWidth = "6";
    ctx.stroke();
};

// function that switches the sprite animation Y frame to reflect current mood
function changePlayerMood(mood) {
    switch (mood) {
        case 'sad':
            batteryborn.frameY = 1;
            break;
        case 'happy':
            batteryborn.frameY = 2;
            break;
        default:
            batteryborn.frameY = 0;
            break;
    };
};

// if the transistion opacity value has been set it will slowly return to fully transparent
function CanvasTransitionUpdate(deltatime) {
    if (transistionOpacity >= 0) {
        ctx.fillStyle = "rgb(0, 0, 0," + transistionOpacity + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        transistionOpacity -= (deltatime * 0.0005);
    };
};

// referencing the main canvas element using the HTML ID
const canvas = document.getElementById("mainCanvas");
// setting up the 2D canvas
const ctx = canvas.getContext('2d');
// 16:9 aspect ratio to fit most modern monitors
canvas.width = 1600;
canvas.height = 900;

// a generic character class for efficient sprite configuration
class Character {
    constructor(x, y, imageSrc, spriteW, spriteH, scale, frames) {
        this.x = x;
        this.y = y;
        this.image = new Image();
        this.image.src = imageSrc;
        this.spriteWidth = spriteW;
        this.spriteHeight = spriteH;
        this.scale = scale;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFramesX = frames - 1;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 500;
        this.markedForDeletion = false;
    };
    // update and draw methods will be called every time the screen refreshes and may increment the animation frame
    update(deltatime) {
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame >= this.frameInterval) {
            if (this.frameX < this.maxFramesX) {
                this.frameX++;
            } else {
                this.frameX = 0;
            };
            this.timeSinceLastFrame = 0 + (this.timeSinceLastFrame % this.frameInterval);
        };
    };
    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * this.scale, this.spriteHeight * this.scale);
    };
};

// a generic animated background class for efficient sprite configuration
class AnimatedBackground {
    constructor(imageSrc, spriteW, spriteH, frames) {
        this.image = new Image();
        this.image.src = imageSrc;
        this.spriteWidth = spriteW;
        this.spriteHeight = spriteH;
        this.frameX = 0;
        this.maxFramesX = frames - 1;
        this.timeSinceLastFrame = 0;
        this.frameInterval = 1000;
        this.markedForDeletion = false;
    }
    // update and draw methods will be called every time the screen refreshes and may increment the animation frame
    update(deltatime) {
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame >= this.frameInterval) {
            if (this.frameX < this.maxFramesX) {
                this.frameX++;
            } else {
                this.frameX = 0;
            };
            this.timeSinceLastFrame = 0 + (this.timeSinceLastFrame % this.frameInterval);
        };
    }
    draw() {
        ctx.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, 0, 0, canvas.width, canvas.height);
    }
};

batteryborn = new Character(20, 200, "img/batteryborn.png", 180, 180, 3, 2);
junkyard = new AnimatedBackground("img/junkyard.png", 1920, 1080, 2);
// animation loop
function Animate(timestamp) {
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    junkyard.update(deltatime);
    junkyard.draw();
    batteryborn.update(deltatime);
    batteryborn.draw();
    DrawEnergyBar();
    if (!gameStarted) {
        transistionOpacity = 1.5;
    }    
    CanvasTransitionUpdate(deltatime);
    RevealSpanCharacters(characterSpans, deltatime);
    requestAnimationFrame(Animate);
};

// begin the game animation loop
Animate(0);