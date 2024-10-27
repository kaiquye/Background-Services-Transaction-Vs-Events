export abstract class UseCase<Input, OuPut> {
  abstract perform(input: Input): OuPut
}
