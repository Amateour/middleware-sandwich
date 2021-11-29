export interface TomatosProperty {
  readonly peel: any;
  get(elm: string, notInherited?: boolean);
  hasOwn(elm: string, notInherited?: boolean);
}

export interface TomatosConstructor {
  new (peel: any): TomatosProperty;
}
