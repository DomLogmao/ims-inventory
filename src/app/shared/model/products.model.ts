export interface Products {
  id: number;
  name: string;
  description: string;
  quantity: number;
  price: number;
}
export interface ProductsDB {
  data: [];
  _id: string;
  _rev: string;
}
