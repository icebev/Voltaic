// declare global variables
var adventureTextNodes = [];
var _playerName = '';
var currentTextNode = 0;
var energyLevel = 50;
var inventory = [];
const adventureTextElement = document.getElementById("adventureText");
const dialogueChoicesElement = document.getElementById("dialogueChoices");
const continueButtonElement = document.getElementById("continueButton");

// function that checks the player name entered
function nameEntrySubmit() {
    let textFieldElement = document.getElementById("nameInput");
    let nameWarningElement = document.getElementById("nameWarning");
    let enteredName = textFieldElement.value;
    if (enteredName.length > 8) {
        nameWarningElement.innerHTML = "Enter a shorter name.";
    } else if (enteredName) {
        // if the name is fine, get ready to start the game
        _playerName = enteredName;
        updateTextNodes();
        document.getElementById("nameEntryContainer").style.visibility = "Hidden";
        document.getElementById("dialogueChoicesContainer").style.visibility = "Visible";
        document.getElementById("adventureTextContainer").style.visibility = "Visible";
        startGame();
    } else {
        nameWarningElement.innerHTML = "Enter a name.";
    };
};

// function called when the game should begin or restart
function startGame() {
    updateText(1);
    energyLevel = 50;
    drawEnergyBar();
    inventory = [];
};

// function that will display the adventure text by changing the HTML element
function changeAdventureText(inputString) {
    adventureTextElement.innerHTML = inputString;
};

// function that takes in the target node ID to change what is displayed
function updateText(targetNodeId) {
    
    // find the text node using the target node ID
    let targetTextNode = adventureTextNodes.find(textNode => textNode.nodeId === targetNodeId);

    // update the main adventure text
    changeAdventureText(targetTextNode.text);

    // first clear the dialogue choices by removing the dialogue option buttons entirely
    while (dialogueChoicesElement.firstChild) {
        dialogueChoicesElement.removeChild(dialogueChoicesElement.firstChild);
    };

    // if there are no dialogue choices to display, display the continue button instead
    if (!targetTextNode.dialogueChoices) {
        continueButtonElement.style.visibility = "Visible";
        continueButtonElement.onclick = function() {selectContinue(targetTextNode)};  
        
    // otherwise create new button elements that respond to being clicked
    } else if (targetTextNode.dialogueChoices) {
        targetTextNode.dialogueChoices.forEach(dialogueChoice => {
            // first check wether the dialogue choice should be displayed
            if (checkChoiceRequirements(dialogueChoice, targetNodeId)) {
                let newButton = document.createElement("button");
                newButton.innerText = dialogueChoice.text;
                newButton.classList.add("choiceButton");
                newButton.onclick = function() {selectChoice(dialogueChoice)};
                dialogueChoicesElement.appendChild(newButton);
            };
        });
    };

    // if successful the current text node becomes the original target
    currentTextNode = targetNodeId;
    console.log("Text node retrieved: " + currentTextNode);
};

// the continue button skips onto the next text node or skips to the desired node
function selectContinue(currentNode) {
    continueButtonElement.style.visibility = "Hidden";
    if (currentNode.skipToNode) {
        updateText(currentNode.skipToNode);
    } else {
        updateText(currentTextNode + 1);
    };
}

// function to check any prerequisistes for the dialogue choice and returns false if they aren't met
function checkChoiceRequirements(dialogueChoice, nodeReference) {
    if (dialogueChoice.inventoryRequired) {
        for (let i = 0; i < dialogueChoice.inventoryRequired.length; i++) {
            if (!inventory.includes(dialogueChoice.inventoryRequired[i])) {
                console.log("required item not obtained "+ nodeReference)
                return false;
            };
        };       
    }; 
    if (dialogueChoice.energyLevelRequired) {
        if (dialogueChoice.energyLevelRequired > energyLevel) {
            console.log("not enough energy at node " + nodeReference);
            return false  
        };
    };
    return true;       
}; 

// testing an energy bar on the canvas
function drawEnergyBar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.rect(750, 50, energyLevel, 20);
    ctx.stroke();
    ctx.font = '48px serif';
    ctx.fillStyle = "black";
    ctx.fillText(energyLevel, 900, 100);
    if (energyLevel < 20) {
        ctx.fillStyle = "red";
    } else {
        ctx.fillStyle = "green";
    };
    ctx.fillRect(750, 50, energyLevel, 20);
};

// function to execute when a dialogue choice is selected 
function selectChoice(dialogueChoiceSelected) {
    // alter the inventory and update energy level based on the choice
    updateInventory(dialogueChoiceSelected);
    updateEnergy(dialogueChoiceSelected);
    // retrieve the target node from the dialogue choice taken as a parameter
    let nextTargetNodeId = dialogueChoiceSelected.nextText;
    // restart the game if a value of 0 is recieved, otherwise continue to the target node
    if (nextTargetNodeId === 0) {
        return startGame();
    } else {
        updateText(nextTargetNodeId);
    };
};

// master function to update the inventory when a dialogue choice is selected
function updateInventory(dialogueChoice) {
    if (dialogueChoice.inventoryAdd) {
        dialogueChoice.inventoryAdd.forEach((itemToAdd) => addToInventory(itemToAdd));
    };
    if (dialogueChoice.inventoryRemove) {
        dialogueChoice.inventoryRemove.forEach((itemToRemove) => removeFromInventory(itemToRemove));
    };
    console.log("Current inventory: " + inventory);
};

// function to add a string to the inventory array
function addToInventory(stringToAdd) {
    inventory.push(stringToAdd);
};

// function to remove a string from the inventory array
function removeFromInventory(stringToRemove) {
    for (let i = 0; i < inventory.length; i++) {
        if (inventory[i] === stringToRemove) {
            inventory.splice(i, 1);
            i--;
        };
    };
};

// function to alter the player energy level if applicable
function updateEnergy(dialogueChoice) {
    if (Math.abs(dialogueChoice.energyChange)) {
        energyLevel += dialogueChoice.energyChange;
        console.log("New energy level: " + energyLevel);
        drawEnergyBar();
    };
};

// referencing the main canvas using the HTML ID
const canvas = document.getElementById("mainCanvas");
// set up the canvas
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth * 1;
canvas.height = window.innerHeight * 1;

// array of objects containing the text to be displayed in game updated when the game starts
function updateTextNodes () {
    adventureTextNodes = [
        {
            nodeId: 1,
            text: 'Hello, ' + _playerName +'. you have awoken at last.',
        },
        {
            nodeId: 2,
            text: 'You find yourself in a scrapyard surrounded by junk. There is an old battery nearby.',
            dialogueChoices: [
                {
                    text: 'Take the battery',
                    inventoryAdd: ['battery'],
                    nextText: 3
                },
                {
                    text: 'Leave the battery',
                    nextText: 6
                },
                {
                    text: 'Stamp on the battery.',
                    energyLevelRequired: 50,
                    energyChange: -10,
                    nextText: 16
                }]
        },
        {
            nodeId: 3,
            text: 'You pick up the battery. Will you eat it?',
            dialogueChoices: [
                {
                    text: 'Yes! Yummy.',
                    inventoryRemove: ['battery'],
                    energyChange: +50,
                    nextText: 6
                },
                {
                    text: 'No, save it for later.',
                    nextText: 6
                }]
        },
        {
            nodeId: 5,
            text: 'You stop but the battery is ruined.',
        },
        {
            nodeId: 6,
            text: 'You find a robot dog who needs a new battery.',
            dialogueChoices: [
                {
                    text: 'Use your battery',
                    inventoryRequired: ['battery'],
                    inventoryRemove: ['battery'],
                    nextText: 21
                },
                {
                    text: 'Transfer some of your own power',
                    energyChange: -40,
                    nextText: 21
                },
                {
                    text: 'Pet the dog.',
                    nextText: 20
                },
                {
                    text: 'Drain the dog',
                    energyChange: 50, 
                    nextText: 22
                }]
        },
        {
            nodeId: 16,
            text: 'Keep going...!'
        },
        {
            nodeId: 17,
            text: 'Are you still stamping?!',
            dialogueChoices: [
                {
                    text: 'Uhh yeah',
                    nextText: 18
                },
                {
                    text: 'No, I\'ll stop',
                    nextText: 5
                },
            
            ]
                
        },
        {
            nodeId: 18,
            text: 'The battery explodes and you die.'
        },
        {
            nodeId: 19,
            text: 'Well Done! Restart?',
            dialogueChoices: [
                {
                    text: 'Yes',
                    nextText: 0
                },
                {
                    text: 'No',
                    nextText: 99
                }]
        },
        {
            nodeId: 20,
            text: 'The dog is rabid and bites you. You die.',
            skipToNode: 19
        },
        {
            nodeId: 21,
            text: 'You made a new not so furry friend!',
            skipToNode: 19
        },
        {
            nodeId: 22,
            text: 'You monster!',
            skipToNode: 19
        },
        {
        nodeId: 99,
            text: 'Thank you for playing!'
        }
    ];
};    