import express, { Request, Response, Router } from 'express';
import { existsSync, writeFileSync } from 'fs';

import { ExcelService, Booking } from '../utils/excelService';

const router: Router = express.Router();

const filePath = './bookings.xlsx';

if (!existsSync(filePath)) {
  writeFileSync(filePath, '');
}

const excelService = new ExcelService(filePath);

// Initialize Excel service
excelService.init().catch((error) => {
  console.error('Failed to initialize Excel service:', error);
});

router.post('/bookings', (req: Request, res: Response) => {
  const newBooking: Booking = req.body;

  // Assuming newBooking is a valid Booking object
  excelService.addBooking(newBooking)
    .then(() => res.status(201).send('Booking added to Excel sheet'))
    .catch((error) => {
      console.error(error);
      res.status(500).send('Internal Server Error');
    });
});

export default router;
