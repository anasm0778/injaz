import * as  express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import {  carLoaction} from "../models/carlocation"
import { format } from "date-fns";


export const carLocationRouter = express.Router();

carLocationRouter.use(express.json());


carLocationRouter.post('/createcarLoaction', async (req: Request, res: Response) => {
    try {
      const data: carLoaction = req.body;
  
      if (!data.Name || !data.CreatedDate || !data.UpdatedDate) {
        return res.status(400).send({ status: 400, message: 'Required fields are missing.' });
      }
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      data.CreatedDate = formattedDate
      data.UpdatedDate = formattedDate
      const result = await collections?.addCarLoaction?.insertOne(data);
  
      if (result) {
        return res.status(201).send({ status: 201, message: 'carLoaction added successfully.' });
      } else {
        return res.status(500).send({ status: 500, message: 'Failed to add carLoaction.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send((error as Error).message);
    }
  });
  
  
  carLocationRouter.get("/getAllcarLoaction", async (req: Request, res: Response) => {
  
    const result = await collections?.addCarLoaction?.find({}).toArray()
  
    if (result) {
      return res.status(200).send({ status: 200, message: "getAllcarLoaction sucessfully", data: result }
      )
  
    }
    else {
      return res.status(400).send({ status: 400, message: "No data found", data: {} })
    }
  
  })
  
  carLocationRouter.get("/getCarLocation/:id", async (req: Request, res: Response) => {
    try {
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addCarLoaction?.findOne({ _id: objectId })
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
  carLocationRouter.delete("/deleteCarLocation/:id", async (req: Request, res: Response) => {
    try {
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addCarLoaction?.deleteOne({ _id: objectId })
      return res.status(201).send({ status: 201, message: `Delete carLocation is done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  
  carLocationRouter.put("/updateCarLocation", async (req: Request, res: Response) => {
    try {const   {Name,Status,CreatedDate,UpdatedDate,_id} = req.body;
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(_id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
  
      const result = await collections?.addCarLoaction?.updateOne({ _id: objectId }, { $set:{Name:Name,Status:Status,CreatedDate:CreatedDate,UpdatedDate: formattedDate}})
      return res.status(201).send({ status: 201, message: `Update location done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });




