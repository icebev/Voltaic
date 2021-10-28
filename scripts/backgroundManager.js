//// BACKGROUND MANAGEMENT CODE FOR VOLTAIC ////
//----------------------------------------------------
// Contains code for the manipulation of the game background drawn on the background canvas.
// Last modified by Joe Bevis 28/10/2021
//----------------------------------------------------

// create the image consisting of a grid of low resolution illustrations and set the source
const backgroundImageGrid = new Image("img/BackgroundSheet.png");
backgroundImageGrid.src = "img/BackgroundSheet.png";

// object containing the available backgrounds listed under a setup array and methods to switch between and draw them
const backgroundManager = {
    backgrounds: backgroundImageGrid,
    frameWidth: 480,
    frameHeight: 270,
    frameX: 0,
    frameY: 0,
    backgroundSetup: [
    {
        name: "junkyard",
        yNumber: 0
    },
    {
        name: "field",
        yNumber: 1
    },
    {
        name: "market",
        yNumber: 2
    },
    {
        name: "darkness",
        yNumber: 3
    }],
    draw() {
        backCtx.drawImage(this.backgrounds, this.frameWidth * this.frameX, this.frameHeight * this.frameY, this.frameWidth, this.frameHeight, 0, 0, backCanvas.width, backCanvas.height);
    },
    switchLook(look) {
        // Each row in the background grid has a dramatic or alternative look next to it that can be shown for effect
        switch (look) {
            case "dramatic":
                this.frameX = 1;
                break;
            default:
                // add a short fade when switching back to the regular background
                if (this.frameX === 1) {
                    transitionOpacity = 0.5;
                };
                this.frameX = 0;
                break;
        };
    },
    switchBackground(backgroundName) {
        // if a background name listed under backgroundSetup is passed in then the row being drawn will switch accordingly
        let targetBackground = this.backgroundSetup.find(obj => obj.name === backgroundName);
        if (targetBackground) {
            this.frameY = targetBackground.yNumber;
            console.log(`Background switched to ${backgroundName}.`);
        } else {
            console.log(`Unable to change background to ${backgroundName}.`);
        };
    }
};
