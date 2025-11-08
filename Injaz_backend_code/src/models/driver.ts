import { type ObjectId } from "mongodb";
import bcrypt from "bcrypt";



export class Auth {
    constructor(public userName: string, public email: string, public password: string, public phoneNumber: string, public address: string, public city: string, public locality: string, public area: string, public zipcode: string) {
        if (!this.isValidString(userName)) {
            throw Error(JSON.stringify({ message: "Invalid username. Username must be a non-empty string." }));
        }
        if (!this.isValidString(address)) {
            throw Error(JSON.stringify({ message: "Invalid address. address must be a non-empty string." }));
        }
        if (!this.isValidString(city)) {
            throw Error(JSON.stringify({ message: "Invalid city. city must be a non-empty string." }));
        }
        if (!this.isValidString(locality)) {
            throw Error(JSON.stringify({ message: "Invalid locality. locality must be a non-empty string." }));
        }
        if (!this.isValidString(area)) {
            throw Error(JSON.stringify({ message: "Invalid area.area must be a non-empty string." }));
        }
        if (!this.isValidString(zipcode)) {
            throw Error(JSON.stringify({ message: "Invalid zipcode.zipcode  must be a non-empty string." }));
        }

        if (!this.isValidPhoneNumber(phoneNumber)) {
            throw new Error(JSON.stringify({ message: "Invalid phone number. Please provide a valid phone number as a number type." }));
        }

        if (!this.isValidEmail(email)) {
            throw new Error(JSON.stringify({ message: "Invalid email address. Please provide a valid email address." }));
        }

        if (!this.isValidPassword(password)) {
            throw new Error(JSON.stringify({ message: "Invalid password. Password must be at least 6 characters long." }));
        }
        this.password = this.hashPassword(password); // Encrypt the password before storing it in the object
        this.returnData()


    }

    private isValidString(userName: string): boolean {
        return typeof userName === 'string' && userName.trim().length > 0;
    }

    private isValidPhoneNumber(phoneNumber: string): boolean {
        return typeof phoneNumber === 'string';
    }

    private isValidEmail(email: string): boolean {
        // This is a basic email format check, but you can use a more robust email validation library if needed.
        const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        console.log(emailRegex.test(email), "emailRegex.test(email);emailRegex.test(email);")
        return emailRegex.test(email);
    }

    private isValidPassword(password: string): boolean {
        return password.length >= 6;
    }
    private hashPassword(password: string): string {
        const saltRounds = 10; // Number of salt rounds for bcrypt (a trade-off between security and speed)
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        return hashedPassword;
    }
    public returnData() {
        return {
            userName: this.userName, email: this.email, password: this.password, phoneNumber: this.phoneNumber, address: this.address, city: this.city, locality: this.locality, area: this.area, zipcode: this.zipcode
        }
    }
}

export interface Newlist {
    selecrCar: {
        carBrand: string;
        version: string;
        makeYear: string;
    };
    carSpecs: {
        AvalibleColors: number[];
        carfeaturs: number[];
        specs: string;
        CruiseControl: boolean;
        FuelType: string;
        EngineCapacity: string;
        BootCapacity: string;
    };
    PRICING: {
        PricePerDay: string;
        MinimumDayBooking: string;
        PricePerWeek: string;
        ExtraMillingCost: string;
        CDW: string;
    };
    RentalTerms: {
        Security: string;
        ExcessClaim: string;
        Delivery: string;
        SpecialNote: string;
    };
    MonthlyPricing: {
        '1month': number[];
        '3months': number[];
        '6months': number[];
        '12months': number[];
        CDW: string;
    };

}
export interface ContactInfo {
    Emai: string,
    WhatsupNo: string,
    SMSNotificationNo: string,
    MainAdress: string,
    MainAdressArabic: string,
    PhoneNo: string
}


export interface tradeLicence {
    UploadTradLicense: string,
    LicenseExpiryDate: string,

}

export interface corporateVedio {
    CORPORATE_VIDEO: string,

}




export interface addDeliveryOptions {
    DeliveryTerms: {
        DeliverywithinEmirate: string;
        DeliveryatAirport: string;
        DeliveryPickupCharges: string;
    };
    FastDelivery: {
        deliveryItem: string;

    };

}


export interface addCharges {

    DefaultCharges: {
        Spes: string;
        ExtaMillageCost: string;
        ExcessClaim: string;
        MilleagePerDay: string;
        MilleagePerMonth: string;
        MilleagePerWeek: string;
        SecurityDeposite: string;
        AcceptedIn: string;
        MinimumCustomers: string;
        RequiredDriving: string;
        SpecialNoteFor: string;
    };

    ExtraCharges: {
        GPSDevice: string;
        CDWPerDayCost: string;
        CDWPerMonthCost: string;
        Salik: string;
        AdditionalDriverInsurance: string;
        BabySeat: string;
    };
}



export interface addDeliveryOptions {
    DeliveryTerms: {
        DeliverywithinEmirate: string;
        DeliveryatAirport: string;
        DeliveryPickupCharges: string;
    };
    FastDelivery: {
        deliveryItem: string;

    };

}

