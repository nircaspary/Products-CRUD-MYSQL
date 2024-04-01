export interface Product {
  title: string;

  description: string;
  price: number;
  createdBy: number;
}

export interface IncomingProduct extends Product {
  id: number;
  createdAt: string;
}
