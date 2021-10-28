//// DEBUG KEY COMMANDS FOR VOLTAIC ////
//----------------------------------------------------
// Contains the code for the debug commands for changing the scene and player energy level in game.
// Last modified by Joe Bevis 28/10/2021
//----------------------------------------------------

/*
The event listener waits for a key to be released. If the game has started operations will be performed based on the key:
e adds 10 energy (Until maximum is reached)
r removes 10 energy (to a minimum of 1 )
numerical keys 1-4 will change the encounter or location in the same way the game updates using the UpdateGameText function.
1: Start
2: Field
3: Market
4: Finale
*/

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
                if (energyLevel <= 1) energyLevel = 1;
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