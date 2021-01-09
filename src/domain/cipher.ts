export interface Cipher {
  id: string
  name: string
  rows: Row[]
}

export interface Row {
  words: Word[]
}

export interface Word {
  characters: Character[]
}

export interface Character {
  char: string
  chordSymbol?: string
}
