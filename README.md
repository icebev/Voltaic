Voltaic by Joe Bevis
=====
Submitted for MED4141-A-S1-2021/2 module assessment.
-----
A dialogue based text adventure game. 

***Setup required:***

1. Install Node.js from https://nodejs.org/en/ 
2. Set Google Chrome as the default browser
3. Open the command prompt and enter: npm install -g live-server 
4. After install, locate the main project folder in the file system  
   and copy the directory address.
5. In command prompt, use cd **"your address here"** to get to the project root folder
6. Enter the command: live-server
7. The game will begin on a new Chrome tab using a live server

***Contingency Plan:***
If the setup steps above do not work, and there is no text being displayed:

1. Open index.html and uncomment the indicated line (44) that will use the alternative scripted version of the text
2. Open globalVariables.js in the scripts folder and comment out the AJAX request code block at the top  
3. Save and close both files
4. Attempt to run the game on Google Chrome or the Opera GX browser by opening the index.html file
