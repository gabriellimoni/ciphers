export interface Cipher {
  id: string
  name: string
  rows: Row[]
}

export interface Row {
  id: string
  words: Word[]
  nextRowId: string | null
}

export interface Word {
  letters: Letter[]
}

export interface Letter {
  character: string
}
export interface LetterWithChord extends Letter {
  chordId: string
}
