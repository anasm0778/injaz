
import { type ObjectId } from "mongodb";
import bcrypt from "bcrypt";


export class Auth {
    constructor(
        public firstName: string,
        public lastName: string, 
        public email: string, 
        public password: string, 
        public phoneNumber: string, 
        public address: string, 
        public city: string, 
        public locality: string, 
        public area: string, 
        public zipcode: string
        ) {
        if (!this.isValidString(firstName)) {
            throw Error(JSON.stringify({ message: "Invalid username. Username must be a non-empty string." }));
        }
        if (!this.isValidString(lastName)) {
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
    public hashPassword(password: string): string {
        const saltRounds = 10; // Number of salt rounds for bcrypt (a trade-off between security and speed)
        const hashedPassword = bcrypt.hashSync(password, saltRounds);
        return hashedPassword;
    }
    public returnData() {
        return {
            firstName: this.firstName, 
            lastName: this.lastName, 
            email: this.email, 
            password: this.password, 
            phoneNumber: this.phoneNumber, 
            address: this.address, 
            city: this.city, 
            locality: this.locality, 
            area: this.area, 
            zipcode: this.zipcode
        }
    }
}
export interface resetPassowrd {
    email: string,
    password: string,
    newPassword: string
}
export interface forgotPassoword {
    email: string,
    token: string,
    newPassword: string
}