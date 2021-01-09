export interface Usecase<I, O> {
  exec: (params: I) => Promise<O>
}
