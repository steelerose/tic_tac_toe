var Game = {
  currentPlayer: function() {
    return (this.turnNumber % 2 === 1) ? "X" : "O";
  },

  nextTurn: function() {
    this.turnNumber++;
  },

  initialize: function() {
    this.turnNumber = 1;
    this.table = Object.create(Table);
    this.table.initialize();
    this.computerLogic = Object.create(ComputerLogic);
    this.computerLogic.initialize();
  },

  isCatsGame: function() {
    return (this.turnNumber > 8) ? true : false;
  },

  findWin: function() {
    var player = this.currentPlayer();
    var win = false;

    for (var index = 0; index < 3; index++) {
      if (this.table.board[index][0] === player && this.table.board[index][1] === player && this.table.board[index][2] === player) {
        win = [[index, 0], [index, 1], [index, 2]];
      } else if (this.table.board[0][index] === player && this.table.board[1][index] === player && this.table.board[2][index] === player) {
        win = [[0, index], [1, index], [2, index]];
      } else if (this.table.board[0][0] === player && this.table.board[1][1] === player && this.table.board[2][2] === player) {
        win = [[0, 0], [1, 1], [2, 2]];
      } else if (this.table.board[2][0] === player && this.table.board[1][1] === player && this.table.board[0][2] === player) {
        win = [[2, 0], [1, 1], [0, 2]];
      }
    }

    return win;
  }
};

var Table = {
  initialize: function() {
    this.board = [["", "", ""], ["", "", ""], ["", "", ""]];
  },

  playTurn: function(row, column, player) {
    if (this.isEmpty(row, column)) {
      this.board[row][column] = player;
      return true;
    } else {
      return false;
    }
  },

  isEmpty: function(row, column) {
    return (this.board[row][column] === "") ? true : false;
  }
};

var ComputerLogic = {
  initialize: function() {
    this.positions = [0, 0, 0, 0, 0, 0, 0, 0];
    this.solutions = {
      "00": [1, 0, 0, 1, 0, 0, 1, 0],
      "01": [1, 0, 0, 0, 1, 0, 0, 0],
      "02": [1, 0, 0, 0, 0, 1, 0, 1],
      "10": [0, 1, 0, 1, 0, 0, 0, 0],
      "11": [0, 1, 0, 0, 1, 0, 1, 1],
      "12": [0, 1, 0, 0, 0, 1, 0, 0],
      "20": [0, 0, 1, 1, 0, 0, 0, 1],
      "21": [0, 0, 1, 0, 1, 0, 0, 0],
      "22": [0, 0, 1, 0, 0, 1, 1, 0]};
  },

  joinMove: function(coordinates, isComputer) {
    var solution = this.solutions[coordinates.join("")];
    for (var i = 0; i < 8; i++) {
      (isComputer) ? (this.positions[i] -= solution[i]) : (this.positions[i] += solution[i]);
    }
    delete this.solutions[coordinates.join("")];
  },

  bestMove: function() {
    var thisLogic = this;
    var best;
    if ($.inArray(-2, this.positions) !== -1) {
      var index = $.inArray(-2, this.positions);
      $.each(this.solutions, function(solutionKey) {
        if (thisLogic.solutions[solutionKey][index] === 1) {
          best = [parseInt(solutionKey.slice(0, 1)), parseInt(solutionKey.slice(1))];
        }
      });
    } else if ($.inArray(2, this.positions) !== -1) {
      var index = $.inArray(2, this.positions);
      $.each(this.solutions, function(solutionKey) {
        if (thisLogic.solutions[solutionKey][index] === 1) {
          best = [parseInt(solutionKey.slice(0, 1)), parseInt(solutionKey.slice(1))];
        }
      });
    } else {
      var newNumberOfOnes;
      var bestNumberOfOnes = 9;
      var newPositions = [];
      var bestPositions = [];
      var bestSolutionKey;
      $.each(this.solutions, function(solutionKey) {
        newNumberOfOnes = 0;
        for (var i = 0; i < 8; i++) {
          newPositions[i] = thisLogic.solutions[solutionKey][i] + thisLogic.positions[i];
          if (newPositions[i] === 1 || newPositions[i] === -1) { newNumberOfOnes++; }
        }
        if (newNumberOfOnes < bestNumberOfOnes) {
          bestNumberOfOnes = newNumberOfOnes;
          bestPositions = newPositions.slice();
          bestSolutionKey = solutionKey;
          best = [parseInt(bestSolutionKey.slice(0, 1)), parseInt(bestSolutionKey.slice(1))];
        }
      });
    }
    return best;
  }
};

$(function() {
  var game = Object.create(Game);
  game.initialize();
  var row, column, player, winner = false, catsGame = false;
  // $("#modalPlayers").modal("show");
  $(".player").append("<h2>" + game.currentPlayer() + "'s turn</h2>");

  function playTurn() {
    winner = game.findWin();
    catsGame = game.isCatsGame();
    player = game.currentPlayer();
    if (winner) {
        $("div.modal-body").empty().append("<h2>" + player + " wins!</h2>");
        $("#modalResults").modal("show");
        winner.forEach(function(coordinate) {
          $("tr[value*=" + coordinate[0] + "]").children("td[value*=" + coordinate[1] + "]").addClass("win");
        });
      } else if (catsGame) {
        $("div.modal-body").empty().append("<h2>Cat's game!</h2>");
        $("#modalResults").modal("show");
      } else {
        game.nextTurn();
        $(".player").empty().append("<h2>" + game.currentPlayer() + "'s turn</h2>");
      }
  };

  $("td").click(function() {
    row = $(this).parent().attr("value");
    column = $(this).attr("value");
    player = game.currentPlayer();

    if (game.table.playTurn(row, column, player)) {
      $(this).append(player);
      playTurn();
      
      if (!winner && !catsGame) {
        // computer turn
        game.computerLogic.joinMove([row, column], false);
        var computerMove = game.computerLogic.bestMove();
        $("tr[value*=" + computerMove[0] + "]").children("td[value*=" + computerMove[1] + "]").append(game.currentPlayer());
        game.computerLogic.joinMove(computerMove, true);
        game.table.playTurn(computerMove[0], computerMove[1], game.currentPlayer());
        
        playTurn();
      }
    }
  });

  $(".new-game").click(function() {
    $("td").empty().removeClass("win");
    winner = false;
    catsGame = false;
    game.initialize();
    $(".player").empty().append("<h2>" + game.currentPlayer() + "'s turn</h2>");
  })
});

// FIX: find if player wins in 2+ directions at once
// FIX: fadeToggle or other slow method of adding computer's move
// FIX: computer selects random best move
// FIX: computer doesn't always play second
// FIX: user can play against human OR computer



/*
-------------
| a | b | c |
|-----------|
| d | e | f |
|-----------|
| g | h | i |
-------------


[a, b, c, d, e, f, g, h, i]

[abc, def, ghi, adg, beh, cfi, aei, gec]

   a = [1,  0,  0,  1,  0,  0,  1,  0]
   b = [1,  0,  0,  0,  1,  0,  0,  0]
   c = [1,  0,  0,  0,  0,  1,  0,  1]
   d = [0,  1,  0,  1,  0,  0,  0,  0]
   e = [0,  1,  0,  0,  1,  0,  1,  1]
   f = [0,  1,  0,  0,  0,  1,  0,  0]
   g = [0,  0,  1,  1,  0,  0,  0,  1]
   h = [0,  0,  1,  0,  1,  0,  0,  0]
   i = [0,  0,  1,  0,  0,  1,  1,  0]

game = [0,  1,  0,  1,  1, -1,  0,  2]


if board has -2, select option for -3

if board has 2, select option for 1

else, select option that changes the most (1 / -1)s

*/