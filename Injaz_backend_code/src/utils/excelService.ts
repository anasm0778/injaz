import * as ExcelJS from 'exceljs';
import { Readable } from 'stream';
import * as fs from 'fs';

export class ExcelService {
  private workbook: ExcelJS.Workbook;
  private sheet: ExcelJS.Worksheet;
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
    this.workbook = new ExcelJS.Workbook();
  }

  async init(): Promise<void> {
    try {
      this.workbook = new ExcelJS.Workbook();
      
      // Check if the file exists before reading
      const fileExists = await fs.promises.access(this.filePath)
        .then(() => true)
        .catch(() => false);
  
      if (fileExists) {
        // Load existing workbook
        const stream = Readable.from([Buffer.from('')]);
        this.workbook = await this.workbook.xlsx.read(stream);
      } else {
        // Create a new workbook if the file doesn't exist
        await this.workbook.xlsx.writeBuffer();
      }
  
      // Assume the first sheet is used for bookings
      this.sheet = this.workbook.getWorksheet('Bookings') || this.workbook.addWorksheet('Bookings');
  
      // If the sheet is newly created, add a header row
      if (this.sheet.rowCount === 1) {
        this.sheet.addRow(['BookingID', 'UserName', 'CarModel', 'PickupDate', 'ReturnDate']);
      }
    } catch (error) {
      console.error('Error initializing Excel service:', error);
    }
  }
  
  
  

  async addBooking(booking: Booking): Promise<void> {
    try {
      const { bookingID, userName, carModel, pickupDate, returnDate } = booking;
      this.sheet.addRow([bookingID, userName, carModel, pickupDate, returnDate]);
      await this.workbook.xlsx.writeFile(this.filePath);
    } catch (error) {
      console.error('Error adding booking to Excel sheet:', error);
    }
  }
}

export interface Booking {
  bookingID: number;
  userName: string;
  carModel: string;
  pickupDate: string;
  returnDate: string;
}
