import { Usecase } from './protocols'

export interface ICheckIfChordExistsBySymbolUsecase extends Usecase<string[], boolean> {}

export class CheckIfChordExistsBySymbol implements ICheckIfChordExistsBySymbolUsecase {
  async exec (symbols: string[]): Promise<boolean> {
    return null
  }
}
