// energy particle system

// image particle class
class ImageParticle {
    constructor(imageSource, imageWidth, imageHeight, x, y, direction, speed, scale, shrinkFactor, targetCanvas) {
        this.image = new Image();
        this.image.src = imageSource;
        this.imageWidth = imageWidth;
        this.imageHeight = imageHeight;
        this.timeSinceLastUpdate = 0;
        this.updateInterval = 10
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.scale = scale;
        this.shrinkFactor = shrinkFactor;
        this.targetCanvas = targetCanvas;

        switch (direction) {
            case "right":
                this.directionX = this.speed;
                break;
            case "left":
                this.directionX = -this.speed;
                break;
            default:
                this.directionX = 0;
                break;
        };
        this.markedForDeletion = false;
    }
    update(deltatime) {
        this.timeSinceLastUpdate += deltatime;
        if (this.timeSinceLastUpdate >= this.updateInterval) {
            this.x += this.directionX;
            this.scale -= this.shrinkFactor;
            this.timeSinceLastUpdate = 0 + (this.timeSinceLastUpdate % this.updateInterval);
        };
        if (this.scale <= 0 || this.x < -this.imageWidth || this.x > backCanvas.width) {
            this.markedForDeletion = true;
        };
    };
    draw() {
        switch (this.targetCanvas) {
            case "back":
                backCtx.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight, this.x, this.y, this.imageWidth * this.scale, this.imageHeight * this.scale);
                break;
            case "vfx":
                vfxCtx.drawImage(this.image, 0, 0, this.imageWidth, this.imageHeight, this.x, this.y, this.imageWidth * this.scale, this.imageHeight * this.scale);
                break;
            default:
                break;
        };
    };
};

var energyBoltManager = {
    energyBoltArray: [],
    boltCreationDuration: 0,
    timeBetweenBolts: 200,
    timeSinceLastBolt: 0,
    currentBoltDirection: "right",

    generateEnergyBolts(deltatime) {
        this.timeSinceLastBolt += deltatime;
        if (disableTransferAnimations) {
            this.boltCreationDuration = 0;
        } else {
            this.boltCreationDuration -= deltatime;
        };
        if (this.timeSinceLastBolt >= this.timeBetweenBolts & this.boltCreationDuration > 0) {
            let nextBoltScale = 0.5 + 0.5 * Math.random();
            let nextBoltSpeed = 5 + 2 * Math.random();
            let nextBoltScaleFactor = 0.0025 * Math.random();
            let nextBoltY = 300 + 100 * Math.random();
            let nextBoltX = 0;
            let canvasAllocator = Math.random();
            let targetCanvas = "";
            (canvasAllocator > 0.5) ? targetCanvas = "back" : targetCanvas = "vfx";
            if (this.currentBoltDirection === "right") {
                nextBoltX = (playerBatteryborn.x + playerBatteryborn.spriteWidth * playerBatteryborn.scale / 2) + 100 * Math.random();
            } else if (this.currentBoltDirection === "left") {
                nextBoltX = 1200 + 100 * Math.random();
            } else {
                return console.log("Bolt direction error.");
            }
            this.energyBoltArray.push(new ImageParticle("img/energyBolt.png", 150, 150, nextBoltX, nextBoltY, this.currentBoltDirection, nextBoltSpeed, nextBoltScale, nextBoltScaleFactor, targetCanvas));
            this.timeSinceLastBolt = 0 + (this.timeSinceLastBolt % this.timeBetweenBolts);
            this.timeBetweenBolts = 100 + 200 * Math.random();
        };
    },    
    updateEnergyBolts(deltatime) {
        this.energyBoltArray.forEach(object => object.update(deltatime));
        for (let i = 0; i < this.energyBoltArray.length; i++) {
            this.energyBoltArray[i].y += -2 + 4 * Math.random();
            if (this.currentBoltDirection === "left" && this.energyBoltArray[i].x <= (playerBatteryborn.x + playerBatteryborn.spriteWidth * playerBatteryborn.scale / 2)) {
                this.energyBoltArray[i].markedForDeletion = true;
            } else if (this.currentBoltDirection === "right" && this.energyBoltArray[i].x >= 1300) {
                this.energyBoltArray[i].markedForDeletion = true;
            };
            if (this.energyBoltArray[i].markedForDeletion === true) {
                this.energyBoltArray.splice(i, 1);
                i--;
            };
        };
        if (this.energyBoltArray.length) {
            backgroundManager.switchLook("dramatic");
        } else {
            backgroundManager.switchLook();
        };
    },
    drawEnergyBolts() {
        this.energyBoltArray.forEach(object => object.draw());
    }
};

// create standard bolt image
var boltImage = new Image();
boltImage.src = "img/energyBolt.png"
// manager object for the floating energy bolts on the title screen
const titleBoltManager = {
    titleBoltUpdateInterval: 50,
    timeSinceTitleBoltUpdate: 0,
    maxBoltY: 265,
    minBoltY: 260,
    titleBolts : [
        leftBolt = {
            x: 530,
            y: 265,
            direction: "up" 
        },
        rightBolt = {
            x: 950,
            y: 265,
            direction: "down" 
        }
    ],
    drawTitleScreenBolts(deltatime) {
        this.timeSinceTitleBoltUpdate += deltatime;
        if (this.timeSinceTitleBoltUpdate >= this.titleBoltUpdateInterval) {
            this.titleBolts.forEach((bolt) => {
                let dY = Math.random();
                switch (bolt.direction) {
                    case "up":
                        bolt.y -= dY;
                        if (bolt.y <= this.minBoltY) {
                            bolt.direction = "down";
                        };
                        break;
                    case "down":
                        bolt.y += dY;
                        if (bolt.y >= this.maxBoltY) {
                            bolt.direction = "up";
                        };
                        break;
                };
            });
            this.timeSinceTitleBoltUpdate = 0 + (this.timeSinceTitleBoltUpdate % this.titleBoltUpdateInterval);
        };
        this.titleBolts.forEach((bolt) => {titleCtx.drawImage(boltImage, bolt.x, bolt.y, 120, 120)});
    }
};


