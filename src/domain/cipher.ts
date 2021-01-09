export interface Cipher {
  id: string
  name: string
  rows: Row[]
}

export interface Row {
  words: Word[]
}

export interface Word {
  characters: Array<SimpleCharacter | CharacterWithChord>
}

export interface SimpleCharacter {
  char: string
}
export interface CharacterWithChord extends SimpleCharacter {
  chordId: string
}
