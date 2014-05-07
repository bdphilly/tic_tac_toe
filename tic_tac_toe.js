function Board () {
	this.grid = [[],[],[]];
	for (var i = 0; i < 3; i++){
		for (var j = 0; j < 3; j++){
			this.grid[i].push(null);
		}
	}
}

function Player(mark) {
	this.mark = mark;
}

// Board.prototype.makeTurn = function(callback) {
// 	var that = this;
// 	READER.question("What is your move?", function(response){
// 		var x = parseInt(response[0]);
// 		var y = parseInt(response[response.length - 1]);
//
// 		console.log([x,y])
//
// 		if that.validMove([x, y]) {
// 			that.placeMark([x, y], that.mark);
// 		}
// 		callback();
// 	});
// }


Board.prototype.isWin = function(mark)  {
	//rows

	for (var i = 0; i < 3; i++){
		// rows
		if (this.compareThree([this.grid[i][0],
			  this.grid[i][1], this.grid[i][2]]) &&
			 (this.grid[i][0] === mark)) {
			return true;
		}

		// cols
		if (this.compareThree([this.grid[0][i],
			  this.grid[1][i], this.grid[2][i]]) &&
			 (this.grid[0][i] === mark)) {
			return true;
		}
	}
	// diags
	if  (this.compareThree([this.grid[0][0],
		   this.grid[1][1], this.grid[2][2]]) ||
		  (this.compareThree([this.grid[0][2],
			 this.grid[1][1], this.grid[2][0]])) &&
		  (this.grid[1][1] === mark)) {
		return true;
	}

	return false;
}

Board.prototype.compareThree = function(positions) {
		return (positions[0] === positions[1] && positions[1] === positions[2])
}

Board.prototype.placeMark = function(pos, mark) {
	var x = pos[0];
	var y = pos[1];
	this.grid[x][y] = mark;
}

Board.prototype.validMove = function(pos) {
	var x = pos[0];
	var y = pos[1];
	return ( (this.grid[x] !== undefined) &&
					 (this.grid[x][y] !== undefined) &&
					 (this.grid[x][y] === null) );
}

Board.prototype.display = function() {
	console.log(this.grid[0]);
	console.log(this.grid[1]);
	console.log(this.grid[2]);
}


// b = new Board();
// player1 = new Player("X");
// player2 = new Player("O");
//
// b = new Board();
// player1 = new Player("X");
// player2 = new Player("O");

Player.prototype.takeTurn = function(board, callback) {
	// var board = b;
	var that = this;
	READER.question("What is your move?", function(response){
		var x = parseInt(response[0]);
		var y = parseInt(response[response.length - 1]);

		console.log([x,y]);

		if (board.validMove([x, y])) {
			board.placeMark([x, y], that.mark);
		} else {
			console.log("Invalid move. Please move again!");
			that.takeTurn(board, callback);
		}
		callback();
	});
}

Game.prototype.run = function() {
	var that = this;

	if (that.currentPlayer === that.players[0]) {
		that.currentPlayer = that.players[1];
	} else {
		that.currentPlayer = that.players[0];
	}

	// var currentPlayer = that.players[0];
	that.board.display();
	that.currentPlayer.takeTurn(that.board, function () {

		if (that.board.isWin(that.currentPlayer.mark)) {
			that.board.display();
			console.log("Winner!")
			READER.close();
		} else {
			that.run();
		}
	});

}

function Game() {
	this.board = new Board();
	this.players = [new Player("X"), new Player("O")];
	this.currentPlayer = this.players[1];

	var readline = require('readline');
	READER = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});


}

g = new Game();
g.run();


