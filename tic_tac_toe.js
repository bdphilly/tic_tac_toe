Board.prototype.isWin = function(mark)  {
  for (var i = 0; i < 3; i++) {
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
  if ((this.compareThree([this.grid[0][0],
      this.grid[1][1], this.grid[2][2]]) ||
     (this.compareThree([this.grid[0][2],
      this.grid[1][1], this.grid[2][0]]))) &&
     (this.grid[1][1] === mark)) {
    console.log(this.grid[1][1] === mark);
    return true;
  }
  return false;
}

Board.prototype.compareThree = function(positions) {
  return (positions[0] === positions[1] && positions[1] === 
          positions[2] && positions[0] != null)
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

Player.prototype.takeTurn = function(board, callback) {
  var that = this;

  board.display();
  console.log();
  console.log("Player: " + that.mark);
  READER.question("What is your move?", function(response) {
    var x = parseInt(response[0]);
    var y = parseInt(response[response.length - 1]);

    if (board.validMove([x, y])) {
      board.placeMark([x, y], that.mark);
      board.switchPlayers(that);
    } else {
      console.log("Invalid move. Please move again!");
      that.takeTurn(board, callback);
    }
    callback();
  });
}

Board.prototype.switchPlayers = function(player) {
  if (player.mark === "X") {
    player.mark = "O";
  } else {
    player.mark = "X";
  }
}

Game.prototype.run = function() {
  var that = this;

  // that.board.display();
  that.currentPlayer.takeTurn(that.board, function () {
    if (that.board.isWin(that.currentPlayer.oppositeMark())) {
      that.board.display();
      console.log("Winner!");
      READER.close();
    } else {
      that.run();
    }
  });
}

Player.prototype.oppositeMark = function() {
  //we need to check the opposite mark in
  //the run method, because we automatically switch players
  //after a valid move
  if (this.mark === "X") {
    return "O";
  } else {
    return "X";
  }
}

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

function Game() {
  this.board = new Board();
  this.currentPlayer = new Player("X");

  var readline = require('readline');
  READER = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
}

g = new Game();
g.run();