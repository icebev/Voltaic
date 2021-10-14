//// CANVAS ANIMATION CODE FOR VOLTAIC ////

const canvas = {
    width: 1600,
    height: 900
};

// referencing thecanvas elements using the HTML ID
const backCanvas = document.getElementById("backCanvas");
const frontCanvas = document.getElementById("frontCanvas");
const vfxCanvas = document.getElementById("vfxCanvas");
// setting up the 2D canvas
const backCtx = backCanvas.getContext('2d');
const frontCtx = frontCanvas.getContext('2d');
const vfxCtx = vfxCanvas.getContext('2d');
// 16:9 aspect ratio to fit most modern monitors
backCanvas.width = canvas.width;
backCanvas.height = canvas.height;
frontCanvas.width = canvas.width;
frontCanvas.height = canvas.height;
vfxCanvas.width = canvas.width;
vfxCanvas.height = canvas.height * 0.7;

// function called as part of the animation loop that adds the 'revealed' class to each of the adventure text span elements over time to make them visible
function RevealSpanCharacters(revealList, deltatime) {
    timeSinceLastCharacter += deltatime;
    if (timeSinceLastCharacter > characterRevealDelay && revealList.length > 0) {
        var spanToReveal = revealList.splice(0, 1)[0];
        spanToReveal.span.classList.remove('hidden');
        spanToReveal.span.classList.add('revealed');
        timeSinceLastCharacter = 0 + (timeSinceLastCharacter % 100);
    // hide the skip button and display choice buttons if all the text is visible   
    } else if (revealList.length === 0 && currentTextNode.nodeId) {
        skipButtonElement.style.visibility = "Hidden";
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
function DrawEnergyBar() {
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
        case energyLevel <= 20:
            changePlayerMood('sad');
            vfxCtx.fillStyle = "red";
            break;
        case energyLevel <= 70:
            changePlayerMood();
            vfxCtx.fillStyle = "yellow";
            break;
        default:
            changePlayerMood('happy');
            vfxCtx.fillStyle = "green";
    };
    vfxCtx.fillRect(batteryX, batteryY, energyLevel * 2, batteryHeight);
    // add a numeric energy indicator and a descriptive label on top
    vfxCtx.font = '35px Impact';
    vfxCtx.fillStyle = "black";
    vfxCtx.fillText(energyLevel, centerLineX + 20, batteryY + 50);
    vfxCtx.fillText('Energy Level:', batteryX, batteryY - 20);
    // draw the black outline on top of the energy bar and back
    vfxCtx.beginPath();
    vfxCtx.rect(batteryX, batteryY, batteryWidth, batteryHeight);
    vfxCtx.rect(batteryX + batteryWidth , batteryY + batteryHeight / 2 - 10, 6, 20);
    vfxCtx.lineWidth = "6";
    vfxCtx.stroke();
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
    if (transitionOpacity >= 0) {
        frontCanvas.style.visibility = "Visible";
        frontCtx.fillStyle = "rgb(0, 0, 0," + transitionOpacity + ")";
        frontCtx.fillRect(0, 0, canvas.width, canvas.height);
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

// a generic animated back class for efficient sprite configuration
class Animatedback {
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
        backCtx.drawImage(this.image, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, 0, 0, canvas.width, canvas.height);
    }
};

var backgroundImage = new Image("img/BackgroundSheet.png");
backgroundImage.src = "img/BackgroundSheet.png";
backgroundManager = {
    backgrounds: backgroundImage,
    spriteWidth: 480,
    spriteHeight: 270,
    frameX: 0,
    frameY: 0,

    draw() {
        backCtx.drawImage(this.backgrounds, this.spriteWidth * this.frameX, this.spriteHeight * this.frameY, this.spriteWidth, this.spriteHeight, 0, 0, backCanvas.width, backCanvas.height);
    }
};

backgrounds = new Image("BackgroundSheet.png")
backCtx.drawImage(backgrounds, this.spriteWidth * this.frameX, 0, this.spriteWidth, this.spriteHeight, 0, 0, canvas.width, canvas.height);
batteryborn = new Character(5, 150, "img/batteryborn.png", 180, 180, 3, 2);
//junkyard = new Animatedback("img/junkyard.png", 1920, 1080, 2);
// animation loop
function Animate(timestamp) {
    let deltatime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    backCtx.clearRect(0, 0, canvas.width, canvas.height);
    frontCtx.clearRect(0, 0, canvas.width, canvas.height);
    vfxCtx.clearRect(0, 0, canvas.width, vfxCanvas.height);
    //junkyard.update(deltatime);
    //junkyard.draw();
    backgroundManager.draw();
    batteryborn.update(deltatime);
    batteryborn.draw();
    DrawEnergyBar();
    if (!gameStarted) {
        transitionOpacity = 1.5;
    }    
    CanvasTransitionUpdate(deltatime);
    RevealSpanCharacters(characterSpans, deltatime);
    requestAnimationFrame(Animate);
};


// begin the game animation loop once the widow has fully loaded
window.onload = Animate(0);
