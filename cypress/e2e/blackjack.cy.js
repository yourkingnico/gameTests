describe('blackjack tests', () => {

  it('checks title', () => {
    cy.visit('https://deckofcardsapi.com/');
    cy.get('title').should('contain', "Deck of Cards API");
  });

  it("shuffles and deals to two players", () => {
    cy.request("GET", "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1").then((response) => {
      verifyCleanDeck(response);
      const deckId = response.body.deck_id;
      const deckUrl = "https://deckofcardsapi.com/api/deck/" + deckId;
      cy.request("GET", deckUrl + "/shuffle/").then((response) => {
        verifyCleanDeck(response, deckId);
        dealThree(deckId, "player 1");
        dealThree(deckId, "player 2");
      });
    });
  });

  function dealThree(deckId, player) {
    const url = "https://deckofcardsapi.com/api/deck/" + deckId + "/draw/?count=3";
    cy.request("GET", url).then((response) => {
      let score = 0;
      let aces = 0;
      expect(response.status).to.eq(200);
      expect(response.body.success).to.eq(true)
      expect(response.body.cards).to.be.an('array');
      response.body.cards.map(card => {
        let num = card.value;
        console.log(num)
        let thisCard = getCardValue(card.value);
        score += thisCard;
        if (thisCard == 11) {
          aces++;
        }
      })
      if (score > 21 && aces > 0) {
          // if player has busted, treat each Ace as 1 instead of 11
          // This is an assumption, but requirements should be updated 
        for(let i = 0; i < aces; i++){
          score -= 10;
          if(score <= 21){
            i=aces;// end loop if score is valid
          }
        }
      }
      console.log(player + " Score is " + score);
      if (score == 21) {
        console.log(player + " has Blackjack!");
      }
    });
  };

  function getCardValue(value) {
    if (isNaN(value)) {
      switch (value) {
        case "JACK":
        case "QUEEN":
        case "KING":
          return 10;
        case "ACE":
          return 11;
        default:
          break;
      }
    }
    return Number(value);
  };

  function verifyCleanDeck(response, deckId = null) {
    expect(response.status).to.eq(200);
    expect(response.body.success).to.eq(true)
    expect(response.body.shuffled).to.eq(true);
    if (deckId) {
      expect(response.body.deck_id).to.eq(deckId);
    }
  };
})