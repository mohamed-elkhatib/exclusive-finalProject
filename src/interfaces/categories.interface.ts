import { Ipagination } from "./pagination.interface"

export interface ICategoryResponse {
  results: number
  metadata: Ipagination
  data: Icategory[]
}



export interface Icategory {
  _id: string
  name: string
  slug: string
  image: string
  createdAt: string
  updatedAt: string
}
