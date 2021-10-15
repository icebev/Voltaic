//// BACKGROUND MANAGEMENT CODE FOR VOLTAIC ////

const backgroundImageGrid = new Image("img/BackgroundSheet.png");
backgroundImageGrid.src = "img/BackgroundSheet.png";
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
    }],
    draw() {
        backCtx.drawImage(this.backgrounds, this.frameWidth * this.frameX, this.frameHeight * this.frameY, this.frameWidth, this.frameHeight, 0, 0, backCanvas.width, backCanvas.height);
    },
    switchLook() {
        (this.frameX) ? this.frameX = 0 : this.frameX = 1;
    },
    switchBackground(backgroundName) {
        let targetBackground = this.backgroundSetup.find(obj => obj.name === backgroundName);
        if (targetBackground) {
            this.frameY = targetBackground.yNumber;
            console.log(`Background switched to ${backgroundName}.`);
        } else {
            console.log(`Unable to change background to ${backgroundName}.`);
        };
    }
};
