// models/Car.ts
import { Schema, model } from 'mongoose';

interface Image {
  url: string;
  // public_id?: string; 
}

interface Specification {
  key: string;
  value: string;
}

export interface Car {
  name?: string;
  brand?: string;
  location?: string;
  price?: string;
  images?: Image[];
  specifications?: Specification[];
}

const carSchema = new Schema<Car>({
  name: { type: String},
  brand: { type: String},
  location: { type: String},
  price: { type: String},
  images: [{ url: String, public_id: String }],
  specifications: [{ key: String, value: String }],
});

export const CarModelNew = model<Car>('Car', carSchema);
