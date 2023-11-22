# gameTests


To run tests:
$ yarn install
$ yarn run cypress open

use cypress GUI to run:
- e2e/blackjack.cy.js
- e2e/checkers.cy.js

1. Checkers
    - How could the directions be more clear?
    For step 2, "confirm that the site is up", we should specify which site. Is it the base site, or /checkers? Also how
    do we consider the site as up? Do we expect a certain response code, or element to be available? Lastly, the directions assume knowlege of how checkers is played, and what constitutes a legal move. These could be better defined in the requirements.
    - How could the architecture be more automation friendly?
    important elements like the checkers img's chould have 'data-cell-number' attribute to assist with location.

2. Blackjack
    - How could the directions be more clear?
    The directions assume some knowlege of blackjack, and that blackjack is specifically 21. Additionally how to handle Ace cards could also be defined more clearly. 
