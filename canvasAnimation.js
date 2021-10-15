//// CANVAS ANIMATION CODE FOR VOLTAIC ////

// 16:9 aspect ratio for the canvase to fit most modern monitors
const canvasDimensions = {
    width: 1600,
    height: 900
  };

// referencing the canvas elements using the HTML ID
/* 
backCanvas: For rendering the background image and chatacter sprites.
frontCanvas: On top of most HTML elements for the fade from black transition effect.
vfxCanvas: For rendering the energy bar and energy transfer VFX, does not cover the dialogue choice buttons.
*/ 
const backCanvas = document.getElementById("backCanvas");
const frontCanvas = document.getElementById("frontCanvas");
const vfxCanvas = document.getElementById("vfxCanvas");

// setting up the each 2D canvas context
const backCtx = backCanvas.getContext('2d');
const frontCtx = frontCanvas.getContext('2d');
const vfxCtx = vfxCanvas.getContext('2d');

// define canvas dimensions
backCanvas.width = canvasDimensions.width;
backCanvas.height = canvasDimensions.height;
frontCanvas.width = canvasDimensions.width;
frontCanvas.height = canvasDimensions.height;
vfxCanvas.width = canvasDimensions.width;
vfxCanvas.height = canvasDimensions.height;

// function called as part of the animation loop that adds the 'revealed' class to each of the adventure text span elements over time to make them visible
function RevealSpanCharacters(revealList, deltatime) {
    timeSinceLastCharacter += deltatime;
    if (timeSinceLastCharacter > characterRevealDelay && revealList.length > 0) {
        var spanToReveal = revealList.splice(0, 1)[0];
        spanToReveal.span.classList.remove('hidden');
        spanToReveal.span.classList.add('revealed');
        timeSinceLastCharacter = 0 + (timeSinceLastCharacter % 100);
    // hide the skip button and display choice buttons if all the text is visible   
    } else if (!revealList.length && !allCharactersRevealed) {
        skipButtonElement.style.visibility = "Hidden";
        allCharactersRevealed = true;
        DisplayChoiceButtons(currentTextNode);
    };
};

// function to display the relevant buttons once all adventure text is revealed
function DisplayChoiceButtons(textNode) {
    // if there are no dialogue choices to display, display the continue button instead
    if (!currentTextNode.dialogueChoices) {
        continueButtonElement.style.visibility = "Visible";
        continueButtonElement.onclick = function() {SelectContinue(textNode)};
    } else {
        dialogueChoicesElement.style.visibility = "Visible";
    }; 
};


// drawing an energy bar on the canvas with the appearance of a battery
function DrawEnergyBar(deltatime) {
    timeSinceCorrection += deltatime;
    let correctionInterval = 500 * Math.random();
    let centerLineX = vfxCanvas.width / 2;
    let batteryWidth = maxEnergyLevel * 2;
    let batteryHeight = 75;
    let batteryX = centerLineX - batteryWidth / 2;
    let batteryY = 100;
    // translucent back
    vfxCtx.fillStyle = "rgb(255, 255, 255, 0.4)";
    vfxCtx.fillRect(centerLineX - batteryWidth / 2, batteryY, batteryWidth, batteryHeight);
    // alter player sprite mood and battery fill color based on the energy level
    switch (true) {
        case shownEnergyLevel <= 20:
            ChangePlayerMood('sad');
            vfxCtx.fillStyle = "red";
            break;
        case shownEnergyLevel <= 70:
            ChangePlayerMood();
            vfxCtx.fillStyle = "yellow";
            break;
        default:
            ChangePlayerMood('happy');
            vfxCtx.fillStyle = "green";
    };
    vfxCtx.fillRect(batteryX, batteryY, shownEnergyLevel * 2, batteryHeight);
    // add a numeric energy indicator and a descriptive label on top
    vfxCtx.font = '35px Impact';
    vfxCtx.fillStyle = "black";
    vfxCtx.fillText(shownEnergyLevel, centerLineX + 20, batteryY + 50);
    vfxCtx.fillText('Energy Level:', batteryX, batteryY - 20);
    // draw the black outline on top of the energy bar and background
    vfxCtx.beginPath();
    vfxCtx.rect(batteryX, batteryY, batteryWidth, batteryHeight);
    vfxCtx.rect(batteryX + batteryWidth , batteryY + batteryHeight / 2 - 10, 6, 20);
    vfxCtx.lineWidth = "6";
    vfxCtx.stroke();
    if (timeSinceCorrection >= correctionInterval) {
        timeSinceCorrection = 0 + (timeSinceCorrection % correctionInterval);
        let energyDifference = energyLevel - shownEnergyLevel;
        if (energyDifference > 0) {
            shownEnergyLevel += 1;
        } else if (energyDifference < 0) {
            shownEnergyLevel -= 1;
        };
    };
};

// function that switches the sprite animation Y frame to reflect current mood
function ChangePlayerMood(mood) {
    switch (mood) {
        case 'sad':
            playerBatteryborn.frameY = 1;
            break;
        case 'happy':
            playerBatteryborn.frameY = 2;
            break;
        default:
            playerBatteryborn.frameY = 0;
            break;
    };
};

// if the transistion opacity value has been set it will slowly return to fully transparent as the function is called 
function CanvasTransitionUpdate(deltatime) {
    if (transitionOpacity >= 0) {
        frontCanvas.style.visibility = "Visible";
        frontCtx.fillStyle = "rgb(0, 0, 0," + transitionOpacity + ")";
        frontCtx.fillRect(0, 0, frontCanvas.width, frontCanvas.height);
        transitionOpacity -= (deltatime * 0.0005);
    } else {
        frontCanvas.style.visibility = "Hidden";
    };
};

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
        backCtx.drawImage(this.image, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, this.x, this.y, this.spriteWidth * this.scale, this.spriteHeight * this.scale);
    };
};

const playerBatteryborn = new Character(5, 150, "img/batteryborn.png", 180, 180, 3, 2);

// the main animation loop
function Animate(timeStamp) {

    let deltatime = timeStamp - lastFrameTime;
    lastFrameTime = timeStamp;

    // fully clear each canvas
    backCtx.clearRect(0, 0, backCanvas.width, backCanvas.height);
    frontCtx.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    vfxCtx.clearRect(0, 0, vfxCanvas.width, vfxCanvas.height);

    // while on the title screen, ensure that the background is obscured by canvas transition darkness
    if (!gameStarted) {
        transitionOpacity = 1.5;
    };    
    CanvasTransitionUpdate(deltatime);

    // draw the background using the backgroundManager method
    backgroundManager.draw();

    energyBoltManager.generateEnergyBolts(deltatime);
    energyBoltManager.updateEnergyBolts(deltatime);
    energyBoltManager.drawEnergyBolts();

    // update and draw the player character and energy bar
    playerBatteryborn.update(deltatime);
    playerBatteryborn.draw();
    DrawEnergyBar(deltatime);

    

    // call the reveal span characters function every animation loop so that it is as seamless at possible
    RevealSpanCharacters(characterSpans, deltatime);
    
    requestAnimationFrame(Animate);
};


// begin the game animation loop once the window has fully loaded
window.onload = Animate(0);
