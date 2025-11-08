import * as bcrypt from 'bcrypt';
import * as express from 'express';
import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import * as nodemailer from 'nodemailer';
import { CarInquiry } from '../models/carInquiry';
import { collections } from '../services/database.service';
import { sendWhatsAppmessage } from '../services/whatsapp';
export const carInquiryRouter = express.Router();

carInquiryRouter.use(express.json());

carInquiryRouter.get(
  '/getAllcontactenquiries',
  async (req: Request, res: Response) => {
    try {
      console.log(req.params.id);

      const result = await collections?.users?.find().toArray();
      if (result) {
        return res.status(201).send({
          status: 201,
          message: 'getAllcontactenquiries',
          data: result || {},
        });
      } else {
        return res
          .status(400)
          .send({ status: 201, message: 'No data found', data: result });
      }
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ status: 500, message: 'Internal server Error' });
    }
  },
);

carInquiryRouter.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find the user with the provided email in the database
    const user = await collections?.users?.findOne({ email });
    console.log(user);
    if (!user) {
      return res.status(404).send({
        status: 404,
        message: 'User not found. Please check your email or sign up.',
      });
    }

    const passwordMatch = await bcrypt.compareSync(password, user.password);
    console.log(passwordMatch, 'passwordMatchpasswordMatch');
    if (!passwordMatch) {
      return res.status(401).send({
        status: 401,
        message: 'Invalid password. Please check your password and try again.',
      });
    }

    return res.status(200).send({ status: 200, message: 'Login successful!' });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: 500, message: 'Internal Server Error' });
  }
});

async function generateBookingId() {
  try {
    // Use a dedicated counter document identified by a special field
    // First, try to find and update existing counter
    let counterDoc = await collections?.carInquiry?.findOneAndUpdate(
      { counterType: 'bookingCounter' },
      { $inc: { lastBookingId: 1 } },
      { returnDocument: 'after' }
    );

    // If counter document exists, use its incremented value
    if (counterDoc && counterDoc.value) {
      const bookingNumber = counterDoc.value.lastBookingId;
      console.log('Generated booking ID from counter:', bookingNumber);
      return bookingNumber;
    }

    // If counter doesn't exist, create it and start from 1
    try {
      await collections?.carInquiry?.insertOne({ 
        counterType: 'bookingCounter',
        lastBookingId: 1 
      } as any);
      console.log('Created new booking counter, starting at 1');
      return 1;
    } catch (insertError: any) {
      // If insert fails (maybe another request created it), try to get it
      if (insertError.code === 11000) {
        // Duplicate key error - counter was created by another request
        counterDoc = await collections?.carInquiry?.findOneAndUpdate(
          { counterType: 'bookingCounter' },
          { $inc: { lastBookingId: 1 } },
          { returnDocument: 'after' }
        );
        if (counterDoc && counterDoc.value) {
          return counterDoc.value.lastBookingId;
        }
      }
      throw insertError;
    }
  } catch (error) {
    console.error('Error generating booking ID:', error);
    // Fallback: count existing inquiries and add 1
    try {
      const count = await collections?.carInquiry?.countDocuments({
        counterType: { $ne: 'bookingCounter' }
      } as any);
      const fallbackId = (count || 0) + 1;
      console.log('Using fallback booking ID:', fallbackId);
      return fallbackId;
    } catch (fallbackError) {
      console.error('Fallback booking ID generation failed:', fallbackError);
      return 1;
    }
  }
}

carInquiryRouter.post(
  '/whatsappInquiry',
  async (req: Request, res: Response) => {
    try {
      const { msg } = req.body;
      const transporterOptions = {
        host: 'smtp.hostinger.com',
        secure: false,
        secureConnection: false,
        tls: {
          ciphers: 'SSLv3',
        },
        port: 587,
        auth: {
          user: 'Info@logicrent.ae',
          pass: 'Info@2016',
        },
      } as nodemailer.TransportOptions;

      const transporter = nodemailer.createTransport(transporterOptions);

      const mailOptions = {
        from: 'Info@logicrent.ae',
        to: 'Info@logicrent.ae',
        subject: 'INQUIRY Successfully CREATED',
        html: `
          <html>
            <body>
              <h2>Inquiry Details:</h2>
             <pre>${msg}</pre>
            </body>
          </html>
        `,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
          return res.status(201).send({
            status: 201,
            message: `Successfully created a inquiry  and sent email `,
          });
        }
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ status: 500, message: 'Internal Server Error' });
    }
  },
);

carInquiryRouter.post('/createInquiry', async (req: Request, res: Response) => {
  try {
    const {
      name,
      carName,
      startDate,
      endDate,
      pickUpLoc,
      dropLocation,
      phoneNumber,
      email,
      message,
      deliveryMode,
      packages,
      brand,
      model,
      pickupTime,
      dropTime,
    } = req.body;
    const status = 'New';
    const statusMessage = 'Received new inquiry';
    const statusChangedBy = 'admin';
    const bookingCreated = new Date();
    const bookingUpdated = new Date();
    const isNewCar = true;
    
    // Generate sequential booking number (1, 2, 3, ...)
    const bookingNumber = await generateBookingId();
    if (!bookingNumber || bookingNumber <= 0) {
      return res
        .status(500)
        .send({ status: 500, message: 'Failed to generate booking ID.' });
    }
    
    // Format booking ID as "log" + 3-digit padded number (e.g., "log001", "log002")
    const newBookingId = `log${bookingNumber.toString().padStart(3, '0')}`;
    const inquiry = new CarInquiry(
      newBookingId,
      name,
      carName,
      startDate,
      isNewCar,
      endDate,
      pickUpLoc,
      dropLocation,
      phoneNumber,
      message,
      deliveryMode,
      email,
      packages,
      brand,
      model,
      status,
      pickupTime,
      dropTime,
      statusMessage,
      statusChangedBy,
      bookingCreated,
      bookingUpdated,
    );
    inquiry['email'] = email;
    console.log('🚀 ~ carInquiryRouter.post ~ inquiry:', inquiry);

    const result = await collections?.carInquiry?.insertOne(inquiry);
    console.log('🚀 ~ carInquiryRouter.post ~ result:', result);

    if (result) {
      const transporterOptions = {
        host: 'smtp.hostinger.com',
        secure: false,
        secureConnection: false,
        tls: {
          ciphers: 'SSLv3',
        },
        port: 587,
        auth: {
          user: 'Info@logicrent.ae',
          pass: 'Info@2016',
        },
      } as nodemailer.TransportOptions;

      const transporter = nodemailer.createTransport(transporterOptions);

      const mailOptions = {
        from: 'Info@logicrent.ae',
        to: 'Info@logicrent.ae',
        subject: 'INQUIRY Successfully CREATED',
        html: `
            <html>
              <body>
                <h2>Inquiry Details:</h2>
                <table style="border-collapse: collapse;">
                  <tr>
                    <td><strong>Booking ID:</strong></td>
                    <td>${newBookingId}</td>
                  </tr>
                  <tr>
                    <td><strong>Name:</strong></td>
                    <td>${name}</td>
                  </tr>
                  <tr>
                    <td><strong>Car:</strong></td>
                    <td>${carName || (brand + ' ' + model)}</td>
                  </tr>
                  <tr>
                    <td><strong>From Date:</strong></td>
                    <td>${startDate || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>From Time:</strong></td>
                    <td>${pickupTime || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>To Date:</strong></td>
                    <td>${endDate || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>To Time:</strong></td>
                    <td>${dropTime || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Pickup Location:</strong></td>
                    <td>${pickUpLoc || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Drop Location:</strong></td>
                    <td>${dropLocation || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone Number:</strong></td>
                    <td>${phoneNumber}</td>
                  </tr>
                  <tr>
                    <td><strong>Email:</strong></td>
                    <td>${email}</td>
                  </tr>
                  <tr>
                    <td><strong>Package:</strong></td>
                    <td>${packages || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td><strong>Message:</strong></td>
                    <td>${message || 'N/A'}</td>
                  </tr>
                </table>
              </body>
            </html>
          `,
      };

      transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      const ResponseData = await collections?.carInquiry?.findOne({
        _id: result.insertedId,
      });

      sendWhatsAppmessage({
        message: `New Enquiry received :  \n ${JSON.stringify(
          ResponseData,
          null,
          2,
        )}`,
      });

      // Ensure bookingId is included in the response
      // Create a clean response object with all necessary fields
      const responseData: any = {
        ...ResponseData,
        bookingId: newBookingId,
        email: ResponseData?.email || email,
        phoneNumber: ResponseData?.phoneNumber || phoneNumber,
      };

      console.log('Sending response with bookingId:', newBookingId);
      console.log('Response data:', JSON.stringify(responseData, null, 2));

      return res.status(201).send({
        status: 201,
        message: `Successfully created a inquiry  and sent email `,
        result: responseData,
      });
    } else {
      return res
        .status(500)
        .send({ status: 500, message: 'Failed to create a inquiry.' });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: 500, message: 'Internal Server Error' });
  }
});
carInquiryRouter.get('/getInquiry/:id', async (req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    const objectId = new ObjectId(req.params.id);
    console.log(objectId);

    const result = await collections?.carInquiry?.findOne({ _id: objectId });
    if (result) {
      return res.status(201).send({
        status: 201,
        message: 'data get scussfully',
        data: result || {},
      });
    } else {
      return res
        .status(400)
        .send({ status: 201, message: 'No data found', data: result });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: 500, message: 'Internal server Error' });
  }
});
carInquiryRouter.delete(
  '/deleteInquiry/:id',
  async (req: Request, res: Response) => {
    try {
      console.log('Request recieved here:---->', req.params.id);
      const objectId = new ObjectId(req.params.id);

      const result = await collections?.carInquiry?.deleteOne({
        _id: objectId,
      });
      console.log(result);

      return res.status(201).send({
        status: 201,
        data: result,
        message: `Delete Inquiry is done with ${req.params.id}`,
      });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .send({ status: 500, message: 'Internal Server Error' });
    }
  },
);
carInquiryRouter.patch(
  '/updateInquiry/:id',
  async (req: Request, res: Response) => {
    try {
      const {
        carName,
        startDate,
        endDate,
        isNewCar,
        pickUpLoc,
        dropLocation,
        phoneNumber,
        area,
        message,
        deliveryMode,
        name,
        email,
        packages,
        brand,
        model,
        status,
        statusMessage,
        statusChangedBy,
      } = req.body;

      const objectId = new ObjectId(req.params.id);

      const updateFields = {
        carName,
        startDate,
        endDate,
        isNewCar,
        pickUpLoc,
        dropLocation,
        phoneNumber,
        area,
        message,
        deliveryMode,
        name,
        email,
        packages,
        brand,
        model,
        status,
        statusMessage,
        statusChangedBy,
      };

      const result = await collections?.carInquiry?.findOneAndUpdate(
        { _id: objectId },
        { $set: updateFields },
      );

      if (result && result.value) {
        return res.status(200).send({
          status: 200,
          message: 'Inquiry updated successfully',
          data: result.value,
        });
      } else {
        return res.status(404).send({
          status: 404,
          message: 'Inquiry not found',
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({
        status: 500,
        message: 'Internal Server Error',
      });
    }
  },
);

carInquiryRouter.get('/getInquirys', async (req: Request, res: Response) => {
  try {
    // Exclude the counter document from results
    const result = await collections?.carInquiry?.find({
      counterType: { $ne: 'bookingCounter' }
    } as any).toArray();

    if (result) {
      return res.status(201).send({
        status: 201,
        message: 'getInquirys sucessfully',
        data: result,
      });
    } else {
      return res
        .status(400)
        .send({ status: 201, message: 'No data found', data: result });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ status: 500, message: 'Internal Server Error' });
  }
});

carInquiryRouter.delete('/deleteAllInquirys', async (req: Request, res: Response) => {
  try {
    console.log('DELETE /user/deleteAllInquirys endpoint called');
    // Delete all inquiries except the counter document
    const result = await collections?.carInquiry?.deleteMany({
      counterType: { $ne: 'bookingCounter' }
    } as any);

    console.log('Delete result:', result);

    // Reset the booking counter to 0 so next booking will be 1
    const resetCounter = await collections?.carInquiry?.updateOne(
      { counterType: 'bookingCounter' },
      { $set: { lastBookingId: 0 } }
    );

    console.log('Counter reset result:', resetCounter);

    if (result) {
      return res.status(200).send({
        status: 200,
        message: `Successfully deleted ${result.deletedCount} inquiries and reset booking counter`,
        deletedCount: result.deletedCount,
      });
    } else {
      return res
        .status(400)
        .send({ status: 400, message: 'Failed to delete inquiries' });
    }
  } catch (error) {
    console.error('Error in deleteAllInquirys:', error);
    return res
      .status(500)
      .send({ status: 500, message: 'Internal Server Error' });
  }
});