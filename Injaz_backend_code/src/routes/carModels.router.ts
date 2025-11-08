
import * as express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { CarModel } from "../models/carmodel";
import { format } from "date-fns";

export const carModelRouter = express.Router();

carModelRouter.use(express.json());




carModelRouter.post('/addCarModel', async (req: Request, res: Response) => {
    try {
      const carData: CarModel = req.body;
  
      // Validate the required fields
      if (!carData.Name || !carData.Brand || !carData.CreatedDate || !carData.UpdatedDate) {
        return res.status(400).send({ status: 400, message: 'Required fields are missing.' });
      }
        const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      carData.CreatedDate = formattedDate
      carData.UpdatedDate = formattedDate
      const result = await collections?.carModel?.insertOne(carData);
  
      if (result) {
        return res.status(201).send({ status: 201, message: 'Car Model added successfully.' });
      } else {
        return res.status(500).send({ status: 500, message: 'Failed to add car data.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send((error as Error).message);
    }
  });
  carModelRouter.get('/getCarModel/:id', async (req: Request, res: Response) => {
    try {
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.carModel?.findOne({ _id: objectId })
      if (result) {
        return res.status(201).send({ status: 201, message: "getCarModel sucessfully", data: result })
      }
      else {
        return res.status(400).send({ status: 201, message: "No data found", data: result })
  
      }
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal server Error" });
    }
  
  });
  carModelRouter.put('/updateCarModel', async (req: Request, res: Response) => {
    //try {
    //   const carData: CarModel = req.body;
  
    //   // Validate the required fields
    //   if (!carData.Name || !carData.Brand || !carData.CreatedDate || !carData.UpdatedDate) {
    //     return res.status(400).send({ message: 'Required fields are missing.' });
    //   }
  
    //   // Get a reference to the 'cars' collection
    //   // const carCollection = getCollection('cars'); // Adjust the collection name as needed
  
    //   // Insert the car data into the collection
    //   const result = await collections?.carModel?.insertOne(carData);
  
    //   if (result) {
    //     return res.status(201).send({ message: 'Car Model added successfully.' });
    //   } else {
    //     return res.status(500).send({ message: 'Failed to add car data.' });
    //   }
  
    // } catch (error) {
    //   console.error(error);
    //   return res.status(400).send((error as Error).message);
    // }
    try {
      const { Name, Brand, CreatedDate, UpdatedDate, _id } = req.body;
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(_id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      
  
      const result = await collections?.carModel?.updateOne({ _id: objectId }, { $set: { Name: Name, Brand: Brand, CreatedDate: CreatedDate, UpdatedDate:formattedDate } })
      return res.status(201).send({ status: 201, message: `update carModel is done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  
  carModelRouter.delete('/deleteCarModel/:id', async (req: Request, res: Response) => {
    try {
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.carModel?.deleteOne({ _id: objectId })
      return res.status(201).send({ status: 201, message: `Delete carModel is done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  
  });
  
  
  
  carModelRouter.get("/getAllCarModel", async (req: Request, res: Response) => {
    try {
  
      const test = await collections?.carModel?.find({}).toArray()
      if (test) {
        return res.status(201).send({ status: 201, message: "getAllCarModel sucessfully", data: test }
        )
      }
      else {
        res.status(400).send({ status: 400, message: 'No data found.', data: {} })
      }
  
    }
    catch (err) {
      return res.status(400).send((err as Error).message);
  
    }
  })
  
  