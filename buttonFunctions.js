//// BUTTON FUNCTION CODE FOR VOLTAIC ////

// function that checks the player name entered when the start button is clicked
function NameEntrySubmit() {
    PlayButtonSound();
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

// the continue button skips to the desired node if applicable 
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