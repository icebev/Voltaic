//// ALTERNATIVE JS FILE CONTAINING THE ADVENTURE TEXT NODES ////
//----------------------------------------------------
// Contains a single array of the adventure text nodes to be used by the game.
// This should only be accessed if the AJAX request for the adventureTextNodes.json file in globalVariables.js is not working.
// Last modified by Joe Bevis 28/10/2021
//----------------------------------------------------

const adventureTextNodes = [
    {
        "nodeId": 1,
        "text": ["You have awoken at last.", "Your blue eyes slowly flicker into life.", "You sit up amongst the rubble."],
        "textSpeed": "fast",
        "encounterChange": 1,
        "transition": 1.5,
        "changeTrackSet": "S",
        "changeTrack": "Sa",
        "changeBackground": "junkyard",
        "encounters": []
    },
    {
        "nodeId": 2,
        "text": ["You find yourself surrounded by junk and rusty machinery.", "All around you there are rusted mechanical parts."]
    },
    {
        "nodeId": 3,
        "text": ["You probably have a few questions.", "You might be wondering how you got here.", "This is all terribly confusing.", "This whole situation is bizarre.", "It's always good to be curious."],
        "dialogueChoices": [
            {
                "text": "Where am I?",
                "nextText": 4
            },
            {
                "text": "Who am I?",
                "nextText": 5
            },
            {
                "text": "Why am I?",
                "nextText": 6
            },
            {
                "text": "I'll take a look around.",
                "nextText": 7
            }
        ]
    },
    {
        "nodeId": 4,
        "text": ["Judging by your surroundings, you are in a scrapyard.", "It looks like you're in some kind of scrapyard.", "This place is like a robot graveyard..."],
        "skipToNode": 3
    },
    {
        "nodeId": 5,
        "text": ["Your name is _playerName and you are alive!", "You are the legendary _playerName of the scrapheap!", "You were born of batteries. You are batteryborn!", "You are a cellular organism, voltaic cells that is."],
        "skipToNode": 3
    },
    {
        "nodeId": 6,
        "text": ["You look down at your hands and see only metal.", "This is not the time for an existential crisis!",  "The real question. Why is _playerName ?"],
        "skipToNode": 3
    },
    {
        "nodeId": 7,
        "text": ["You soon see something glinting in amongst the scrap.", "Amongst the rubble, something catches your eye."],
        "dialogueChoices": [
            {
                "text": "Ooh, shiny!",
                "nextText": 8
            },
            {
                "text": "It could be dangerous, I'll leave it.",
                "nextText": 11
            }
        ]
    },
    {
        "nodeId": 8,
        "text": "You've found a battery and it looks intact.",
        "dialogueChoices": [
            {
                "text": "I'll eat it now.",
                "energyChange": 25,
                "noEnergyAnimation": 1,
                "nextText": 9
            },
            {
                "text": "I'll save it for later.",
                "inventoryAdd": ["battery"],
                "nextText": 10
            }
        ]
    },
    {
        "nodeId": 9,
        "text": "You feel a surge of newfound energy. It was delicious!",
        "skipToNode": 11
    },
    {
        "nodeId": 10,
        "text": "You put away the battery. It might come in handy later.",
        "skipToNode": 11
    },
    {
        "nodeId": 11,
        "text": ["You hear the sound of heavy footsteps behind you, getting closer.", "Something huge approaches you from behind.", "You notice too late that you have company."],
        "changeTrackSet": "A",
        "changeTrack": "Aa"
    },
    {
        "nodeId": 12,
        "text": ["BOOM! SMASHHH! CRUNCHHH!", "BZZT! INVESTIGATING DISTURBANCE.", "BZZT! TRACKING RESIDUAL ENERGY SIGNATURES."],
        "speaker": "???",
        "textSpeed": "slow"
    },
    {
        "nodeId": 13,
        "transition": 1,
        "text": ["BZZT! VOLATILE TRASH DETECTED! PROCEEDING TO CRUSH.", "BZZT! ALERT! ANIMATE SCRAP DETECTED!"],
        "changeTrack": "Ab",
        "encounterChange": 1,
        "encounters": ["crusher"],
        "textSpeed": "slow",
        "speaker": "???"
    },
    {
        "nodeId": 14,
        "text": ["The enormous robot raises an arm hammer ready to demolish you.", "The robot doesn't seem to want to make friends.", "The size of the pulverizing hammers is intimidating."],
        "changeTrack": "Ac",
        "dialogueChoices": [
            {
                "text": "Wait, I'm not trash!",
                "nextText": 15
            },
            {
                "text": "Hmm, it doesn't seem very smart...",
                "nextText": 18
            },
            {
                "text": "Not today, take THIS!",
                "nextText": 21,
                "energyChange": -30
            },
            {
                "text": "I'll do nothing.",
                "nextText": 24
            }
        ]
    },
    {
        "nodeId": 15,
        "text": ["Please stop Mr. Robot! I'm not just trash!", "No, don't do it! I only just got here!", "Leave me alone you brute!"],
        "speaker": "player"
    },
    {
        "nodeId": 16,
        "text": ["The hulking robotic trash compactor freezes for a moment.", "The machine stops and stares at you for a moment."]
    },
    {
        "nodeId": 17,
        "text": ["CR-NCHR ERROR CODE 404. CANNOT COMPUTE. REBOOTING SYSTEMS.", "CR-NCHR ERROR CODE 400. REQUEST DENIED. REBOOTING SYSTEMS."],
        "speaker": "CR-NCHR",
        "textSpeed": "slow",
        "skipToNode": 14
    },
    {
        "nodeId": 18,
        "text": "MANUAL OVERRIDE! You are unauthorised to proceed!",
        "speaker": "player"
    },
    {
        "nodeId": 19,
        "text": "CR-NCHR OVERRIDE ACCEPTED. DISENGAGING TARGET.",
        "textSpeed": "slow",
        "speaker": "CR-NCHR"
    },
    {
        "nodeId": 20,
        "text": "The robot stomps away. You remain safe for now.",
        "changeTrackSet": "S",
        "changeTrack": "Sa",
        "transition": 1,
        "encounterChange": 1,
        "encounters": [],
        "skipToNode": 25
    },
    {
        "nodeId": 21,
        "text": ["You unleash an arc of electricity from your hands!", "UNLIMITED POWER!", "You zap the robot using your energy!"],
        "changeTrack": "Ad",
        "transition": 0.5
    },
    {
        "nodeId": 22,
        "text": "CR-NCHR CORE INTEGRITY FAILURE. RE...boot..pzzzzzt...",
        "textSpeed": "slow",
        "speaker": "CR-NCHR"
    },
    {
        "nodeId": 23,
        "text": "The robot collapses in a smouldering heap. You remain safe for now.",
        "changeTrackSet": "S",
        "changeTrack": "Sa",
        "transition": 1,
        "encounterChange": 1,
        "encounters": [0],
        "skipToNode": 25
    },
    {
        "nodeId": 24,
        "text": "You stand still and prepare to be crushed.",
        "changeTrack": "Ad",
        "dialogueChoices": [
            {
                "text": "Wait, no!",
                "nextText": 14
            },
            {
                "text": "I accept this fate.",
                "energyChange": -100,
                "noEnergyAnimation": 1
            }
        ]
    },
    {
        "nodeId": 25,
        "text": ["I should probably get out of here...", "It's time to go.", "I think I should get going."],
        "speaker": "player"
    },
    {
        "nodeId": 26,
        "text": "Which direction will you go?",
        "dialogueChoices": [
            {
                "text": "I'll go North.",
                "nextText": 27
            },
            {
                "text": "I'll go South.",
                "nextText": 27
            },
            {
                "text": "I'll go East.",
                "nextText": 27
            },
            {
                "text": "I'll go West.",
                "nextText": 27
            }
        ]
    },
    {
        "nodeId": 27,
        "text": ["After walking for some time, you find yourself in a field.", "Your surroundings open up into a field."],
        "transition": 1.5,
        "encounterChange": 1,
        "changeTrackSet": "B",
        "changeTrack": "Ba",
        "changeBackground": "field"
    },
    {
        "nodeId": 28,
        "text": "The full Moon shines down, casting everything in a silver light."
    },
    {
        "nodeId": 29,
        "text": "WOOF! WOOF!",
        "speaker": "???",
        "changeTrack": "Bb"
    },
    {
        "nodeId": 30,
        "text": ["Out of the shadows, a robot dog appears!", "A robotic dog jumps out from behind a tree!"],
        "transition": 1.5,
        "encounterChange": 1,
        "encounters": ["lyza"]
    },
    {
        "nodeId": 31,
        "text": ["It looks up at you with puppy eyes. It seems hungry.", "It clearly likes you, but is low on energy."],
        "dialogueChoices": [
            {
                "text": "I'll pet the dog.",
                "energyChange": -10,
                "noEnergyAnimation": 1,
                "nextText": 33
            },
            {
                "text": "I'll transfer it some of my energy!",
                "energyChange": -30,
                "energyLevelRequired": 40,
                "nextText": 34
            },
            {
                "text": "I'll feed it my battery.",
                "inventoryRequired": ["battery"],
                "inventoryRemove": ["battery"],
                "nextText": 35
            },
            {
                "text": "I'll leave the pesky mutt alone.",
                "nextText": 42
            }
        ]
    },
    {
        "nodeId": 33,
        "text": ["It bites your hand as you reach down! It seems hungry.", "Mistaking your hand for food, it bites!"],
        "changeTrack": "Bc",
        "skipToNode": 43
    },
    {
        "nodeId": 34,
        "text": ["You recharge the dog using your own energy.", "You transfer some of your own life force."],
        "changeTrack": "Bd",
        "skipToNode": 36
    },
    {
        "nodeId": 35,
        "text": "The dog gulps down the battery. Then it jumps into your arms! ",
        "changeTrack": "Bd"
    },
    {
        "nodeId": 36,
        "text": "You've made a new friend. You see the name Lyza on its collar."
    },
    {
        "nodeId": 37,
        "text": "WOOF! WOOF!",
        "speaker": "Lyza",
        "skipToNode": 44
    },  
    {
        "nodeId": 44,
        "text": "Will you let the dog follow you?",
        "dialogueChoices": [
            {
                "text": "Yes.",
                "inventoryAdd" : ["lyza"],
                "nextText": 38
            },
            {
                "text": "No.",
                "nextText": 45
            }
        ]
    },
    {
        "nodeId": 45,
        "text": "See you around, doggo.",
        "speaker": "player",
        "skipToNode": 42
    }, 
    {
        "nodeId": 38,
        "text": ["Aww! Come here little doggie, we'll get you to safety.", "Hey now, little dog! Come with me."],
        "speaker": "player",
        "transition": 0.5,
        "encounterChange" : 1,
        "encounters": [],
        "skipToNode": 42
    },
    {
        "nodeId": 39,
        "text": "You siphon the energy from the dog.",
        "changeTrack": "Bd"
    },
    {
        "nodeId": 40,
        "text": "WOOF woo.. wo...",
        "speaker": "Lyza",
        "textSpeed": "slow",
        "changeTrack": "Bd"
    },
    {
        "nodeId": 41,
        "transition": 1,
        "text": "...",
        "speaker": "player",
        "encounterChange" : 1,
        "encounters": []
    },
    {
        "nodeId": 42,
        "text": ["You continue walking along the winding road.", "Your journey continues."],
        "transition": 0.5,
        "encounterChange" : 1,
        "encounters": [],
        "skipToNode": 60
    },
    {
        "nodeId": 43,
        "text": "It looks up at you once again.",
        "dialogueChoices": [
            {
                "text": "That hurt! I'll drain it's energy.",
                "energyChange": 30,
                "nextText": 39
            },
            {
                "text": "I'll transfer it some of my own energy.",
                "energyChange": -30,
                "energyLevelRequired": 40,
                "inventoryAdd": ["lyza"],
                "nextText": 34
            },
            {
                "text": "I'll feed it my battery.",
                "inventoryRequired": ["battery"],
                "inventoryRemove": ["battery"],
                "inventoryAdd": ["lyza"],
                "nextText": 35
            },
            {
                "text": "I'll leave the pesky mutt alone.",
                "nextText": 42
            }
        ]
    },
    {
        "nodeId": 60,
        "text": "After travelling for some time, you reach the ouskirts of a city."
    },
    {
        "nodeId": 61,
        "text": "Soon you are surrounded by market stalls.",
        "transition": 1,
        "changeTrackSet": "C",
        "changeTrack": "Ca",
        "changeBackground": "market",
        "encounterChange": 1,
        "encounters": []
    },
    {
        "nodeId": 62,
        "text": ["All kinds of merchandise is being sold here. You even see some fish heads for sale.", "All manner of items are on display. There is some nice jewellery over there.", "A colourful stall seems to be selling various hats."],       
        "dialogueChoices": [
            {
                "text": "I'll look at the fish heads.",
                "nextText": 63
            },
            {
                "text": "I'll go to the jewellery stand.",
                "nextText": 66
            },
            {
                "text": "I'll browse the fancy hats.",
                "nextText": 68
            },
            {
                "text": "I'll keep my head down.",
                "nextText": 72
            }
        ]
    },
    {
        "nodeId": 63,
        "text": "SLAPP! You've just been slapped with a fish. ",
        "textSpeed": "fast",
        "dialogueChoices": [
            {
                "text": "...",
                "energyChange": -10,
                "noEnergyAnimation": 1,
                "nextText": 64
            }
        ]
    },
    {
        "nodeId": 64,
        "text": "OWWW!",
        "textSpeed": "slow",
        "speaker": "player"
    },
    {
        "nodeId": 65,
        "text": "Psst! Over here! That looked painful.",
        "speaker": "???",
        "changeTrack": "Cb",
        "skipToNode": 80
    },
    {
        "nodeId": 66,
        "text": "You're too big for my jewellery! Move along!",
        "speaker": "Vendor"
    },
    {
        "nodeId": 67,
        "text": "Psst! Over here! I might be able to help. ",
        "speaker": "???",
        "changeTrack": "Cb",
        "skipToNode": 80
    },
    {
        "nodeId": 68,
        "text": "Are you after a hat? Which would you like?",
        "speaker": "Vendor",
        "dialogueChoices": [
            {
                "text": "The tricorn hat. [-10]",
                "energyChange": -10,
                "energyLevelRequired": 15,
                "inventoryAdd": ["tricorn"],
                "noEnergyAnimation": 1,
                "nextText": 69
            },
            {
                "text": "The viking helmet. [-10]",
                "energyChange": -10,
                "energyLevelRequired": 15,
                "inventoryAdd": ["viking"],
                "noEnergyAnimation": 1,
                "nextText": 69
            },
            {
                "text": "The top hat. [-10]",
                "energyChange": -10,
                "energyLevelRequired": 15,
                "inventoryAdd": ["tophat"],
                "noEnergyAnimation": 1,
                "nextText": 69
            },
            {
                "text": "I'm just browsing.",
                "nextText": 73
            }
        ]
    },
    {
        "nodeId": 69,
        "text": "I'll take that one!",
        "speaker": "player"
    },
    {
        "nodeId": 70,
        "text": "The new hat fits perfectly."
    },
    {
        "nodeId": 71,
        "text": "Psst! Over here! Nice hat by the way.",
        "speaker": "???",
        "changeTrack": "Cb",
        "skipToNode": 80
    },
    {
        "nodeId": 72,
        "text": "You try not to draw attention to yourself."
    },
    {
        "nodeId": 73,
        "text": "Psst! Over here! No, the other here!",
        "speaker": "???",
        "changeTrack": "Cb",
        "skipToNode": 80
    },
    {
        "nodeId": 80,
        "text": "Greetings. I'm triple A Pete.",
        "speaker": "AAA Pete",
        "transition": 1,
        "encounterChange": 1,
        "encounters": ["pete"]
    },
    {
        "nodeId": 81,
        "text": ["I've seen your kind before. You're running out of time.", "I know what you are. Your time is limited.",  "I've helped people like you before. You don't have long.", "What if I told you that you're running out of time."],
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "What do you mean?",
                "nextText": 86
            },
            {
                "text": "Who are you?",
                "nextText": 82
            },
            {
                "text": "What do you want?",
                "nextText": 97
            },
            {
                "text": "I'll walk away.",
                "nextText": 84
            }
        ]
    },
    {
        "nodeId": 82,
        "text": "Who even are you?",
        "speaker": "player"
    },
    {
        "nodeId": 83,
        "text": ["I'm a tech broker. That's all you need to know.", "I'm AAA Pete. I'm a tech broker.", "All you need to know is that I'm here to help.", "I'm a simple man. I sell technology and data."],
        "speaker": "AAA Pete",
        "skipToNode": 81
    },
    {
        "nodeId": 84,
        "text": "Wait! Don't walk away! I can help you...",
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "I'll keep walking.",
                "nextText": 150
            },
            {
                "text": "I'll hear him out.",
                "nextText": 81
            }
        ]
    },
    {
        "nodeId": 85,
        "text": "...",
        "textSpeed": "slow",
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "I'm running out of time?",
                "nextText": 86
            },
            {
                "text": "Who are you?",
                "nextText": 82
            },
            {
                "text": "What do you want?",
                "nextText": 97
            },
            {
                "text": "Actually, I'll walk away.",
                "nextText": 84
            }
        ]
    },
    {
        "nodeId": 86,
        "text": ["I feel fine. Why am I running out of time?", "How long do I have left?", "I don't understand. I feel fine."],
        "speaker": "player"
    },
    {
        "nodeId": 87,
        "text": ["As a being composed of batteries, your lifespan may be limited.", "Your body will quickly degrade without the right treatment.", "Once you run out of energy, you'll fade away."],
        "speaker": "AAA Pete"
    },
    {
        "nodeId": 88,
        "text": ["I might be able to help. I know a place...", "Fortunately, I know a place.", "There is somewhere you should go."],
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "A place for me?",
                "nextText": 95
            },
            {
                "text": "Can you recharge me?",
                "speaker": "player",
                "nextText": 89
            },
            {
                "text": "I have a different question...",
                "nextText": 85
            },
            {
                "text": "Actually, I'll walk away.",
                "nextText": 84
            }
        ]
    },
    {
        "nodeId": 89,
        "text": ["I'm not feeling so good... can you recharge me?", "I need more energy. Please recharge me."],
        "speaker": "player"

    },
    {
        "nodeId": 90,
        "text": "I could recharge you. But I know a place that can offer you so much more.",
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "A place for me?",
                "nextText": 95
            },
            {
                "text": "I have a different question...",
                "nextText": 85
            },
            {
                "text": "Actually, I'll walk away.",
                "nextText": 84
            }
        ]
    },
    {
        "nodeId": 95,
        "text": ["What is this place you speak of?", "A place... For me?", "What kind of place?"],
        "speaker": "player"
    },
    {
        "nodeId": 96,
        "text": "It's a refuge. It's run by Lee-Poe. He's just like you.",
        "speaker": "AAA Pete",
        "skipToNode": 100
    },
    {
        "nodeId": 97,
        "text": "What do I want? Now that you mention it...",
        "speaker": "AAA Pete",
        "skipToNode": 120
    },
    {
        "nodeId": 100,
        "text": ["I can give you the location or recharge you for your journey. For a price.", "My services aren't free."],
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "What will it cost me?",
                "nextText": 101
            },
            {
                "text": "I have a different question...",
                "nextText": 85
            },
            {
                "text": "A price?! I'LL ZAP HIM! [-30]",
                "energyChange": -30, 
                "energyLevelRequired": 35,
                "nextText": 350
            },
            {
                "text": "Actually, I'll walk away.",
                "nextText": 84
            }
        ]
    },
    {
        "nodeId": 101,
        "text": ["What can I give you? I don't have much.", "I don't have much to offer you."],
        "speaker": "player"
    },
    {
        "nodeId": 102,
        "text": ["Err.. I'll take anything really. I hadn't really thought about that.", "I'll take whatever you can offer. I'm not fussy."],
        "speaker": "AAA Pete"
    },
    {
        "nodeId": 103,
        "text": "I miss my poor Lyza...",
        "speaker": "AAA Pete",
        "nextText": 85,
        "dialogueChoices": [
            {
                "text": "Lyza?",
                "nextText": 120
            },
            {
                "text": "I'll offer my battery.",
                "inventoryRequired":["battery"],
                "inventoryRemove":["battery"],
                "nextText": 104
            },
            {
                "text": "I'll offer my tricorn hat.",
                "inventoryRequired":["tricorn"],
                "inventoryRemove":["tricorn"],
                "nextText": 106
            },
            {
                "text": "I'll offer my viking helmet.",
                "inventoryRequired":["viking"],
                "inventoryRemove":["viking"],
                "nextText": 106
            },
            {
                "text": "I'll offer my top hat.",
                "inventoryRequired":["tophat"],
                "inventoryRemove":["tophat"],
                "nextText": 106
            },
            {
                "text": "I'll offer some energy. [-20]",
                "energyLevelRequired": 25,
                "nextText": 130
            },
            {
                "text": "Actually, hold on...",
                "energyLevelRequired": 25,
                "nextText": 100
            }
        ]
    },
    {
        "nodeId": 104,
        "text": "Here, take my battery.",
        "speaker": "player",
        "nextText": 134
    },
    {
        "nodeId": 105,
        "text": "A battery! Perfect, thank you.",
        "speaker": "AAA Pete",
        "skipToNode": 134
    },
    {
        "nodeId": 106,
        "text": "Here, take my hat.",
        "speaker": "player"
    },
    {
        "nodeId": 107,
        "text": "I love hats, thank you! That'll do nicely.",
        "speaker": "AAA Pete",
        "skipToNode": 134
    },
    {
        "nodeId": 120,
        "text": "I don't suppose you've seen a robot dog recently? My dear Lyza went missing a couple of days ago.",
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "I'll return the dog.",
                "inventoryRequired": ["lyza"],
                "inventoryRemove": ["lyza"],
                "nextText": 125
            },
            {
                "text": "I'll keep quiet about it.",
                "nextText": 121
            }
        ]
    },
    {
        "nodeId": 121,
        "text": "...",
        "speaker": "player"
    },
    {
        "nodeId": 122,
        "text": "*Sighs* Nevermind...",
        "speaker": "AAA Pete",
        "skipToNode": 85
    },
    {
        "nodeId": 125,
        "text": "Yes! She's right here!",
        "speaker": "player"
    },
    {
        "nodeId": 126,
        "text": "WOOF! WOOF!",
        "encounterChange": 1,
        "transition":1,
        "encounters": ["pete", "lyza"],
        "speaker": "lyza"
    },
    {
        "nodeId": 127,
        "text": "My dear Lyza! Welcome home!",
        "encounters": ["pete", "lyza"],
        "speaker": "AAA Pete",
        "skipToNode": 134
    },
    {
        "nodeId": 130,
        "text": "I can give you some of my energy.",
        "speaker": "player"
    },
    {
        "nodeId": 131,
        "text": "...In return for the location of the refuge, are you sure?",
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "Yes.",
                "energyChange": -20,
                "inventoryAdd": ["map"],
                "nextText": 132
            },
            {
                "text": "Actually, no...",
                "nextText": 100
            }
        ]
    },
    {
        "nodeId": 132,
        "text": "You transfer the energy.",
        "transition": 0.5,
        "skipToNode": 141
    },
    {
        "nodeId": 134,
        "text": "Let me help you in return.",
        "speaker": "AAA Pete",
        "skipToNode": 135
    },
    {
        "nodeId": 135,
        "text": "Would you like to be recharged or receive the location of the refuge?",
        "speaker": "AAA Pete",
        "dialogueChoices": [
            {
                "text": "Recharge me please.",
                "energyChange": 40,
                "nextText": 140
            },
            {
                "text": "I want the location.",
                "inventoryAdd": ["map"],
                "nextText": 139
            }
        ]
    },
    {
        "nodeId": 139,
        "text": "Give me the location please.",
        "speaker": "player",
        "skipToNode": 141
    },
    {
        "nodeId": 140,
        "transition": 0.5,
        "text": "Here you go, friend!",
        "speaker": "AAA Pete",
        "skipToNode": 150
    },
    {
        "nodeId": 141,
        "text": "... ... ...",
        "textSpeed": "slow",
        "speaker": "AAA Pete"

    },
    {
        "nodeId": 142,
        "text": "Data transfer complete, good luck out there.",
        "speaker": "AAA Pete",
        "skipToNode":150
    },
    {
        "nodeId": 142,
        "text": "Data transfer complete, good luck out there.",
        "speaker": "AAA Pete",
        "skipToNode":150
    },
    {
        "nodeId": 150,
        "text": "You head out of town."
    },
    {
        "nodeId": 151,
        "text": "You set off in search of a place to call home.",
        "encounterChange": 1,
        "transition": 1,
        "changeBackground": "darkness",
        "changeTrackSet": "D",
        "changeTrack": "Da"
    },
    {
        "nodeId": 152,
        "text": ["The road ahead is long. Surviving will require energy.", "The journey will be long and arduous. Energy will be required."],
        "dialogueChoices": [
            {
                "text": "I'll find the refuge using the location.",
                "inventoryRequired":["map"],
                "noEnergyAnimation": 1,
                "energyChange": -20,
                "nextText": 154
            },
            {
                "text": "Lyza will be my guide dog.",
                "inventoryRequired":["lyza"],
                "noEnergyAnimation": 1,
                "energyChange": -20,
                "nextText": 159
            },
            {
                "text": "I'll eat my battery now.",
                "inventoryRequired":["battery"],
                "inventoryRemove":["battery"],
                "noEnergyAnimation": 1,
                "energyChange": 25,
                "nextText": 158
            },
            {
                "text": "I'll keep on going.",
                "noEnergyAnimation": 1,
                "energyChange": -40,
                "nextText": 153
            }
        ]
    },
    {
        "nodeId": 153,
        "text": "You get lost on route.",
        "dialogueChoices": [
            {
                "text": "I'll try to keep on going...",
                "noEnergyAnimation": 1,
                "energyChange": -30,
                "nextText": 154
            }
        ]
    },
    {
        "nodeId": 154,
        "text": "You see lights on the horizon. It's the refuge!"
    },
    {
        "nodeId": 155,
        "text": ["You've found santuary at last with others of your kind.", "You've found a new home.", "This place looks perfect for you."]
    },
    {
        "nodeId": 156,
        "text": ["Welcome _playerName ! I'm Lee-Poe. We are all the same here. We'll look after you.", "Hello, _playerName . I've been expecting you.", "_playerName , these are the droids you are looking for."],
        "speaker": "Lee-Poe",
        "dialogueChoices": [
            {
                "text": "Thank you!",
                "noEnergyAnimation": 1,
                "energyChange": 100,
                "nextText": 157
            }
        ]
    },
    {
        "nodeId": 157,
        "text": ["Hooray!", "Let's goooo!", "I did it!"],
        "speaker": "player",
        "skipToNode": 403
    },
    {
        "nodeId": 158,
        "text": "You consume your battery in preparation for the journey. It's delicious!",
        "skipToNode": 152
    },
    {
        "nodeId": 159,
        "text": "Lyza seems to know the way!",
        "skipToNode": 154
    },
    {
        "nodeId": 350,
        "transition": 0.5,
        "text": ["DIE, PETE!", "NO. TAKE THIS!"],
        "speaker": "player"
    },
    {
        "nodeId": 351,
        "textSpeed":"fast",
        "text": "AAAARRGGHH!",
        "speaker": "AAA Pete"
    },
    {
        "nodeId": 352,
        "changeTrack": "Cc",
        "text": "Pete falls to the floor.",
        "transition": 1,
        "encounterChange": 1,
        "encounters": []
    },
    {
        "nodeId": 353,
        "text": "The night market guards surround you.",
        "dialogueChoices": [
            {
                "text": "I'll attempt to escape!",
                "noEnergyAnimation": 1,
                "nextText": 354
            },
            {
                "text": "I'll fight to the end.",
                "nextText": 355
            }
        ]
    },
    {
        "nodeId": 354,
        "text": "You are surrounded. There is no escape.",
        "dialogueChoices": [
            {
                "text": "I'll fight to the end.",
                "nextText": 355
            }
        ]
    },
    {
        "nodeId": 355,
        "speaker": "player",
        "textSpeed": "slow",
        "text": ["COME AT ME!", "Bring it on."],
        "dialogueChoices": [
            {
                "text": "...",
                "energyChange": -100,
                "noEnergyAnimation": 1,
                "nextText": 404
            },
            {
                "text": "Hasta la vista, baby!",
                "inventoryRequired": ["terminator"],
                "energyChange": 100,
                "noEnergyAnimation": 1,
                "nextText": 356
            }
        ]
    },
    {
        "nodeId": 356,
        "text": "You survive and drain Pete's energy supply!",
        "skipToNode": 150
    },
    {
        "nodeId": 403,
        "transition": 0.5,
        "text": "Congratulations! You've won the game. Restart?",
        "dialogueChoices": [
            {
                "text": "Yes",
                "nextText": 0
            },
            {
                "text": "No",
                "nextText":405
            }]
    },
    {
        "nodeId": 404,
        "transition": 0.5,
        "text": ["You are unable to continue as the last dregs of energy leave you. Restart?", "The blue light in your eyes fades away. Restart?", "With no energy remaining, you cannot continue. Restart?"],
        "dialogueChoices": [
            {
                "text": "Yes",
                "nextText": 0
            },
            {
                "text": "No",
                "energyChange": 1,
                "noEnergyAnimation": 1,
                "nextText":405
            }]
    },
    {
        "nodeId": 405,
        "text": "Thank you for playing!"
    }
]