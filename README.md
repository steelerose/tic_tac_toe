# Tic Tac Toe

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

>   ┌───┬───┬───┐<br>
    │ a │ b │ c │<br>
    ├───┼───┼───┤<br>
    │ d │ e │ f │<br>
    ├───┼───┼───┤<br>
    │ g │ h │ i │<br>
    └───┴───┴───┘

>  [a, b, c, d, e, f, g, h, i]

>  [abc, def, ghi, adg, beh, cfi, aei, gec]

>    a = [1,  0,  0,  1,  0,  0,  1,  0]<br>
     b = [1,  0,  0,  0,  1,  0,  0,  0]<br>
     c = [1,  0,  0,  0,  0,  1,  0,  1]<br>
     d = [0,  1,  0,  1,  0,  0,  0,  0]<br>
     e = [0,  1,  0,  0,  1,  0,  1,  1]<br>
     f = [0,  1,  0,  0,  0,  1,  0,  0]<br>
     g = [0,  0,  1,  1,  0,  0,  0,  1]<br>
     h = [0,  0,  1,  0,  1,  0,  0,  0]<br>
     i = [0,  0,  1,  0,  0,  1,  1,  0]

> game = [0,  1,  0,  1,  1, -1,  0,  2]

>  if board has -2, select option for -3

>  if board has 2, select option for 1

>  else, select option that changes the most (1 / -1)s
