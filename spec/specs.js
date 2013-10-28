describe("TicTacToe", function() {
  describe("Game", function() {
    describe("currentPlayer", function() {
      it("returns X when the turn number is odd", function() {
        var game = Object.create(Game);
        game.initialize();
        game.currentPlayer().should.equal("X");
      });

      it("returns O when the turn number is even", function() {
        var game = Object.create(Game);
        game.initialize();
        game.nextTurn();
        game.currentPlayer().should.equal("O");
      });
    });

    describe("nextTurn", function() {
      it("increments the turn number by 1", function() {
        var game = Object.create(Game);
        game.initialize();
        game.nextTurn();
        game.turnNumber.should.equal(2);
      });
    });

    describe("initialize", function() {
      it("creates an object table", function() {
        var game = Object.create(Game);
        game.initialize();
        game.table.should.exist;
      });

      it("initializes table", function() {
        var game = Object.create(Game);
        game.initialize();
        game.table.board.should.eql([["", "", ""], ["", "", ""], ["", "", ""]]);
      });

      it("sets turn number to 1", function() {
        var game = Object.create(Game);
        game.initialize();
        game.turnNumber.should.equal(1);
      });

      it("creates an object computer logic", function() {
        var game = Object.create(Game);
        game.initialize();
        game.computerLogic.should.exist;
      });

      it("initializes computer logic", function() {
        var game = Object.create(Game);
        game.initialize();
        game.computerLogic.positions.should.eql([0, 0, 0, 0, 0, 0, 0, 0]);
      });
    });

    describe("isCatsGame", function() {
      it("returns true if 9 turns have passed", function() {
        game = Object.create(Game);
        game.initialize();
        for (var i = 0; i < 9; i++) {
          game.nextTurn();
        }
        game.isCatsGame().should.be.true;
      });

      it("returns false if less than 9 turns have passed", function() {
        game = Object.create(Game);
        game.initialize();
        for (var i = 0; i < 4; i++) {
          game.nextTurn();
        }
        game.isCatsGame().should.be.false;
      });
    });

    describe("findWin", function() {
      it("returns the location of a horizontal win", function() {  
        game = Object.create(Game);
        game.initialize();
        game.table.playTurn(0, 0, "X");
        game.table.playTurn(0, 1, "X");
        game.table.playTurn(0, 2, "X");
        game.findWin().should.eql([[0, 0], [0, 1], [0, 2]]);
      });

      it("returns the location of a vertical win", function() {
        game = Object.create(Game);
        game.initialize();
        game.table.playTurn(0, 0, "X");
        game.table.playTurn(1, 0, "X");
        game.table.playTurn(2, 0, "X");
        game.findWin().should.eql([[0, 0], [1, 0], [2, 0]]);
      });

      it("returns the location of a diagonal left-top, right-bottom win", function() {
        game = Object.create(Game);
        game.initialize();
        game.nextTurn();
        game.table.playTurn(0, 0, "O");
        game.table.playTurn(1, 1, "O");
        game.table.playTurn(2, 2, "O");
        game.findWin().should.eql([[0, 0], [1, 1], [2, 2]]);
      });

      it("returns the location of a diagonal left-bottom, right-top win", function() {
        game = Object.create(Game);
        game.initialize();
        game.nextTurn();
        game.table.playTurn(2, 0, "O");
        game.table.playTurn(1, 1, "O");
        game.table.playTurn(0, 2, "O");
        game.findWin().should.eql([[2, 0], [1, 1], [0, 2]]);
      });
    });
  });

  describe("Table", function() {
    describe("initialize", function() {
      it("contains an array of three arrays, each of length three", function() {
        var table = Object.create(Table);
        table.initialize();
        table.board.should.eql([["", "", ""], ["", "", ""], ["", "", ""]]);
      });
    });

    describe("playTurn", function() {
      it("enters the player's symbol in the board if the space is available", function() {
        var table = Object.create(Table);
        table.initialize();
        table.playTurn(0, 2, "X");
        table.board[0][2].should.equal("X");
      });

      it("does not enter the player's symbol in the board if the space is already taken", function() {
        var table = Object.create(Table);
        table.initialize();
        table.playTurn(0, 2, "X");
        table.playTurn(0, 2, "O");
        table.board[0][2].should.equal("X");
      });

      it("returns true if the space is available", function() {
        var table = Object.create(Table);
        table.initialize();
        table.playTurn(0, 2, "X").should.be.true;
      });

      it("returns false if the space is already taken", function() {
        var table = Object.create(Table);
        table.initialize();
        table.playTurn(0, 0, "X");
        table.playTurn(0, 0, "O").should.be.false;
      });
    });

    describe("isEmpty", function() {
      it("returns true if spot contains empty string", function() {
        var table = Object.create(Table);
        table.initialize();
        table.isEmpty(0, 0).should.be.true;
      });

      it("returns false if the spot does not contain an empty string", function() {
        var table = Object.create(Table);
        table.initialize();
        table.playTurn(2, 2, "O");
        table.isEmpty(2, 2).should.be.false;
      });
    }); 
  });

  describe("ComputerLogic", function() {
    describe("initialize", function() {
      it("creates a positions array holding all zeroes", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.positions.should.eql([0, 0, 0, 0, 0, 0, 0, 0]);
      });

      it("creates a library of arrays indicating winning options", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.solutions["12"].should.eql([0, 1, 0, 0, 0, 1, 0, 0]);
      });
    });

    describe("joinMove", function() {
      it("joins a move to the positions array", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.joinMove([2, 0], false);
        computerLogic.positions.should.eql([0, 0, 1, 1, 0, 0, 0, 1]);
      });

      it("subtracts a move from the positions array", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.joinMove([0, 1], true);
        computerLogic.positions.should.eql([-1, 0, 0, 0, -1, 0, 0, 0])
      });

      it("removes the move from the solutions array", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.joinMove([0, 1], true);
        should.not.exist(computerLogic.solutions["01"]);
      });
    });

    describe("bestMove", function() {
      it("finds the winning move for two-in-a-row", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.joinMove([1, 0], true);
        computerLogic.joinMove([0, 0], true);
        computerLogic.bestMove().should.eql([2, 0]);
      });

      it("finds the blocking move for the opponent's two-in-a-row", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.joinMove([1, 0], false);
        computerLogic.joinMove([0, 0], false);
        computerLogic.bestMove().should.eql([2, 0]);
      });

      it("finds the move that changes the most ones if there are no imperative moves", function() {
        var computerLogic = Object.create(ComputerLogic);
        computerLogic.initialize();
        computerLogic.joinMove([0, 1], false);
        computerLogic.joinMove([1, 2], false);
        computerLogic.joinMove([2, 0], false);
        computerLogic.bestMove().should.eql([0, 2]);
      });
    });
  });
});












