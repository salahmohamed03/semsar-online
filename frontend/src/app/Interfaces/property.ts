import { Company } from "./company";

export interface Property{
  id?: 1,
  numberOfRooms?: 4,
  area?: 2000,
  price?: 120000,
  Location?: 'New York',
  type?: 'House',
  description?: 'This is a beautiful house in New York',
  listingDate?: '2021-01-01',
  downPayment?: 20000,
  status?: 'For Sale',
  images?: string[],
  company?: Company
}
