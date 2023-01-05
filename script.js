/**
 * Author: Phil Davis
 *  Date: January, 2023
 * Description: BlackJack Game Using JavaScript
 */

// Arrays for cards 
var suits = ["S", "H", "C", "D"];
var numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "J", "Q", "K", "A"];
// Global variables
var allPlCards = [];
var allPcCards = [];
var randomCard1;
var randomCard2;
var playerScore = 0;
var pcScore = 0;
var img3;
var plCounter = 0;
var pcCounter = 0;
var sevenCounter = 0;
var i = 0;
var isCheat = 0;
var pass;
var plAce = 0;
var pcAce = 0;

// randomGen() function to generate random card
function randomGen() {
    //getting random value from cards arrays
    randomCard1 = numbers[Math.floor(Math.random() * numbers.length)];
    randomCard2 = suits[Math.floor(Math.random() * suits.length)];
    //if number is 11 (joker) and suit is Clubs or Diamonds then change the card(because of joker's probability).
    if (randomCard1 == "11") {
        while (randomCard2 == "C" || randomCard2 == "D") {
            randomCard2 = suits[Math.floor(Math.random() * suits.length)];
            randomCard1 = numbers[Math.floor(Math.random() * numbers.length)];
        }
    }
}

// playerScoreCal() function to calculate player's score
function playerScoreCal() {
    //assigning values to the cards and adding into score for player
    if (randomCard1 == "11") {
        playerScore += 0;
    }
    if (randomCard1 == "7") {
        sevenCounter++;
    }
    if (randomCard1 == "J" || randomCard1 == "Q" || randomCard1 == "K") {
        playerScore += 10;
    }
    else if (randomCard1 == "A") {
        plAce++;
        playerScore += 11;
    }
    else {
        playerScore += parseInt(randomCard1);
    }
    //changing score according to how many Aces are drawn for player
    if (playerScore > 21 && plAce > 0) {
        playerScore -= 10;
        plAce = 0;
    }
    //showing score on screen for player
    document.getElementById("playerScore").style.display = "inline";
    document.getElementById("playerScore").innerHTML = playerScore;
}

// pcScoreCal() function to calculate dealer's score
function pcScoreCal() {
    //assigning values to the cards and adding into score for dealer
    if (randomCard1 == "11") {
        pcScore += 0;
    }
    if (randomCard1 == "J" || randomCard1 == "Q" || randomCard1 == "K") {
        pcScore += 10;
    }
    else if (randomCard1 == "A") {
        pcAce++;
        pcScore += 11;
    }
    else {
        pcScore += parseInt(randomCard1);
    }
    //changing score according to how many Aces are drawn for dealer
    if (pcScore > 21 && pcAce > 0) {
        pcScore -= 10;
        pcAce = 0;
    }
    //showing score on screen for dealer
    document.getElementById("pcScore").style.display = "inline";
    document.getElementById("pcScore").innerHTML = pcScore;
}

// cheat() function for 777 cheating
function cheat() {
    pass = prompt("Please enter the password");
    while (pass != 777) {
        alert("Wrong Password!");
        pass = prompt("Please enter the password");
    }
    if (pass == 777) {
        isCheat = 1;
    }
}

// addPlCard() function to add players card into player's card area
function addPlCard() {
    randomGen(); //generating random card
    //cheating element
    if (isCheat == 1) {
        randomCard1 = "7";
    }
    //show win if player gets joker
    if ((randomCard1 + randomCard2) == "11S" || (randomCard1 + randomCard2) == "11H") {
        youWin();
    }
    //showing player card
    allPlCards.push(randomCard1 + randomCard2);
    var img = document.createElement("img");
    img.setAttribute("src", "cards/" + randomCard1 + randomCard2 + ".png");
    img.setAttribute("class", "cardsImg");
    document.getElementById("plCards").appendChild(img);
    plCounter++;
}

// addPcCard() function to add dealer card into dealer's card area
function addPcCard() {
    randomGen(); //generating random card
    //show win if dealer gets joker
    if ((randomCard1 + randomCard2) == "11S" || (randomCard1 + randomCard2) == "11H") {
        youLose();
    }
    //showing dealer card
    allPcCards.push(randomCard1 + randomCard2);
    var img2 = document.createElement("img");
    img2.setAttribute("src", "cards/" + randomCard1 + randomCard2 + ".png");
    img2.setAttribute("class", "cardsImg");
    document.getElementById("pcCards").appendChild(img2);
    pcCounter++;
}

// startGame() function to start the game on press of play button
function startGame() {
    document.getElementById("logo").className = "logoShrink"; //shrinking the logo
    document.getElementById("instructions").style.display = "none"; //hiding instructions
    //showing dealer and player on screen
    document.getElementsByTagName('h2')[0].style.display = 'block';
    document.getElementsByTagName('h2')[1].style.display = 'block';
    //hiding buttons
    document.getElementById("cheatBtn").style.display = "none";
    document.getElementById("playBtn").style.display = "none";
    //showing buttons
    document.getElementById("hitBtn").style.display = "inline";
    document.getElementById("standBtn").style.display = "inline";
    document.getElementById("resetBtn").style.display = "inline";
    //adding cards
    addPlCard();
    playerScoreCal();
    addPlCard();
    playerScoreCal();
    addPcCard();
    pcScoreCal();
    //adding hidden card for dealer
    img3 = document.createElement("img");
    img3.setAttribute("src", "cards/cover.png");
    img3.setAttribute("class", "cardsImg");
    document.getElementById("pcCards").appendChild(img3);
}

// reset() function to restart the game on press of reset button
function reset() {
    location.reload();
}
// hit() function to add cards for player
function hit() {
    addPlCard();
    playerScoreCal();
    //show win if player gets joker and show lose if dealer gets joker 
    for (i = 0; i < 5; i++) {
        if (allPlCards[i] == "11S" || allPlCards[i] == "11H") {
            youWin();
        }
        else if (allPcCards[i] == "11S" || allPcCards[i] == "11H") {
            youLose();
        }
    }
    //if player draws 5 cards without reaching 21 show win otherwise show lose
    if (plCounter == 5) {
        if (playerScore < 21) {
            youWin();
        }
        else {
            youLose();
        }
    }
    //if score goes over 21 for player show lose 
    if (playerScore > 21) {
        youLose();
    }
    //show 777 jackpot by going into stand function as soon as seven counter reaches 3
    if (sevenCounter == 3) {
        stand();
    }
}

//stand() function to start adding cards into dealer's area
function stand() {
    document.getElementById("pcCards").removeChild(img3); //remove hidden card
    //show win if player gets joker and show lose if dealer gets joker 
    for (i = 0; i < 5; i++) {
        if (allPlCards[i] == "11S" || allPlCards[i] == "11H") {
            youWin();
        }
        else if (allPcCards[i] == "11S" || allPcCards[i] == "11H") {
            youLose();
        }
    }
    //dealer has to draw cards until score reaches 17
    while (pcScore <= 17) {
        addPcCard();
        pcScoreCal();
    }
    //show 777 jackpot as soon as seven counter reaches 3
    if (sevenCounter == 3) {
        document.getElementById("gameArea").style.display = "none";
        for (i = 0; i < allPlCards.length; i++) {
            var sssimg = document.createElement("img");
            sssimg.setAttribute("src", "cards/" + allPlCards[i] + ".png");
            sssimg.setAttribute("class", "cardsImg");
            document.getElementById("sssCards").appendChild(sssimg);
        }
        document.getElementById("777").className = "showSSS";
    }
    result(); //check result 
}

//resetScore() to set score to zero
function resetScore() {
    playerScore = 0;
    pcScore = 0;
}

//hideBtns() function to hide hit and stand buttons
function hideBtns() {
    document.getElementById("hitBtn").style.display = "none";
    document.getElementById("standBtn").style.display = "none";
}

//youWin() function to show winning message on screen
function youWin() {
    document.getElementById("result").innerHTML = "You Win!🥳";
    hideBtns();
}

//youLose() function to show losing message on screen
function youLose() {
    document.getElementById("result").innerHTML = "You lose😞";
    hideBtns();
}

//result() function to compare score and show result
function result() {
    //show win if player gets joker and show lose if dealer gets joker 
    for (i = 0; i < 5; i++) {
        if (allPlCards[i] == "11S" || allPlCards[i] == "11H") {
            youWin();
        }
        else if (allPcCards[i] == "11S" || allPcCards[i] == "11H") {
            youLose();
        }
    }
    if (playerScore > 21) {
        youLose(); //show lose if score is more than 21
    }
    else if (pcScore > 21) {
        youWin(); //show win if score is less than 21
    }
    else if (playerScore > pcScore) {
        youWin(); //show win if player's score is more than dealer's score
    }
    else if (playerScore == pcScore) {
        document.getElementById("result").innerHTML = "It's a tie!"; //if scores are same show tie
        hideBtns(); //hide buttons
    }
    else {
        //results on basis of score more than 21 or 5 cards drawn
        if (playerScore <= 21 && plCounter == 5) {
            youWin();
        }
        else if (pcScore <= 21 && pcCounter == 5) {
            youLose();
        }
        youLose(); //show lose
    }
}