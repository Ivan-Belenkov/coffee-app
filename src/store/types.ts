export enum STORE_TYPES {
  CoffeeTypeList = 'CoffeeTypeList',
  LoadingState = 'LoadingState'
}

export type CoffeeType = {
  id: number;
  uid: string;
  blendName: string;
  origin: string;
  variety: string;
  intensifier: string;
  tags: CoffeeTag[];
};

export type CoffeeTag = {
  id: number;
  text: string;
  color: string;
};

export type LoadingState = {
  loading: boolean;
  error: boolean;
};

export type StoreData = CoffeeType | LoadingState;
