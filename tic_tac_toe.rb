class Board

  attr_accessor :board, :winner

  def initialize
    @board = [
    ['-','-','-'],
    ['-','-','-'],
    ['-','-','-']
    ]
    @winner
#   board setup:
#   [[0][0]] , [[0],[1]] , [[0][2]]
#   [[1][0]] , [[1],[1]] , [[1][2]]
#   [[2][0]] , [[2],[1]] , [[2][2]]

  end

  def won?
    #[@board[0][0], @board[0][1], @board[0][2]].uniq.count == 1 && (@board[0][0] != '-')

    (0..2).each do |row|
      if @board[row].uniq.count == 1 && @board[row][0] != '-'
        @winner = @board[row][0]
        return true
      end
      if [@board[0][row], @board[1][row], @board[2][row]].uniq.count == 1 && @board[0][row] != '-'
        @winner = @board[0][row]
        return true
      end
    end

    if [@board[0][0], @board[1][1], @board[2][2]].uniq.count == 1 && @board[0][0] != '-' || [@board[0][2], @board[1][1], @board[2][0]].uniq.count == 1 && @board[0][2] != '-'
      @winner = @board[0][0]
      return true
    end


    false
  end


  def empty?(pos)
    # ie. pos upper left corner is [0,0]
    @board[pos.first][pos.last] == '-'
  end

  def place_mark(pos, mark)
      @board[pos.first][pos.last] = mark
  end

  def display_board
    print @board[0]
    puts
    print @board[1]
    puts
    print @board[2]
    puts
    puts
  end

end

class Game

  attr_accessor :player1, :player2, :board

  def initialize(player1, player2)
    @player1 = player1
    @player2 = player2
    @board = Board.new
  end


  def play

    while !@board.won?
      puts "Player 1, what is your move?"
      move = @player1.move

      while !valid?(move)
        puts "Not a valid move, please choose again!"
        move = @player1.move
      end

      @board.place_mark(move, @player1.mark)
      @board.display_board
      if @board.won?
        break
      else
        puts "Player 2, what is your move?"
        move = @player2.move

        while !valid?(move)
          puts "Not a valid move, please choose again!"
          move = @player2.move
        end

        @board.place_mark(move, @player2.mark)
        @board.display_board
      end

    end
  end

  def valid?(move)
    (move.first < 3 && move.first >= 0) && (move.last < 3 && move.last >= 0) && @board.empty?(move)
  end



end

class Player

  attr_accessor :mark, :move

  def initialize

  end

  def move
    [gets.chomp.to_i, gets.chomp.to_i]
  end

end

class HumanPlayer < Player

  def initialize
    @mark = "O"
  end


end

class ComputerPlayer < Player

  def initialize
    @mark = "X"
  end

  def move
    [rand(3), rand(3)]
  end

end

hp = HumanPlayer.new
cp = ComputerPlayer.new

game = Game.new(hp, cp)

game.play
print "#{game.board.winner} is the winner!"

