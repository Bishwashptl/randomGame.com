//body
const body = document.querySelector("body");

// Buttons
const btnGetStarted = document.getElementById("btn_get_started");
const btnStart = document.getElementById("btn_start");
const btnHistory = document.getElementById("btn_history");
const btnChoose = document.getElementById("btn_choose");
const btnSet = document.getElementById("btn_set");
const btnPlay = document.querySelector(".btn_play");
const btnPlayAgain = document.getElementById("btn_play_again");
const btnGoToMenu = document.getElementById("btn_menu");
const btnScore = document.getElementById("btn_score");


// Sections
const sectionGreet = document.getElementById("sec_greet");
const sectionDesclaimer = document.getElementById("sec_desclaimer");
const userInput = document.getElementById("user_input");
const userChoice = document.getElementById("user_choice");
const numbersParent = document.getElementById("numbers");
const gamePlaySec = document.getElementById("game_play");
const result = document.getElementById("result");

// Text
const guessText = document.querySelector(".t1");
const warningText = document.getElementById("warning");
const hintText = document.getElementById("hint_text");
const playHeading = document.getElementById("play_headings");
const resultText = document.getElementById("result_text");
const mode = document.getElementsByClassName("mode");
const chances = document.getElementById("chances");

// select
const levelDropdown = document.getElementById("level_dropdown");

// Inputs
const initialInput = document.querySelector(".inp_from");
const finalInput = document.querySelector(".inp_to");

// Even listeners

levelDropdown.addEventListener("change", setMode);
btnGoToMenu.addEventListener("click", goToMenu);
btnScore.addEventListener("click", score);
btnPlayAgain.addEventListener("click", playGame);
btnPlay.addEventListener("click", playGame);
btnStart.addEventListener("click", () => {
    sectionDesclaimer.style.display = 'none';
    userInput.style.display = 'flex';
});
btnGetStarted.addEventListener("click", getStarted);
btnChoose.addEventListener("click", chooseNumbers);
btnSet.addEventListener("click", setRange);
initialInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        setRange();
    }
});
finalInput.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
        setRange();
    }
});

// variables
let initialRange = 1;
let finalRange = 10;
let chance = 3;
let currentMode = 'normal';
let totalGamePlayed = 0;
let gameWon = 0;
let gameLose = 0;


//functions
function setMode() {
    mode[0].innerHTML = `Mode: ${levelDropdown.value}`;
    mode[1].innerHTML = `Mode: ${levelDropdown.value}`;
    currentMode = levelDropdown.value;
}

let isOpen = false;
function chooseNumbers() {
    if (isOpen) {
        userChoice.style.display = "none";
        warningText.innerHTML = "";
        isOpen = false;
    } else {
        userChoice.style.display = "block";
        warningText.innerHTML = "";
        isOpen = true;
    }
}
let initialRangeValue = 1;
let finalRangeValue = 10;
function setRange() {
    if(!(initialInput.value.length === 0 || finalInput.value.length === 0)){

        initialRangeValue = Math.floor(parseFloat(initialInput.value));
        finalRangeValue = Math.floor(parseFloat(finalInput.value));
    }

    // if the final number is less than initial number
    if (finalRangeValue < initialRangeValue) {
        warningText.innerHTML = "The end number should be greater than initial one.";
    }
    else if ((finalRangeValue - initialRangeValue) > 100) {
        warningText.innerHTML = `Differnce should be lesser or equal to 100.The number exceeds by ${(finalRangeValue - initialRangeValue) - 100}. Please select numbers from ${initialRangeValue} to ${initialRangeValue + 100}.`;
    }
    // if any of the numbers or both are negative prompt the user to type postive numbers
    else if ((initialRangeValue < 0 && finalRangeValue < 0) || initialRangeValue < 0 || finalRangeValue < 0) {
        warningText.innerHTML = "Please enter positive integer number.";
    }
    // if the user has left anyone of the fields or both then show them this warning.
    else {

        guessText.innerHTML = `You have to guess a number from ${initialRangeValue} to ${finalRangeValue}.`
        userChoice.style.display = 'none';
    }
}


function getStarted() {
    sectionGreet.style.display = 'none';
    sectionDesclaimer.style.display = 'flex';
}

// To pause the into animation after 1 seconds asyncrosnouly.
// if the tab of our webpage is opened in browser then only execute this
setTimeout(() => sectionGreet.style.animationPlayState = 'paused', 1000);


function getRandomNumber(initialNumber, finalNumber) {
    return Math.floor((Math.random() * (finalNumber - 1)) + initialNumber) // The method Math.random() gives a random number from 0 to 1 only. To get our desirable numbers we multiply numbers with number generated by random method. Doing so we get our desirable numbers. Here we will get numbers from initial number choosen by user to final number.
    // In above expression Math.random() generated numbers between 0 and 1. like 0,0.2,0.03 etc.
    // so lets suppose 0.1 is generated by random method. Also suppose we want to get random numbers from 1 to 10;
    // since this method only returns numbers from 0 to 1. so we can never get numbers from 1 to 10. But applying some tricks we can achieve it
    // as per our example, if we get 0.1 from the method we multiply  it with 9 and get 0.9 and after that we add 1 to that and get 1.9. Again this value is round up to its nearest value by Math.floor method to 2. And finally we got 2.

}

let elementNo = 0;
function playGame() {
    chance = 3;
    chances.innerHTML = "Chance Remaining: 3";
    totalGamePlayed++; // To track how many times the game is played
    result.style.display = 'none';
    userInput.style.display = 'none';
    gamePlaySec.style.display = 'flex';
    playHeading.style.display = 'flex';
    numbersParent.style.display = 'flex';
    hintText.style.display = 'block';
    hintText.innerHTML = 'Best of luck!';

    let randomNum = getRandomNumber(initialRangeValue, finalRangeValue);
    // remove all childs of numbers tag if user click on play again
    if (numbersParent.children.length > 0) {
        randomNum = getRandomNumber(initialRangeValue, finalRangeValue);
        while (numbersParent.firstChild) {
            numbersParent.removeChild(numbersParent.firstChild);
        }
    }
    console.log(randomNum);

    for (i = initialRangeValue; i <= finalRangeValue; i++) {
        let p = document.createElement("p");
        p.setAttribute("class", `number number${elementNo++}`)
        p.innerHTML = i;
        numbersParent.appendChild(p);
        p.style.backgroundColor = '#002760';
        p.style.cursor = 'pointer';
        p.style.border = "solid 2px #002760";
        p.addEventListener("click", () => {
            checkNumber(p, randomNum);
        });
    }
}

function goToMenu() {
    userInput.style.display = "flex";
    gamePlaySec.style.display = 'none';
}

function score() {
    alert(`Total game played: ${totalGamePlayed}\nGame won: ${gameWon}\nGame lose: ${gameLose}`);
}

function checkNumber(p, randomNum) {
    if (parseInt(p.innerHTML) === randomNum) {
        gameWon++;
        btnPlayAgain.innerHTML = "Play again";
        playHeading.style.display = 'none';
        numbersParent.style.display = 'none';
        result.style.display = 'block';
        hintText.style.display = 'none';
    } else if (parseInt(p.innerHTML) < randomNum) {
        chances.innerHTML = `Chances Remaining: ${--chance}`;
        hintText.style.display = 'inline';
        p.style.backgroundColor = '#546b8f';
        p.style.cursor = 'default';
        p.style.border = "none";
        hintText.innerHTML = "The number is greater than that.";
    } else if (parseInt(p.innerHTML) > randomNum) {
        chances.innerHTML = `Chances Remaining: ${--chance}`;
        hintText.style.display = 'inline';
        p.style.backgroundColor = '#546b8f';
        p.style.border = "none";
        p.style.cursor = 'default';
        hintText.innerHTML = "The number is smaller than that."
    }

    let length = chances.innerHTML.length;
    if (parseInt(chances.innerHTML.charAt(length - 1)) === 0) {
        gameLose++;
        hintText.style.display = 'none';
        result.style.display = 'block';
        resultText.innerHTML = "Oops! You lose the game.";
        btnPlayAgain.innerHTML = "Try again";
        playHeading.style.display = 'none';
        numbersParent.style.display = 'none';
    }
}
