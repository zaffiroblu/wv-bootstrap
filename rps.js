// Here are some vars to keep track of the points for the human and for the computer.
let humPoints = 0;
let comPoints = 0;

// This defines the available choices for both players.
const gameArray = ['rock', 'paper', 'scissors'];

//Alright, now it's time for a fancy UI!
// First I need to grab the buttons and the container from the HTML and save them as variables in JS:
const rockBtn = document.getElementById('rocky');
const paperBtn = document.getElementById('papery');
const scissorsBtn = document.getElementById('scissory');
const body = document.querySelector('body');
const feedbackContainer = document.getElementById('feedback-row');
const humMoveImg = document.getElementById('hum-move-img');
const feedbackPara = document.getElementById('feedback-para');
const comMoveImg = document.getElementById('com-move-img');
const feedbackScore = document.getElementById('feedback-score');
const gameEndRow = document.getElementById('game-end-row');
const gameEndImg = document.getElementById('game-end-img');
const gameEndPara = document.getElementById('game-end-para');

//And define humIndex.
let humIndex;

// This will generate a random computer choice once called in one of the click events below
//(This produced a number value of 0, 1 or 2, which corresponds to the length of the gameArray.)
function comResult() {
	let randNum = Math.floor(Math.random() * gameArray.length);
	return randNum;
}

//These are the event listeners for my buttons:
rockBtn.addEventListener('click', () => {
	humIndex = gameArray.indexOf('rock');
	humMoveImg.src = 'images/fist.png';
	playRound();
});

paperBtn.addEventListener('click', () => {
	humIndex = gameArray.indexOf('paper');
	humMoveImg.src = 'images/open-hands.png';
	playRound();
});

scissorsBtn.addEventListener('click', () => {
	humIndex = gameArray.indexOf('scissors');
	humMoveImg.src = 'images/scissors-hand.png';
	playRound();
});

// -------------------------- Below is where the real action starts.

function playRound() {
	feedbackContainer.classList.remove('d-none');

	//Here I define a variable for and call the comResult from above.
	const comIndex = comResult();

	switch (comIndex) {
		case 0:
			comMoveImg.src = 'images/fist.png';
			break;
		case 1:
			comMoveImg.src = 'images/open-hands.png';
			break;
		case 2:
			comMoveImg.src = 'images/scissors-hand.png';
			break;
	}

	//Here I generate and display info about the moves of each player.
	feedbackPara.textContent = `You've gone with ${gameArray[humIndex]}. I've chosen ${gameArray[comIndex]}.`;

	// This is a switch function that returns who won the round.

	let outcome = humIndex - comIndex;

	switch (outcome) {
		case 0:
			feedbackScore.textContent = `This round it a draw. The score is ${humPoints} to ${comPoints}.`;
			gameEndPara.textContent = "Let's give it another go.";
			break;
		case -2:
		case 1:
			humPoints += 1;
			feedbackScore.textContent = `You win this round! The score is ${humPoints} to ${comPoints}.`;
			gameEndPara.textContent = "Let's keep going!";
			break;
		case -1:
		case 2:
			comPoints += 1;
			feedbackScore.textContent = `I win this round! The score is ${humPoints} to ${comPoints}.`;
			gameEndPara.textContent = "Don't give up yet!";
			break;
		default:
			console.log(
				"You're wasting my computing power. PLEASE choose either rock, paper, or scissors now."
			);
	}

	if (humPoints >= 3 || comPoints >= 3) {
		// This calls the "endofGame" function.
		endOfGame();
	}
}

function endOfGame() {
	rockBtn.classList.add('disabled');
	paperBtn.classList.add('disabled');
	scissorsBtn.classList.add('disabled');
	gameEndRow.classList.remove('d-none');
	if (humPoints == 3) {
		gameEndImg.src = 'images/trophy.png';
		gameEndPara.textContent =
			"Yes indeed, you've gotten to 3 points before I could. You win the game! Congrats.";
		gameEndRow.style.backgroundColor = '#53FFDA';
	} else if (comPoints == 3) {
		gameEndImg.src = 'images/loser.png';
		gameEndPara.textContent =
			"Well well well, it seems I've gotten to 3 points before you. You lose the game! So sorry about that.";
		gameEndRow.style.backgroundColor = '#FF8453';
	}
}
