//// ENERGY BOLT PARTICLE IMAGE MANAGMENT CODE ////
//----------------------------------------------------
// Contains code for the energy transfer animation particle system and for rendering the title screen floating bolts.
// Please see code reference [4] in REFERENCES.txt
// Last modified by Joe Bevis 28/10/2021
//----------------------------------------------------

// create a standard bolt image
var boltImage = new Image();
boltImage.src = "img/energyBolt.png"

// image particle class for quick generation of new energy bolt particles
class ImageParticle {
    constructor(standardImage, originX, originY, direction, speed, scale, shrinkFactor, targetCanvas, shake) {
        this.image = standardImage;
        this.imageWidth = this.image.width;
        this.imageHeight = this.image.height;
        this.timeSinceLastUpdate = 0;
        this.updateInterval = 10
        this.x = originX;
        this.y = originY;
        this.speed = speed;
        this.scale = scale;
        this.markedForDeletion = false;
        // shrinkFactor determines how quickly the particle gets smaller over time and the target canvas determines which layer the particle is drawn
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
        // mark for deletion to indicate that it should be removed from a controlling array if the particle goes out of the screen or if it shrinks to 0 scale
        if (this.scale <= 0 || this.x < -this.imageWidth || this.x > backCanvas.width) {
            this.markedForDeletion = true;
        };
    };
    draw() {
        // draw the partivle on the assigned canvas to enable a 3D effect where they are in front or behind the adventure text
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

// an object containing methods that manipulate the energy bolt particles stored in an array
var energyBoltManager = {
    energyBoltArray: [],
    boltCreationDuration: 0,
    timeBetweenBolts: 200,
    timeSinceLastBolt: 0,
    currentBoltDirection: "right",
    disableTransferAnimations: false,

    generateEnergyBolts(deltatime) {
        // new bolts are only generated while there is creation duration remaning. If the animations are disabled, then set that duration to 0
        this.timeSinceLastBolt += deltatime;
        if (this.disableTransferAnimations) {
            this.boltCreationDuration = 0;
        } else {
            this.boltCreationDuration -= deltatime;
        };
        if (this.timeSinceLastBolt >= this.timeBetweenBolts & this.boltCreationDuration > 0) {
            // generate semi randomised characteristics for each bolt that can then be passed into the ImageParticle contructor
            let nextBoltScale = 0.5 + 0.5 * Math.random();
            let nextBoltSpeed = 5 + 2 * Math.random();
            let nextBoltShrinkFactor = 0.0025 * Math.random();
            let nextBoltY = 300 + 100 * Math.random();
            let nextBoltX = 0;
            // either the bolt will be allocated the back canvas or the vfx canvas with a 50% chance of each
            let canvasAllocator = Math.random();
            let targetCanvas = "";
            let shake = 10 + 10 * Math.random();
            (canvasAllocator > 0.5) ? targetCanvas = "back" : targetCanvas = "vfx";
            // the starting X coordinate depends on the direction of the bolt
            if (this.currentBoltDirection === "right") {
                nextBoltX = (playerBatteryborn.x + playerBatteryborn.spriteWidth * playerBatteryborn.scale / 2) + 100 * Math.random();
            } else if (this.currentBoltDirection === "left") {
                nextBoltX = 1200 + 100 * Math.random();
            } else {
                return console.log("Bolt direction error.");
            }
            // for easy management of each particle, the new particle is pushed into the energyBoltArray
            this.energyBoltArray.push(new ImageParticle(boltImage, nextBoltX, nextBoltY, this.currentBoltDirection, nextBoltSpeed, nextBoltScale, nextBoltShrinkFactor, targetCanvas, shake));
            this.timeSinceLastBolt = 0 + (this.timeSinceLastBolt % this.timeBetweenBolts);
            this.timeBetweenBolts = 100 + 200 * Math.random();
        };
    },    
    updateEnergyBolts(deltatime) {
        this.energyBoltArray.forEach(object => object.update(deltatime));
        for (let i = 0; i < this.energyBoltArray.length; i++) {
            // mark for deletion when the energy bolt gets to extreme x positions
            if (this.currentBoltDirection === "left" && this.energyBoltArray[i].x <= (playerBatteryborn.x + playerBatteryborn.spriteWidth * playerBatteryborn.scale / 2)) {
                this.energyBoltArray[i].markedForDeletion = true;
            } else if (this.currentBoltDirection === "right" && this.energyBoltArray[i].x >= 1300) {
                this.energyBoltArray[i].markedForDeletion = true;
            };
            // the energy bolt object is removed from the actively drawn array if it is marked for deletion
            if (this.energyBoltArray[i].markedForDeletion === true) {
                this.energyBoltArray.splice(i, 1);
                i--;
            };
        };
        // while there are energy bolts on screen the background will show the alternative dramatic version
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

// manager object for the floating energy bolts on the title screen
const titleBoltManager = {
    titleBoltUpdateInterval: 50,
    timeSinceTitleBoltUpdate: 0,
    maxBoltY: 265,
    minBoltY: 260,
    boltSize: {
        width: 120,
        height: 120
    },
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
    // the bolts float up and down within a certain range asynchronously by gradually changing their y values randomly with each call of drawTitleSceenBolts
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
        this.titleBolts.forEach((bolt) => {titleCtx.drawImage(boltImage, bolt.x, bolt.y, this.boltSize.width, this.boltSize.height)});
    }
};


