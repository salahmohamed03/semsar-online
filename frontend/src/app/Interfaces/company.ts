export interface companyProperty{
  id: number,
  numberOfRooms: number,
  area: number,
  price: number,
  Location: string,
  type: string,
  description: string,
  listingDate: string,
  downPayment: number,
  status: string
}
export interface Company {
  Id: string|undefined,
  City?: string|undefined,
  Address?: string|undefined,
  Image?: string|ArrayBuffer|null|undefined,
  Name?: string|undefined,
  Description?: string|undefined,
  Email?: string|undefined,
  WhatsApp?: string|undefined,
  Website?: string|undefined,
  Properties?: companyProperty[]
}
