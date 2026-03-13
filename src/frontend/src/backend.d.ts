import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface SupportMessage {
    name: string;
    message: string;
    timestamp: bigint;
    mobile: string;
}
export interface Product {
    id: bigint;
    inStock: boolean;
    subcategory: string;
    name: string;
    description: string;
    imageUrl: string;
    offerPrice: bigint;
    category: Category;
    regularPrice: bigint;
}
export interface Order {
    id: bigint;
    customerName: string;
    thana: string;
    deliveryCharge: bigint;
    mobileNumber: string;
    productId: bigint;
    productName: string;
    district: string;
    grandTotal: bigint;
    timestamp: bigint;
    quantity: bigint;
    fullAddress: string;
    subtotal: bigint;
}
export enum Category {
    cosmetics = "cosmetics",
    mens = "mens",
    womens = "womens"
}
export interface backendInterface {
    getAllOrders(): Promise<Array<Order>>;
    getAllProducts(): Promise<Array<Product>>;
    getProduct(id: bigint): Promise<Product>;
    getProductsByCategory(category: Category): Promise<Array<Product>>;
    getSupportMessages(): Promise<Array<SupportMessage>>;
    initialize(): Promise<void>;
    placeOrder(customerName: string, mobileNumber: string, district: string, thana: string, fullAddress: string, productId: bigint, quantity: bigint): Promise<bigint>;
    searchProducts(searchTerm: string): Promise<Array<Product>>;
    sendSupportMessage(name: string, mobile: string, message: string): Promise<void>;
}
