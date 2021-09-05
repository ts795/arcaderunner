
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

let deck = freshDeck()
// console.log(deck)
shuffleDeck(deck)
console.log("SHUFFLED DECK:", deck)
// console.log("TOP CARD:", getTopCard(deck) )
console.log(insertCard(deck, { suit: '♣', value: '10' }))
