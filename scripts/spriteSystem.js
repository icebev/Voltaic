//// ANIMATED CHARACTER SPRITE SYSTEM CODE FOR VOLTAIC ////
//----------------------------------------------------
// Contains code for the handling of the character sprites drawn on the background canvas.
// Last modified by Joe Bevis 21/10/2021
//----------------------------------------------------

// a generic character class for efficient sprite configuration
class Character {
    constructor(x, y, imageSrc, spriteW, spriteH, scale, frames, interval) {
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
        this.frameInterval = interval;
        this.markedForDeletion = false;
    };
    // update and draw methods will be called every time the screen refreshes as part of the animation loop - increments the animation frame at a frequency based on the frameInterval
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

// create the player character using the character class
const playerBatteryborn = new Character(-5, 170, "img/batteryborn.png", 180, 180, 3, 2, 800);

// object that manages the NPC sprite(s) being displayed 
const encounterSpriteManager = {
    activeEncounterCharacters: [],
    // encounters array lists all of the available encounters with their setup details
    encounters: [
    {
        name: "crusher",
        fileName: "img/crusherbot.png",
        spriteWidth: 144,
        spriteHeight: 176,
        xPos: 1125,
        yPos: 125,
        scale: 3.5,
        frames: 2,
        interval: 1200,
    },
    {
        name: "lyza",
        fileName: "img/robotDog.png",
        spriteWidth: 128,
        spriteHeight: 128,
        xPos: 1240,
        yPos: 370,
        scale: 2.5,
        frames: 2,
        interval: 300,
    },
    {
        name: "pete",
        fileName: "img/AAAPete.png",
        spriteWidth: 112,
        spriteHeight: 192,
        xPos: 1220,
        yPos: 100,
        scale: 3,
        frames: 2,
        interval: 1000,
    },
    ],
    // method that can clear or update the activeEncounterCharacters array to change which sprites are being drawn on screen 
    switchEncounter(encounterNames) {
        this.activeEncounterCharacters.splice(0, this.activeEncounterCharacters.length);
        if (encounterNames) {
            // retrieve the setup details for the encounter from the encounters array by searching the encounter array for a matching name
            encounterNames.forEach(targetName => { 
                let targetEncounter = this.encounters.find(encounter => encounter.name === targetName);
                if (targetEncounter) {
                    this.activeEncounterCharacters.push(new Character(targetEncounter.xPos, targetEncounter.yPos, targetEncounter.fileName, targetEncounter.spriteWidth, targetEncounter.spriteHeight, targetEncounter.scale, targetEncounter.frames, targetEncounter.interval))
                    console.log(this.activeEncounterCharacters);
                } else {
                    console.log(`Enounter ${targetName} does not exist.`);
                };
            });
        } else {
            return console.log(`No requested enounter.`);
        }
    }, 
    updateNPCs(deltatime) {
        this.activeEncounterCharacters.forEach((character) => character.update(deltatime));
    },
    drawNPCs() {
        this.activeEncounterCharacters.forEach((character) => character.draw());
    }
};