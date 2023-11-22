
describe('Checkers tests', () => {

  let startBlueCount = 12;
  beforeEach(() => {
    cy.visit('https://www.gamesforthebrain.com/game/checkers/')
  })

  it('checks title', () => {
    cy.get('title').should('contain', "Checkers - Games for the Brain");
  });

  it('Makes 5 moves', () => {
    makeMove("22", "33", true);
    makeMove("31", "22", false);
    makeMove("20", "31", false);
    makeMove("33", "55", false);
    makeMove("02", "13", false);
    cy.get('img[src="me1.gif"]').should('have.length.lessThan', startBlueCount);
    cy.get('.footnote a').first().click();
    cy.get('p#message').should('contain', "Select an orange piece to move");
  })

  function makeMove(start, finish, skip) {
    if (!skip) {
      let msg = cy.get('p#message');
      if (msg != "Make a move.") {
        cy.wait(2000);
      }
      cy.get('p#message').should('contain', "Make a move.");
    }
    const startLocator = "img[name=space" + start + "]";
    const finishLocator = "img[name=space" + finish + "]";
    cy.get(startLocator).click();
    cy.get(finishLocator).click();
  }
})