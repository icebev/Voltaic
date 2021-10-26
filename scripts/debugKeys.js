//// DEBUG KEY COMMANDS FOR VOLTAIC ////
//----------------------------------------------------
// Contains the code for the debug commands for changing the scene and player energy level in game.
// Last modified by Joe Bevis 18/10/2021
//----------------------------------------------------

window.addEventListener("keyup", (event) => {
    if (gameStarted) {
        console.log(`Debug key ${event.key} used.`)
        switch (event.key) {
            case 'e':
                energyLevel += 10;
                if (energyLevel >= 100) energyLevel = 100;
                break;
            case 'r':  
                energyLevel -= 10;
                if (energyLevel <= 5) energyLevel = 5;
                break;
            case '1':
                UpdateGameText(1);
                break;
            case '2':
                UpdateGameText(27);
                break;
            case '3':
                UpdateGameText(61);
                break;
            case '4':
                UpdateGameText(151);
                break;
            default:
                console.log(`${event.key} is not a valid debug key.`)
                break;

        }
    }
});