//// BUTTON FUNCTION CODE FOR VOLTAIC ////
//----------------------------------------------------
// Contains the functions that get called when the related HTML elements are clicked. 
// Also contains the sequential functions that alter the player's inventory and energy as a result of a selected dialogue choice.
// Last modified by Joe Bevis 18/10/2021
//----------------------------------------------------

// function that checks the player name entered when the start button is clicked
function NameEntrySubmit() {
    PlayButtonSound();
    let nameWarningElement = document.getElementById("nameWarning");
    let enteredName = document.getElementById("nameInput").value;
    let maxNameLength = 10;
    if (enteredName.length > maxNameLength) {
        nameWarningElement.innerHTML = "Enter a shorter name.";
    } else if (enteredName) {
        // if the name is exists and is less than the maxNameLength store it and start the game
        _playerName = enteredName;
        // update the left name plate with the player's entered name
        namePlateLeftElement.innerHTML = _playerName;
        // switch the visible div container elements to show the adventure text and dialogue choice boxes 
        document.getElementById("nameEntryContainer").style.visibility = "Hidden";
        document.getElementById("dialogueChoicesContainer").style.visibility = "Visible";
        adventureTextContainerElement.style.visibility = "Visible";
        gameStarted = true;
        StartGame();
    } else {
        nameWarningElement.innerHTML = "Enter a name.";
    };
};

// the continue button skips to the desired node if applicable or continues to the next node in the series
function SelectContinue(currentNode) {
    PlayButtonSound();
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
    PlayButtonSound();
    // alter the inventory and update energy level based on the choice
    UpdateInventory(dialogueChoiceSelected);
    UpdateEnergy(dialogueChoiceSelected);
    // retrieve the next target node from the dialogue choice object
    let nextTargetNodeId = dialogueChoiceSelected.nextText;
    // restart the game if a value of 0 is received or go to specified game over node if the player has no energy, otherwise continue to the target node
    if (nextTargetNodeId === 0) {
        return StartGame();
    } else if (energyLevel === 0) {
        UpdateGameText(404);
    } else {    
        UpdateGameText(nextTargetNodeId);
    };
};

// function to update the inventory array whenever a dialogue choice is selected. Multiple items can be added or removed at once using arrays
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

// function to alter the player energy level if the dialogue choice object selected includes an energyChange
function UpdateEnergy(dialogueChoiceSelected) {
    let deltaEnergy = dialogueChoiceSelected.energyChange;
    // if the dialogue choice object has noEnergyAnimation on it then disable the energy trasfer animations so that no energy bolts particles are generated
    (dialogueChoiceSelected.noEnergyAnimation) ? energyBoltManager.disableTransferAnimations = true : energyBoltManager.disableTransferAnimations = false;
    if (Math.abs(deltaEnergy)) {
        energyLevel += deltaEnergy;
        console.log(`Energy level has been changed by ${deltaEnergy} to a new value of ${energyLevel}.`);
        // set the direction of energy transfer animation based on the sign of deltaEnergy
        (deltaEnergy > 0) ? energyBoltManager.currentBoltDirection = "left" : energyBoltManager.currentBoltDirection = "right";
        // set an energy bolt particle creation time in ms to kick off the bolt generation relative to the absolute value of the energy change deltaEnergy
        let generationTimePerEnergy = 50;
        energyBoltManager.boltCreationDuration = (Math.abs(deltaEnergy) * generationTimePerEnergy);
        // ensure that energylevel cannot drop below 0 or exeed maxEnergyLevel
        if (energyLevel > maxEnergyLevel) {
            console.log(`Maximum energy level was exceeded by ${energyLevel - maxEnergyLevel}!`)
            energyLevel = 100;
        };
        if (energyLevel <= 0) {
            console.log(`Minimum energy level was exceeded by ${0 - energyLevel}!`)
            energyLevel = 0;
        };
    };
};