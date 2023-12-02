import StorefrontItem from "./StorefrontItem";

export default interface OrderedItem {
    id: number;
    orderStatusId: number;
    storefrontItem?: StorefrontItem;
    candleType: CandleType;
    candleSize: number;
    containerColor: ContainerColor;
    itemPrice: number;
}

export enum CandleType{
    Regular,
    WoodWick
}

export enum ContainerColor
{
    Clear,
    Green,
    Amber
}