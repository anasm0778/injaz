import * as  express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { carFeatures } from "../models/Features";
import { format } from "date-fns";


export const carFeaturesRouter = express.Router();
carFeaturesRouter.use(express.json());


carFeaturesRouter.post('/createCarFeatures', async (req: Request, res: Response) => {
    try {
      const data: carFeatures = req.body;
  
      if (!data.Title || !data.CreatedDate || !data.UpdatedDate) {
        return res.status(400).send({ message: 'Required fields are missing.' });
      }
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      data.CreatedDate = formattedDate
      data.UpdatedDate = formattedDate
      const result = await collections?.carFeatures?.insertOne(data);
      if (result) {
        return res.status(201).send({ status: 201, message: 'CarFeatures added successfully.' });
      } else {
        return res.status(500).send({ status: 500, message: 'Failed to add data.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send((error as Error).message);
    }
  });
  carFeaturesRouter.get("/getCarFeature/:id", async (req: Request, res: Response) => {
    try {
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.carFeatures?.findOne({ _id: objectId })
      if (result) {
        return res.status(201).send({ status: 201, message: "data get scussfully", data: result || {} });
      }
  
      else {
        return res.status(400).send({ status: 201, message: "No data found", data: result });
  
      }
  
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal server Error" });
    }
  });
  carFeaturesRouter.delete("/deleteCarFeature/:id", async (req: Request, res: Response) => {
    try {
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.carFeatures?.deleteOne({ _id: objectId })
      return res.status(201).send({ status: 201, message: `Delete createCarFeature is done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  carFeaturesRouter.put("/updateCarFeature", async (req: Request, res: Response) => {
    try {
      const { Title,Status,CreatedDate,UpdatedDate,_id } = req.body;
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(_id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      
  
      const result = await collections?.carFeatures?.updateOne({ _id: objectId }, { $set: { Title:Title,Status:Status,CreatedDate:CreatedDate,UpdatedDate:formattedDate } })
      return res.status(201).send({ status: 201, message: `Update Brand done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  
  carFeaturesRouter.get("/getAllCarFeatures", async (req: Request, res: Response) => {
  
    const result = await collections?.carFeatures?.find({}).toArray()
  
    if (result) {
      return res.status(200).send({ status: 200, message: "getAllCarFeatures sucessfully", data: result }
      )
  
    }
    else {
      return res.status(400).send({ status: 400, message: "No data found", data: {} })
    }
  
  })
  
  