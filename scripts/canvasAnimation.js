//// CANVAS ANIMATION CODE FOR VOLTAIC ////
//----------------------------------------------------
// Contains the main animation loop and canvas related functions.
// Please see code reference [7] in REFERENCES.txt.
// Last modified by Joe Bevis 28/10/2021
//----------------------------------------------------

// a 16:9 aspect ratio for the canvas to fit modern monitors
const canvasDimensions = {
    width: 1600,
    height: 900
};

/* 
CANVAS DESCRIPTIONS: 
backCanvas: For rendering the background image and character sprites.
vfxCanvas: For rendering the energy bar and some of the energy transfer VFX on top of the adventure text and battery box HTML elements.
frontCanvas: On top of all HTML elements except the title screen container element for the fade from black transition effect to function.
titleScreenCanvas: For rendering the moving energy bolts on the title screen on the very top layer.
*/ 
var canvasArray = [];
const backCanvas = document.getElementById("backCanvas");
const vfxCanvas = document.getElementById("vfxCanvas");
const frontCanvas = document.getElementById("frontCanvas");
const titleScreenCanvas = document.getElementById("titleScreenOverlay");
canvasArray.push(backCanvas, vfxCanvas, frontCanvas, titleScreenCanvas);

// setting up each 2D canvas context for drawing
var ctxArray = [];
const backCtx = backCanvas.getContext('2d');
const vfxCtx = vfxCanvas.getContext('2d');
const frontCtx = frontCanvas.getContext('2d');
const titleCtx = titleScreenCanvas.getContext('2d');
ctxArray.push(backCtx, frontCtx, vfxCtx, titleCtx);

// iterate through each canvas object and set the desired dimensions
canvasArray.forEach((canvas) => {
    canvas.width = canvasDimensions.width;
    canvas.height = canvasDimensions.height;
});

// disabling image smoothing on the canvas contexts makes the pixel art sharper
ctxArray.forEach((ctx) => {
    ctx.imageSmoothingEnabled = false;
});

// begin the game animation loop (below) once the window has fully loaded
window.onload = Animate(0);

// the main animation loop has a timestamp parameter to keep track of the time between frame requests
function Animate(timeStamp) {

    let deltatime = timeStamp - lastFrameTime;
    lastFrameTime = timeStamp;

    // fully clear each canvas
    ctxArray.forEach((ctx) => {
        ctx.clearRect(0, 0, canvasDimensions.width, canvasDimensions.height);
    });

    // while on the title screen, ensure that the background is obscured by canvas transition darkness and draw the floating energy bolts
    if (!gameStarted) {
        transitionOpacity = 1.5;
        titleBoltManager.drawTitleScreenBolts(deltatime);
    };    
    CanvasTransitionUpdate(deltatime);

    // draw the background using the backgroundManager method
    backgroundManager.draw();

    // generate any new energy bolt particles if required, then update and draw then
    energyBoltManager.generateEnergyBolts(deltatime);
    energyBoltManager.updateEnergyBolts(deltatime);
    energyBoltManager.drawEnergyBolts();

    // update and draw the player character and energy bar
    playerBatteryborn.update(deltatime);
    // ensure that if the terminator character cosmetics are to be drawn instead then the default player sprite is not drawn
    if (!inventory.includes("terminator")) {
        playerBatteryborn.draw();
    };
    DrawEnergyBar(deltatime);
    
    // iterate through the cosmetic items array to draw the items that are in the player inventory
    cosmeticContainer.forEach((cosmeticObject) => {
        cosmeticObject.spriteObject.update(deltatime);
        if (inventory.includes(cosmeticObject.name)) {
            cosmeticObject.spriteObject.frameY = playerBatteryborn.frameY;
            cosmeticObject.spriteObject.draw();
        };
    });
    
    // update and draw the encounter NPC sprites
    encounterSpriteManager.updateNPCs(deltatime);
    encounterSpriteManager.drawNPCs();

    // call the reveal span characters function every animation loop so that it is as seamless at possible
    RevealSpanCharacters(characterSpans, deltatime);
    
    requestAnimationFrame(Animate);
};

// drawing an energy bar on the canvas with the appearance of a battery
function DrawEnergyBar(deltatime) {
    timeSinceCorrection += deltatime;
    // random time between changing the shown energy level to be closer to the actual energy level for the animated effect
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
    // using separate variables for the shown energy level and actual energy level the battery can be animated by slowly closing the gap between the two values
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

// function that switches the player and therefore cosmetic item sprite animation Y frame to reflect current mood
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

// if the transistion opacity value has been set it will slowly return to fully transparent as the function is called as part of the animation loop
function CanvasTransitionUpdate(deltatime) {
    if (transitionOpacity >= 0) {
        frontCanvas.style.visibility = "Visible";
        frontCtx.fillStyle = "rgb(0, 0, 0," + transitionOpacity + ")";
        frontCtx.fillRect(0, 0, frontCanvas.width, frontCanvas.height);
        // deltatime is used in the multiplication to ensure that all computers have the same transition times regardless of framerate
        transitionOpacity -= (deltatime * 0.0005);
    } else {
        frontCanvas.style.visibility = "Hidden";
    };
};