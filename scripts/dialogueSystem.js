//// DIALOGUE SYSTEM CODE FOR VOLTAIC ////
//----------------------------------------------------
// Contains the functions that retrieve the adventure text using a JSON node system before updating the dialogue choices, background, music, nameplates and sprites.
// Last modified by Joe Bevis 18/10/2021
//----------------------------------------------------

// function called when the game should begin after the player name has been entered or upon restart
function StartGame() {
    backgroundManager.switchBackground("junkyard");
    energyLevel = 50;
    inventory = [];
    transitionOpacity = 1.5;
    StartTracks("S");
    ChangeTrack("Sa");
    UpdateGameText(1);
};

// main function that takes in the target node ID value to decide what should happen next
function UpdateGameText(targetNodeId) {
    // find the specified text node inside the array literal using the target node ID
    let targetTextNode = adventureTextNodes.find(textNode => textNode.nodeId === targetNodeId);
    // if successful the current text node becomes the original target for future reference
    if (targetTextNode) {
        currentTextNode = targetTextNode;
        console.log("Text node retrieved: " + currentTextNode.nodeId);
    } else {
        console.log("Failed to retrieve a node with ID: " + targetNodeId);
        return false;
    };    
    // update the soundtracks if requested by the node 
    if (currentTextNode.changeTrackSet) {
        StartTracks(currentTextNode.changeTrackSet);
        console.log(`Switched to music track set ${currentTextNode.changeTrackSet}`);
    };  
    if (currentTextNode.changeTrack) {
        ChangeTrack(currentTextNode.changeTrack);
        console.log(`Switched to music track ${currentTextNode.changeTrack}`);
    };
    // starts a fade from black transisiton if requested by the node
    if (currentTextNode.transition) {
        transitionOpacity = currentTextNode.transition;
    };
    // changes the background if requested by the node
    if (currentTextNode.changeBackground) {
        backgroundManager.switchBackground(currentTextNode.changeBackground);
    };
    // changes the encounter character being drawn if requested by the node
    if (currentTextNode.encounterChange === 1) {
        console.log(`Encounter request for node ${currentTextNode.nodeId} received.`);
        encounterSpriteManager.switchEncounter(currentTextNode.encounters);
    };
    // update the shown adventure text, character reveal speed, character nameplates and dialogue option buttons passing properties of the retrieved node 
    ChangeTextSpeed(currentTextNode.textSpeed);
    // if there is an array of multiple texts for the same node, then one is selected at random. Otherwise the text is passed into the ChangeAdventureText function as normal
    if (typeof currentTextNode.text != "string") {
        let textSelector = Math.floor((Math.random() * currentTextNode.text.length))
        ChangeAdventureText(currentTextNode.text[textSelector]);
    } else {
        ChangeAdventureText(currentTextNode.text);
    };
    UpdateNamePlates(currentTextNode.speaker);
    CreateChoiceButtons(currentTextNode.dialogueChoices);
};

// called before new text is displayed or when the skip button is clicked and changes the character delay value used by the typewriter effect in ms
function ChangeTextSpeed(speed) {
    switch (speed) {
        case "slow":
            characterRevealDelay = 100;
            break;
        case "fast":
            characterRevealDelay = 50;
            break;
        // superfast is used by the skip button to make the text rapidly appear
        case "superfast":
            characterRevealDelay = 10;
            break;    
        default:
            characterRevealDelay = 80;
            break;
    };
};

// function to display the adventure text retrieved from the current text node with a typewriter effect by first creating invisible span elements for each letter
function ChangeAdventureText(inputString) {
    if (inputString) {
        // setting the allCharactersRevealed boolean to false to indicate that there is text to reveal with the typewriter effect only if there is valid input string
        allCharactersRevealed = false;
    } else {
        return console.log(`Warning, there is no text for node ${currentTextNode.nodeId}!`);
    }
    // remove any old text span elements inside the adventure text container
    while (adventureTextContainerElement.firstChild) {
        adventureTextContainerElement.removeChild(adventureTextContainerElement.firstChild);
    };
    // show the skip button when the text is changed and hide any dialogue choices so that they cannot be selected before all the text is revealed
    skipButtonElement.style.visibility = "Visible";
    dialogueChoicesElement.style.visibility = "Hidden";
    // iterate through each word of the input string to include the entered player name if that word is _playerName
    let words = inputString.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (words[i] === "_playerName") {
            words[i] = _playerName;
        };
    };
    // the revivedString is the full input string now containing the player name instead of _playerName 
    let revivedString = words.join(" ");
    // set the array of span elements back to empty before adding the new hidden ones
    characterSpans = [];
    revivedString.split("").forEach((character) => {
        let newSpan = document.createElement("span");
        newSpan.innerHTML = character;
        newSpan.classList.add("hidden");
        // change the text color based on the speaker to make it clear who is speaking at any time
        switch (currentTextNode.speaker) {
            case "player":
                newSpan.style.color = "blue";
                break;
            default:
                // if no speaker is set the color will be black
                if (currentTextNode.speaker) {
                    newSpan.style.color = "orange";
                };
                break;
        };
        // add the newly created span element to the text container and the characterSpans array for use when revealing them with the RevealSpanCharacters function
        adventureTextContainerElement.appendChild(newSpan);
        characterSpans.push(newSpan);
    });
};

// show or hide the dialogue name plates based on the current speaker indicated by the current text node
function UpdateNamePlates(speaker) {
    switch (speaker) {
        case "player":
            namePlateLeftElement.style.visibility = "Visible";
            namePlateRightElement.style.visibility = "Hidden";
            break;
        default:
            // right name plate text also changes based on the speaker
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
            // before displaying the choice check whether the inventory and energy requirements are met using the CheckChoiceRequirements function
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
    // check inventory requirements by iterating through the required item array
    if (dialogueChoice.inventoryRequired) {
        for (let i = 0; i < dialogueChoice.inventoryRequired.length; i++) {
            let requiredItem = dialogueChoice.inventoryRequired[i];
            if (!inventory.includes(requiredItem)) {
                console.log(`The required item ${requiredItem} for node ${currentTextNode.nodeId} dialogue choice has not been acquired.`)
                return false;
            };
        };       
    }; 
    // check energy level requirements using the current energylevel
    if (dialogueChoice.energyLevelRequired) {
        if (dialogueChoice.energyLevelRequired > energyLevel) {
            console.log(`The ${dialogueChoice.energyLevelRequired} energy required by node ${currentTextNode.nodeId} dialogue choice exceeds current energy.`);
            return false  
        };
    };
    return true;       
}; 

// function called as part of the animation loop that adds the 'revealed' class to each of the adventure text span elements over time to make them visible for the typewriter effect
function RevealSpanCharacters(revealList, deltatime) {
    timeSinceLastCharacter += deltatime;
    // only attempt to reveal if the revealList has elements remaining
    if (timeSinceLastCharacter > characterRevealDelay && revealList.length > 0) {
        var spanToReveal = revealList.splice(0, 1)[0];
        // remove the hidden CSS class and add the revealed class to make the span visible
        spanToReveal.classList.remove('hidden');
        spanToReveal.classList.add('revealed');
        timeSinceLastCharacter = 0 + (timeSinceLastCharacter % 100);
    // hide the skip button and display the choice buttons if all the text is now visible   
    } else if (!revealList.length && !allCharactersRevealed) {
        skipButtonElement.style.visibility = "Hidden";
        allCharactersRevealed = true;
        DisplayChoiceButtons(currentTextNode);
    };
};

// function to display the relevant buttons once all adventure text is revealed
function DisplayChoiceButtons(textNode) {
    // if there are no dialogue choices to display, display the continue button instead taking the current text node as the parameter to detect a skipToNode request
    if (!currentTextNode.dialogueChoices) {
        continueButtonElement.style.visibility = "Visible";
        continueButtonElement.onclick = function() {SelectContinue(textNode)};
    } else {
        dialogueChoicesElement.style.visibility = "Visible";
    }; 
};