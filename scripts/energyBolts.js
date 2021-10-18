//// ENERGY BOLT PARTICLE IMAGE MANAGMENT CODE ////
//----------------------------------------------------
// Contains code for the energy transfer animation particle system and for rendering the title screen floating bolts.
// Last modified by Joe Bevis 18/10/2021
//----------------------------------------------------

// image particle class for quick generation of new energy bolt particles
class ImageParticle {
    constructor(imageSource, imageWidth, imageHeight, x, y, direction, speed, scale, shrinkFactor, targetCanvas, shake) {
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
        this.markedForDeletion = false;
        // shrinkFactor determines how quickly the bolt gets smaller over time and the target canvas determines which layer the particle is drawn
        this.shrinkFactor = shrinkFactor;
        this.targetCanvas = targetCanvas;
        this.shakeMagnitude = shake;

        // use direction value is used to determine the directionX value which has a magnitude of the input speed
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
    };
    update(deltatime) {
        this.timeSinceLastUpdate += deltatime;
        // each update move across the screen by directionX pixels and change the scale by the shrinkFactor
        if (this.timeSinceLastUpdate >= this.updateInterval) {
            // move in the y direction by a random amount based on the shake magnitude to create an energy effect shaking effect
            this.y += (Math.random() * this.shakeMagnitude) - (this.shakeMagnitude * 0.5);
            this.x += this.directionX;
            this.scale -= this.shrinkFactor;
            this.timeSinceLastUpdate = 0 + (this.timeSinceLastUpdate % this.updateInterval);
        };
        // mark for deletion to indicate that it should be removed from an array if the bolt goes out of the screen or if it shrinks to 0 scale
        if (this.scale <= 0 || this.x < -this.imageWidth || this.x > backCanvas.width) {
            this.markedForDeletion = true;
        };
    };
    draw() {
        // draw the energy bolt on the assigned canvas to enable a 3D effect where the bolts are in front or behind the adventure text
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


// an object containing functions that manipulate the energy bolt particles 
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
            let nextBoltShrinkFactor = 0.0025 * Math.random();
            let nextBoltY = 300 + 100 * Math.random();
            let nextBoltX = 0;
            let canvasAllocator = Math.random();
            let targetCanvas = "";
            let shake = 10 + 10 * Math.random();
            (canvasAllocator > 0.5) ? targetCanvas = "back" : targetCanvas = "vfx";
            if (this.currentBoltDirection === "right") {
                nextBoltX = (playerBatteryborn.x + playerBatteryborn.spriteWidth * playerBatteryborn.scale / 2) + 100 * Math.random();
            } else if (this.currentBoltDirection === "left") {
                nextBoltX = 1200 + 100 * Math.random();
            } else {
                return console.log("Bolt direction error.");
            }
            this.energyBoltArray.push(new ImageParticle("img/energyBolt.png", 150, 150, nextBoltX, nextBoltY, this.currentBoltDirection, nextBoltSpeed, nextBoltScale, nextBoltShrinkFactor, targetCanvas, shake));
            this.timeSinceLastBolt = 0 + (this.timeSinceLastBolt % this.timeBetweenBolts);
            this.timeBetweenBolts = 100 + 200 * Math.random();
        };
    },    
    updateEnergyBolts(deltatime) {
        this.energyBoltArray.forEach(object => object.update(deltatime));
        for (let i = 0; i < this.energyBoltArray.length; i++) {
            
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


