export interface Review{
    id: number,
    rating: number,
    comment: string,
    date: string,
    user: {
        name: string,
        email: string,
        image: string
    }
}
