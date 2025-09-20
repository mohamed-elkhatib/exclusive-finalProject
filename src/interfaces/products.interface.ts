import { IBrand } from "./brand.interface"
import { Icategory } from "./categories.interface"
import { Ipagination } from "./pagination.interface"
import { ISubcategory } from "./subcategory.interface"

export interface IProductsResponse {
  results: number
  metadata: Ipagination
  data: IProduct[]
}



export interface IProduct {
  sold?: number
  images: string[]
  subcategory: ISubcategory[]
  ratingsQuantity: number
  _id: string
  title: string
  slug: string
  description: string
  quantity: number
  price: number
  imageCover: string
  category: Icategory
  brand: IBrand
  ratingsAverage: number
  createdAt: string
  updatedAt: string
  id: string
  priceAfterDiscount?: number
  availableColors?: string[]
}



