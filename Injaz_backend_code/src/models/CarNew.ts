import { ObjectId } from "mongodb";
import { collections } from "services/database.service";

// Car Basic Information Model
export interface CarBasicInfo {
    _id?: ObjectId;
    name: string;
    brand: string;
    model: string;
    year: number;
    categoryId: ObjectId; // Foreign key referencing Category model
    locationId: ObjectId; // Foreign key referencing Location model
    exteriorColor: string;
    interiorColor: string;
    imageUrls: string[]; // Store image URLs
}

// Car Pricing Model
export interface CarPricing {
    _id?: ObjectId;
    carId: ObjectId; // Foreign key referencing CarBasicInfo model
    dailyPrice: number;
    weeklyPrice: number;
    monthlyPrice: number;
    // You can add more pricing details here if needed
}

// Car Specifications Model
export interface CarSpecifications {
    _id?: ObjectId;
    carId: ObjectId; // Foreign key referencing CarBasicInfo model
    transmission: string;
    cruiseControl: boolean;
    engineCapacity: string;
    luggageBootCapacity: string;
    engineSize: string;
    seater: string;
    bluetooth: boolean;
    aux: boolean;
    navigation: boolean;
    parkingSensor: boolean;
    appleCarPlay: boolean;
    isoFix: boolean;
    sunRoof: boolean;
    pushButton: boolean;
    lcd: boolean;
    rearCamera: boolean;
}

// Car Additional Details Model
export interface CarAdditionalDetails {
    _id?: ObjectId;
    carId: ObjectId; // Foreign key referencing CarBasicInfo model
    securityDeposit: number;
    cashType: string[];
    carFeatures: string[];
    unlimitedMileage: boolean;
    paiInsurance: {
        daily: number;
        monthly: number;
    };
    freeCancellation: boolean;
    freeDelivery: {
        thirtyDaysAndAbove: boolean;
    };
    customerSupport: boolean;
    scdwPerMonth: number;
    paymentType: string;
    requirements: {
        forUAEResidents: string[];
        forTourists: string[];
    };
}

// Category Model
export interface Category {
    _id?: ObjectId;
    name: string;
}

// Location Model
export interface Location {
    _id?: ObjectId;
    name: string;
    address: string;
}

// User Model
export interface User {
    _id?: ObjectId;
    name: string;
    email: string;
    password: string; // Hashed password for security
    // Other user details as needed
}

// Booking History Model
export interface BookingHistory {
    _id?: ObjectId;
    userId: ObjectId; // Foreign key referencing User model
    carId: ObjectId; // Foreign key referencing Car model
    startDate: Date;
    endDate: Date;
    totalPrice: number;
    // Other booking details as needed
}


// Indexing
collections?.carBasicInfo?.createIndex({ name: 1 });
collections?.carBasicInfo?.createIndex({ brand: 1 });
collections?.carBasicInfo?.createIndex({ model: 1 });
collections?.carBasicInfo?.createIndex({ year: 1 });
collections?.carBasicInfo?.createIndex({ categoryId: 1 });
collections?.carBasicInfo?.createIndex({ locationId: 1 });

collections?.carPricing?.createIndex({ carId: 1 });
collections?.carSpecifications?.createIndex({ carId: 1 });
collections?.carAdditionalDetails?.createIndex({ carId: 1 });