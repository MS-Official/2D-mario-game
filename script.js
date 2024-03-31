/*----------------------------------keyCheck------------------------------------------*/
function keyCheck(event) {
    var keyCode = event.which;

    if (keyCode == 13) { //enterKeyOptions
        if (gameIn == 1) {
            if (jumpAnimationId == 0) {
                backgroundMusic.play();
                runAnimationId = setInterval(boyRun, 80);
                runSoundClip.play();
                moveBackgroundAnimationId = setInterval(moveBackground, 20);
                scoreAnimationId = setInterval(updateScore, 100);
                boxAnimationId = setInterval(moveBoxes, 6);
                clearInterval(idleAnimationId);
            }
        }
    }

    if (keyCode == 32) { //spaceKeyOptions
        if (gameIn == 1) {
            if (jumpAnimationId == 0) {
                backgroundMusic.play();
                clearInterval(runAnimationId);
                runSoundClip.pause();
                jumpAnimationId = setInterval(boyJump, 90);
                jumpSoundClip.play();
                clearInterval(idleAnimationId);
            }
        }
    }

    if (keyCode == 82) { //key R
        reload();
    }
}

/*--------------------------------------run Animations & images-------------------------------------*/

var runImageNumber = 1;
var runAnimationId = 0;
var runSoundClip = new Audio("resources/");
runSoundClip.loop = true;

function boyRun() {
    runImageNumber = runImageNumber +1;

    if (runImageNumber == 9) {
        runImageNumber = 1;
    }

    document.getElementById("boy").src = "resources/ (" + runImageNumber + ").png";
}

/*-----------------------------------idle Animations & images---------------------------------------*/

var idleImageNumber = 1;
var idleAnimationId = 0;

function boyIdle() {
    idleImageNumber = idleImageNumber + 1;

    if (idleImageNumber == 11) {
        idleImageNumber = 1;
    }

    document.getElementById("boy").src = "resources/ (" + idleImageNumber + ").png";
}

function boyIdleStart() {
    idleAnimationId = setInterval(boyIdle, 80);
}

/*-----------------------------------------Background------------------------------------------------*/

var moveBackgroundAnimationId = 0;
var background = 0;
var backgroundMusic = new Audio("resources/");
backgroundMusic.loop = true;

function moveBackground() {
    background = background - 5;

    document.getElementById("backgroundBox").style.backgroundPositionX = background + "px";
}

/*---------------------------------------jumpAnimations & images--------------------------------------*/

var jumpImageNumber = 1;
var jumpAnimationId = 0;
var jumpSoundClip = new Audio("resources/");

var boyMarginTop = 344;

function boyJump() {

    if (jumpImageNumber <= 6) {
        boyMarginTop = boyMarginTop - 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    if (jumpImageNumber >= 7) {
        boyMarginTop = boyMarginTop + 20;
        document.getElementById("boy").style.marginTop = boyMarginTop + "px";
    }

    jumpImageNumber = jumpImageNumber + 1;

    if (jumpImageNumber == 13) {
        jumpImageNumber = 1;
        clearInterval(jumpAnimationId);
        jumpAnimationId = 0;
        runAnimationId = setInterval(boyRun, 80);
        runSoundClip.currentTime = 0;
        runSoundClip.play();

        if (moveBackgroundAnimationId == 0) {
            moveBackgroundAnimationId = setInterval(moveBackground, 20);
        }
        if (scoreAnimationId == 0) {
            scoreAnimationId = setInterval(updateScore, 100);
        }
        if (boxAnimationId == 0) {
            boxAnimationId = setInterval(moveBoxes, 6);
        }
    }

    document.getElementById("boy").src = "resources/ (" + jumpImageNumber + ").png";
}

/*------------------------------------dead Animations & images----------------------------------*/

var deadAnimationId = 0;
var deadImageNumber = 0;
var deadSoundClip = new Audio("resources/");

function boyDead() {
    deadImageNumber = deadImageNumber + 1;

    if (deadImageNumber == 11) {
        deadImageNumber = 10;
        document.getElementById("boy").style.marginTop = "350px";
        document.getElementById("endScore").innerHTML = "Your Score: &nbsp" + score;
        document.getElementById("endGame");style.visibility = "visible";
    }

    document.getElementById("boy").src = "resources/ (" + deadImageNumber + ").png";
}

/*----------------------------------------scoreBoard-----------------------------------------*/

var scoreAnimationId = 0;
var score = 0;

function updateScore() {
    score = score + 1;
    document.getElementById("score").innerHTML = score;
}

/*-----------------------------------------createBoxes and moveBoxes---------------------------*/

var boxMarginLeft = 0;

function createBoxes(){
    for(var i = 0; i < 20; i++){
        var box = document.createElement("div");
        box.className = "box";
        box.id = "box" + i;

        if (i <= 5) {
            boxMarginLeft = boxMarginLeft + 2200;
        }
        if (i >= 6 && i <= 10) {
            boxMarginLeft = boxMarginLeft + 1600;
        }
        if (i >= 11 && i <= 15) {
            boxMarginLeft = boxMarginLeft + 1200;
        }
        if (i >= 16 && i <= 20) {
            boxMarginLeft = boxMarginLeft + 800;
        }

        box.style.marginLeft = boxMarginLeft + "px";
        document.getElementById("backgroundBox").appendChild(box);
    }
}

var boxAnimationId = 0;

function moveBoxes() {

    for(var i = 0; i < 20; i++){
        var box = document.getElementById("box" + i);
        var currentMarginLeft = getComputedStyle(box).marginLeft;
        var newMarginLeft = parseInt(currentMarginLeft) - 4;
        box.style.marginLeft = newMarginLeft + "px";

        if (newMarginLeft <= 170 & newMarginLeft >= 40) {
            if (boyMarginTop > 270) {
                deadAnimationId = setInterval(boyDead, 100);
                deadSoundClip.play();

                clearInterval(runAnimationId);
                runSoundClip.pause();
                runImageNumber = -1;

                clearInterval(jumpAnimationId);
                jumpSoundClip.pause();
                jumpImageNumber = -1;

                clearInterval(moveBackgroundAnimationId);
                moveBackgroundAnimationId = -1;
                backgroundMusic.pause();

                clearInterval(scoreAnimationId);
                scoreAnimationId = -1;

                clearInterval(boxAnimationId);
                boxAnimationId = -1;

            }
        }

        if (newMarginLeft == 1132) {
            document.getElementById("canon").style.marginLeft = "1130px";
        }
        if (newMarginLeft == 1112) {
            document.getElementById("canon").style.marginLeft = "1115px";
            canonSound.play();
        }
    }

    var lastBox = document.getElementById("box19").style.marginLeft;
    if (lastBox == "-400px") {
        document.getElementById("win").className = "win";
        winSoundClip.play();

        clearInterval(runAnimationId);
        runSoundClip.pause();
        runImageNumber = -1;

        clearInterval(jumpAnimationId);
        jumpSoundClip.pause();
        jumpImageNumber = -1;

        clearInterval(moveBackgroundAnimationId);
        moveBackgroundAnimationId = -1;
        backgroundMusic.pause();

        clearInterval(scoreAnimationId);
        scoreAnimationId = -1;

        clearInterval(boxAnimationId);
        boxAnimationId = -1;

    }
}

var winSoundClip = new Audio("resources/");
var canonSound = new Audio("resources/");

/*---------------------------------------Reload----------------------------------------*/

function reload() {
    location.reload();
}
 var gameIn = 0;

 function gameStart(){
    gameIn = 1;
    document.getElementById("startGame").style.visibility = "hidden";
 }

 /*--------------------------------------musicControl--------------------------------------*/

 var musicVolume = false;

 function audioVolume() {

    if (musicVolume == false) {
        document.getElementById("audio").className = "audioUn";
        backgroundMusic.volume = 0;
        runSoundClip.volume = 0;
        jumpSoundClip.volume = 0;
        deadSoundClip.volume = 0;
        canonSound.volume = 0;
    }

    if (musicVolume == true) {
        document.getElementById("audio").className = "audio";
        backgroundMusic.volume = 1;
        runSoundClip.volume = 1;
        jumpSoundClip.volume = 1;
        deadSoundClip.volume = 1;
        canonSound.volume = 1;
    }

    if (musicVolume == false) {
        musicVolume = true;
    } else {
        musicVolume = false;
    }
 }