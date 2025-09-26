import { IProduct } from "./products.interface";


export interface WishlistResponse {
  status: string;
  count: number;
  data: IProduct[];
}