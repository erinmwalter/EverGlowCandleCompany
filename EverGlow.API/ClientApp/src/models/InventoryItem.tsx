export default interface InventoryItem{
    id: number;
    name: string;
    supplierName: string;
    supplierId: string;
    description: string;
    numberInStock: number;
    itemsPerUnit: number;
    lowStockNumber: number;
    pricePerUnit: number;
    dateLastReordered: Date;
    lastUpdateDate: Date;
    lastUpdateBy: string;
}