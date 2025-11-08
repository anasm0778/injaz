import * as express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { carServices } from "../models/carServices";
import { format } from "date-fns";


export const carServiceRouter = express.Router();

carServiceRouter.use(express.json());

carServiceRouter.post('/createCarServices', async (req: Request, res: Response) => {
    try {
      const data: carServices = req.body;
  
      if (!data.Title || !data.CreatedDate || !data.UpdatedDate) {
        return res.status(400).send({ status: 400, message: 'Required fields are missing.' });
      }
      const date = new Date();
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      data.CreatedDate = formattedDate
      data.UpdatedDate = formattedDate
      const result = await collections?.addCarServices?.insertOne(data);
  
      if (result) {
        return res.status(201).send({ status: 201, message: 'CarServices added successfully.' });
      } else {
        return res.status(500).send({ status: 500, message: 'Failed to add CarServices.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send((error as Error).message);
    }
  });
  carServiceRouter.get("/getCarServices/:id", async (req: Request, res: Response) => {
    try {
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addCarServices?.findOne({ _id: objectId })
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
  carServiceRouter.delete("/deleteCarServices/:id", async (req: Request, res: Response) => {
    try {
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addCarServices?.deleteOne({ _id: objectId })
      return res.status(201).send({ status: 201, message: `Delete createCarFeature is done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  carServiceRouter.put("/updateCarServices", async (req: Request, res: Response) => {
    try {
      const { Title,Status,CreatedDate,UpdatedDate,_id } = req.body;
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(_id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
      const date = new Date();
  
      const formattedDate = format(date, 'dd/MM/yyyy');
  
      const result = await collections?.addCarServices?.updateOne({ _id: objectId }, { $set: { Title:Title,Status:Status,CreatedDate:CreatedDate,UpdatedDate:formattedDate } })
      return res.status(201).send({ status: 201, message: `Update CarServices done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  
  
  carServiceRouter.get("/getAllCarServices", async (req: Request, res: Response) => {
  
    const result = await collections?.addCarServices?.find({}).toArray()
  
    if (result) {
      return res.status(200).send({ status: 200, message: "getAllCarServices sucessfully", data: result }
      )
  
    }
    else {
      return res.status(400).send({
        status: 400, message: "No data found", data: result
      })
    }
  
  })
  