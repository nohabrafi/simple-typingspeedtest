// ▼▼▼▼ bs to be printed out ▼▼▼▼
var sentenceStr = "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary";
var rndWordStr = "One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The";
// ▲▲▲▲ bs to be printed out ▲▲▲▲

var rndWordList = rndWordStr.split(' '); // split splits the string at the given separator, returns an array
var sentenceList = sentenceStr.split(' ');

var pressedCounter = 0; // counts the buttons pressed
var gameStarted = false; // is the game started?

var gamemode = "sentence"; // gamemode
let i = 0; // i

let txtArea = document.getElementById('txtArea');

const txtChecker = () => { // checks for a match

    document.getElementById('counterArea').innerHTML = pressedCounter;

    let outputArea = document.getElementById("outputArea"); // get the text that is DISPLAYED

    if (outputArea.innerHTML) { // only when there is a word being displayed

        if (txtArea.value == outputArea.innerHTML) { // compare the two values
            console.log('We got a match!');
            txtArea.value = ""; // clear write area when match

            // decides which function to call depending on the chosen gamemode
            if (gamemode == 'sentence') {
                sentChangeText();
            } else {
                rndChangeText();
            }

        } else {
            console.log('no match');
        }

    } else {
        return; //....else do nothing
    }
}

// toggle gamomodes; change as well the gamemode variable as the output info about gamemode
const changeGamemode = () => {

    let gamemodeArea = document.getElementById('gameMode');

    if (gamemode == "sentence") {
        gamemode = "word";
        gamemodeArea.innerHTML = "selected mode: " + gamemode;
    } else {
        gamemode = "sentence"
        gamemodeArea.innerHTML = "selected mode: " + gamemode;
    }
}

//starts the game: first with a 1 sec timeout to have enough time to start writing 
const startGame = () => {
    // 1 sec delay
    setTimeout(() => {

        // add eventlistener
        txtArea.addEventListener('keydown', (event) => {
            if (event.key != 'Backspace') {
                pressedCounter++;
            }
        });
        console.log("eventlistener added");

        //disable gamemode changer button
        document.getElementById("modeChanger").disabled = true;


        // decides which function to call depending on the chosen gamemode; initial call of one of the functions
        if (gamemode == 'sentence') {
            sentChangeText();
        } else {
            rndChangeText();
        }


        if (!gameStarted) { // doesnt let the game (the setInterval) start more than once

            console.log("started");

            let totalMilliseconds = 6000; // total time in ms

            gameTimer = setInterval(() => { // timer for the game

                if (totalMilliseconds > 0) { // count backwards until 0

                    totalMilliseconds--;

                    // calculate seconds from ms by division
                    var seconds = Math.floor(totalMilliseconds / 100);
                    // calculate milliseconds by modulo: 2999 = 100*29 + 99; 2875 = 100*28 + 75; always the rest is returned
                    var milliseconds = Math.floor(totalMilliseconds % 100);

                    // if they only consist of one number, than add a 0 infront to make it look good
                    if (seconds < 10) {
                        seconds = "0" + seconds;
                    }
                    if (milliseconds < 10) {
                        milliseconds = "0" + milliseconds;
                    }
                    // display the time in the corresponding element
                    document.getElementById("timer").innerHTML = seconds + ":" + milliseconds;
                } else {
                    endGame(); // when no time left, end the game
                }

            }, 10);

            gameStarted = true;

        } else {
            console.log("game already started")
        }
    }, 1000);
}

const endGame = () => {

    clearInterval(gameTimer); // stop game timer

    console.log("time is up");
    // remove event listener from keyboard
    txtArea.removeEventListener('keydown', (event) => {
        if (event.key != 'Backspace') {
            pressedCounter++;
        }
    });

    // enable game changer
    document.getElementById("modeChanger").disabled = false;

    // clear output area
    document.getElementById("outputArea").innerHTML = "";

    //clear and disable write area
    txtArea.value = "";
    txtArea.disabled = true;

    // game is not started
    gameStarted = false;

    // calculate and show results
    var result = (pressedCounter / 5) * 0.5;
    document.getElementById("result").innerHTML = "Your result: " + result + " WPM";

    // create restart button 
    let restartBtn = document.createElement('button');
    let text = document.createTextNode("Restart");
    restartBtn.appendChild(text);
    restartBtn.id = "restartBtn";

    // what happens when restartbutton is clicked
    restartBtn.addEventListener('click', () => {

        pressedCounter = 0;
        document.getElementById('counterArea').innerHTML = pressedCounter;
        txtArea.disabled = false; // enable textarea
        document.getElementById("result").innerHTML = ""; // clear result field
        startGame(); // call start game function
        restartBtn.remove(); // remove restart button

    });

    document.body.appendChild(restartBtn);
}

/* RANDOM */
const rndChangeText = () => { // changes the text; doesnt throw the same twice

    let outputArea = document.getElementById("outputArea");


    if (!outputArea.innerHTML) {
        outputArea.innerHTML = rndWordList[calcRnd(rndWordList.length)] + " ";
    } else {
        var tempHolder = outputArea.innerHTML.substring(0, outputArea.innerHTML.length - 1);
        // console.log(rndWordList.indexOf(outputArea.innerHTML));
        // console.log(outputArea.innerHTML);
        rndWordList.splice(rndWordList.indexOf(tempHolder), 1); // remove the one thats already showing
        outputArea.innerHTML = rndWordList[calcRnd(rndWordList.length)] + " "; // calculate a new random location without the previous one
        rndWordList.push(tempHolder); // put it back
    }


}

/* NOT RANDOM (SENTENCE)*/
const sentChangeText = () => {

    let outputArea = document.getElementById("outputArea");

    outputArea.innerHTML = sentenceList[i++] + " "; // goes through the sentence (through the array);
}

const calcRnd = (max) => { // random calculator with a max value parameter
    return Math.floor(Math.random() * max);
}