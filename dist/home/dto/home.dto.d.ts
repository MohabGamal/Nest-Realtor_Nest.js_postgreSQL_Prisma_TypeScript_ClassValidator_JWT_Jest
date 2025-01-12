import { PropertyType } from '@prisma/client';
export declare class HomeResponseDto {
    constructor(partial: Partial<HomeResponseDto>);
    id: number;
    address: string;
    city: string;
    price: number;
    image: string;
    created_at: Date;
    updated_at: Date;
    realtor_id: number;
    property_type: PropertyType;
    getPropertyType(): PropertyType;
    number_of_bedrooms: number;
    getNumberOfBedrooms(): number;
    number_of_bathrooms: number;
    getNumberOfBathrooms(): number;
    listed_date: Date;
    getListedDate(): Date;
    land_size: number;
    getLandSize(): number;
}
export declare class HomeRequestQueryDto {
    city?: string;
    minPrice?: string;
    maxPrice?: string;
    property_type?: PropertyType;
}
declare class Image {
    url: string;
}
export declare class HomeCreateDto {
    address: string;
    city: string;
    price: number;
    property_type: PropertyType;
    number_of_bedrooms: number;
    number_of_bathrooms: number;
    land_size: number;
    images: Image[];
}
export declare class HomeUpdateDto {
    address?: string;
    city?: string;
    price?: number;
    property_type?: PropertyType;
    number_of_bedrooms?: number;
    number_of_bathrooms?: number;
    land_size?: number;
    realtor_id?: number;
}
export declare class InquireDto {
    message: string;
}
export {};
