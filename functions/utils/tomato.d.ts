export interface TomatoesProperty {
  readonly peel: any;
  get(elm: string, notInherited?: boolean);
  hasOwn(elm: string, notInherited?: boolean);
  map: any
}

export interface TomatoesConstructor {
  new (peel: any): TomatosProperty;
}
