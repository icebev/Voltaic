// array of objects containing the text to be displayed in game updated when the game starts
function UpdateTextNodes () {
    adventureTextNodes = [
        {
            nodeId: 1,
            text: 'Hello, ' + _playerName +'. you have awoken at last.',
        },
        {
            nodeId: 2,
            text: 'You find yourself in a scrapyard surrounded by junk. There is an old battery nearby.',
            speaker: "player",
            dialogueChoices: [
                {
                    text: 'Take the battery',
                    inventoryAdd: ['battery'],
                    nextText: 3
                },
                {
                    text: 'Leave the battery',
                    nextText: 6
                },
                {
                    text: 'Stamp on the battery.',
                    energyLevelRequired: 50,
                    energyChange: -10,
                    nextText: 16
                },
                {
                    text: 'Stamp on the battery.',
                    energyLevelRequired: 50,
                    energyChange: -10,
                    nextText: 16
                },
                {
                    text: 'Stamp on the battery.',
                    energyLevelRequired: 50,
                    energyChange: -10,
                    nextText: 16
                }]
        },
        {
            nodeId: 3,
            text: 'You pick up the battery. Will you eat it?',
            dialogueChoices: [
                {
                    text: 'Yes! Yummy.',
                    inventoryRemove: ['battery'],
                    energyChange: +50,
                    nextText: 6
                },
                {
                    text: 'No, save it for later.',
                    nextText: 6
                }]
        },
        {
            nodeId: 5,
            speaker: "none",
            text: 'You stop but the battery is ruined.',
        },
        {
            nodeId: 6,
            text: 'You find a robot dog who needs a new battery.',
            textSpeed: 'slow',
            speaker: "narrator",
            dialogueChoices: [
                {
                    text: 'Use your battery',
                    inventoryRequired: ['battery'],
                    inventoryRemove: ['battery'],
                    nextText: 21
                },
                {
                    text: 'Transfer some of your own power',
                    energyChange: -40,
                    nextText: 21
                },
                {
                    text: 'Pet the dog.',
                    nextText: 20
                },
                {
                    text: 'Drain the dog',
                    energyChange: 50, 
                    nextText: 22
                }]
        },
        {
            nodeId: 16,
            text: 'Keep going...!'
        },
        {
            nodeId: 17,
            text: 'Are you still stamping?!',
            dialogueChoices: [
                {
                    text: 'Uhh yeah',
                    nextText: 18
                },
                {
                    text: 'No, I\'ll stop',
                    nextText: 5
                },
            
            ]
                
        },
        {
            nodeId: 18,
            text: 'The battery explodes and you die.'
        },
        {
            nodeId: 19,
            text: 'Well Done! Restart?',
            dialogueChoices: [
                {
                    text: 'Yes',
                    nextText: 0
                },
                {
                    text: 'No',
                    nextText: 99
                }]
        },
        {
            nodeId: 20,
            text: 'The dog is rabid and bites you. You die.',
            skipToNode: 19
        },
        {
            nodeId: 21,
            text: 'You made a new not so furry friend!',
            skipToNode: 19
        },
        {
            nodeId: 22,
            text: 'You monster!',
            skipToNode: 19
        },
        {
        nodeId: 99,
            text: 'Thank you for playing!'
        }
    ];
};