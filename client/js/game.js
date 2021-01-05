let socket = io();
let imgs = [];
let rolls = [];
let numReady = 0;
let state;
let numPlayers;
let playerNumber;
let isYourTurn;
let winner;
let isReady = false;
new Button(175, 350, 150, 50, "roll", requestRoll, false);
new Button(175, 350, 150, 50, "ready", ready)

function setup() {
	createCanvas(500, 500)
	loadImgs();
	frameRate(10);
}

function draw() {
	background(255);
	buttons.forEach(b => { b.show(); });
	getState();
	switch (state) {
		case 'wait':
			rolls = [];
			buttons[1].enable();
			buttons[0].disable();
			getNumReady();
			getRollCount();
			text('Players ready: ' + numReady + "/2", 250, 250);
			break;
		case 'game':
			buttons[1].disable();
			fill(0);
			noStroke();
			if (isYourTurn != undefined && isYourTurn) {
				text("Your turn", 250, 100);
			} else {
				text("Oponnents turn", 250, 100);
			}
			if (rolls.length != 0) {
				image(imgs[rolls[0] - 1], 60, 150)
				image(imgs[rolls[1] - 1], 200, 150)
				image(imgs[rolls[2] - 1], 350, 150)
			}
			break;
		case 'winner':
			buttons[0].disable();
			buttons[1].setColor(255, 255, 255);
			image(imgs[rolls[0] - 1], 60, 150)
			image(imgs[rolls[1] - 1], 200, 150)
			image(imgs[rolls[2] - 1], 350, 150)
			noStroke();
			fill(0);
			if (winner != -1) {
				text("Player " + winner + " wins!", 250, 100);
			} else {
				text("Push!", 250, 100);
			}
			isReady = false;
			break;
	}
	if (keyIsDown(32)) { // space bar
		image(imgs[6], 150, 150)
	}
}

function getState() {
	socket.emit('getState');
}

function getRollCount() {
	socket.emit('getRollCount');
}

function yourTurn() {
	if (state != 'winner') {
		buttons[0].enable();
	}
	isYourTurn = true;
}

function opponentTurn() {
	buttons[0].disable();
	isYourTurn = false;
}

socket.emit('event', event => {
	console.log(event);
})

socket.on('winner', data => {
	winner = data;
});

socket.on('turn', data => {
	if (playerNumber == data) {
		yourTurn();
	} else {
		opponentTurn();
	}
});

socket.on('playerNumber', data => {
	playerNumber = data;
	console.log('you are player ' + playerNumber);
});

socket.on('state', data => {
	state = data;
});

socket.on('numReady', (data) => {
	numReady = data;
});

socket.on('roll', (data) => {
	console.log('got roll');
	rolls = data;

});

function getNumReady() {
	socket.emit('requestNumReady');
}

function ready() {
	if (!isReady) {
		isReady = true;
		socket.emit('ready');
		buttons[1].color = [0, 255, 0];
	}
}

function requestRoll() {
	socket.emit('requestRoll');
}