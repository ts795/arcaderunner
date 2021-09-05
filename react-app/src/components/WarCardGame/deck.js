import './war.css'

const SUITS = ["♠", "♣", "♥", "♦"]
const VALUES = [
  "A",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K"
]

class Deck {
  constructor(cards = freshDeck()) {
    this.cards = cards
    console.log(this.cards)
  }

  get numberOfCards() {
    return this.cards.length
  }

  getTopCard() {
    return this.cards.shift()
  }

  insertIntoBottom(card) {
    this.cards.push(card)
  }

  shuffle() {
    for (let i = this.numberOfCards - 1; i > 0; i--) {
      const newIndex = Math.floor(Math.random() * (i + 1))
      const oldValue = this.cards[newIndex]
      this.cards[newIndex] = this.cards[i]
      this.cards[i] = oldValue
    }
  }
}

class Card {
  constructor(suit, value) {
    this.suit = suit
    this.value = value
  }

  get color() {
    return this.suit === "♣" || this.suit === "♠" ? "black" : "red"
  }

  getHTML() {
    const cardDiv = document.createElement("div")
    cardDiv.innerText = this.suit
    cardDiv.classList.add("card", this.color)
    cardDiv.dataset.value = `${this.value} ${this.suit}`
    return cardDiv
  }
}

// function freshDeck() {
//   return SUITS.flatMap(suit => {
//     return VALUES.map(value => {
//       return new Card(suit, value)
//     })
//   })
// }

function shuffleDeck(deckOfCards) {
    for (let i = deckOfCards.length - 1; i > 0; i--) {
        const newIndex = Math.floor(Math.random() * (i + 1))
        const oldValue = deckOfCards[newIndex]
        deckOfCards[newIndex] = deckOfCards[i]
        deckOfCards[i] = oldValue
    }
}

function freshDeck() {
    return SUITS.flatMap(suit => {
        return VALUES.map(value => {
            return { 
                suit: suit, 
                value:value 
            }
        })
    })
}

function getTopCard(deck) {
    return {
        card: deck[0],
        deck: [...deck.splice(1)]
    }
}

function insertCard(deck, card) {
    return [...deck, card]
}

export { getTopCard, insertCard, freshDeck, shuffleDeck }
