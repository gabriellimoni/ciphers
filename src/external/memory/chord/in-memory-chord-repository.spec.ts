import { InMemoryChordRepository, chords } from './in-memory-chord-repository'

describe('In Memory Chord Repository', () => {
  describe('addChord()', () => {
    beforeEach(() => chords.splice(0, chords.length))

    test('Should have 1 chord in memory', async () => {
      const inMemoryChordRepo = new InMemoryChordRepository()
      await inMemoryChordRepo.addChord({
        symbol: 'Any Symbol',
        imagesUrls: ['any_image_urls']
      })
      expect(chords).toHaveLength(1)
      const chord = chords[0]
      expect(chord.id).toBeTruthy()
      expect(chord.symbol).toBe('Any Symbol')
      expect(chord.imagesUrls).toEqual(['any_image_urls'])
    })
  })

  describe('findChordBySymbol)', () => {
    beforeEach(() => chords.splice(0, chords.length))

    test('Should have 1 chord in memory', async () => {
      const inMemoryChordRepo = new InMemoryChordRepository()
      await inMemoryChordRepo.addChord({
        symbol: 'Any Symbol',
        imagesUrls: ['any_image_urls']
      })
      const foundChord = await inMemoryChordRepo.findBySymbol('Any Symbol')
      expect(foundChord.id).toBeTruthy()
      expect(foundChord.symbol).toBe('Any Symbol')
      expect(foundChord.imagesUrls).toEqual(['any_image_urls'])
    })
  })
})
