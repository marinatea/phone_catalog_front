export interface IProduct {
  id: string;
  category: string;
  phoneId: string;
  itemId: string;
  name: string;
  fullPrice: number;
  price: number;
  screen: string;
  capacity: string;
  color: string;
  ram: string;
  year: number;
  image: string;
}

export interface IProductDescription {
  title: string;
  text: string[];
}

export interface IProductDetails {
  id: string;
  namespaceId: string;
  name: string;
  category: string;
  capacityAvailable: string[];
  capacity: string;
  priceRegular: number;
  priceDiscount: number;
  colorsAvailable: string[];
  color: string;
  images: string[];
  description: IProductDescription[];
  screen: string;
  resolution: string;
  processor: string;
  ram: string;
  camera: string;
  zoom: string;
  cell: string[];
}