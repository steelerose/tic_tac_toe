Tic Tac Toe
===========

Play Tic Tac Toe against an intelligent computer opponent

-----------

FIX
- find if player wins in 2+ directions at once
- fadeToggle or other slow method of adding computer's move
- computer selects random best move
- computer doesn't always play second
- user can play against human OR computer


AI LOGIC:

Source: http://www.omnimaga.org/index.php?topic=13070.0

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