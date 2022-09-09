export default interface IRestaurant {
    id: number,
    name: string,
    description: string,
    cuisines: string[],
    opens: string,
    closes: string,
    rating: number,
    numRatings: number,
    costForTwo: number,
    imageUrl: string
};