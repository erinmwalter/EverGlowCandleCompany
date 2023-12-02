export default interface StorefrontItem{
    id: number;
    name: string;
    description: string;
    price: number;
    numInStock: number;
    isOnSale: boolean;
    discountPercent: number;
    isFeaturedItem: boolean;
}