import * as express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { carEngineCapacities } from "../models/carcapacities";
import { format } from "date-fns";

export const carcapacitiesRouter = express.Router();

carcapacitiesRouter.use(express.json());

carcapacitiesRouter.post('/createcarEngineCapacities', async (req: Request, res: Response) => {
    try {
      
          const data: carEngineCapacities = req.body;
  
      if (!data.Capacity || !data.CreatedDate) {
        return res.status(400).send({ status: 400, message: 'Required fields are missing.' });
      }
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      data.CreatedDate = formattedDate
      data.UpdatedDate = formattedDate
      const result = await collections?.addCarEngineCapacities?.insertOne(data);
  
      if (result) {
        return res.status(201).send({ status: 201, message: 'carEngineCapacities added successfully.' });
      } else {
        return res.status(500).send({ status: 500, message: 'Failed to add carEngineCapacities.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send((error as Error).message);
    }
  });
  
  carcapacitiesRouter.get("/getCarEngineCapacities/:id", async (req: Request, res: Response) => {
    try {
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addCarEngineCapacities?.findOne({ _id: objectId })
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
  carcapacitiesRouter.delete("/deleteCarEngineCapacities/:id", async (req: Request, res: Response) => {
    try {
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addCarEngineCapacities?.deleteOne({ _id: objectId })
      return res.status(201).send({ status: 201, message: `Delete CarEngineCapacities is done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  carcapacitiesRouter.put("/updateCarEngineCapacities", async (req: Request, res: Response) => {
    try {const   {Capacity,Status,CreatedDate,UpdatedDate,_id} = req.body;
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(_id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
  
      const result = await collections?.addCarEngineCapacities?.updateOne({ _id: objectId }, { $set:{Capacity:Capacity,Status:Status,CreatedDate:CreatedDate,UpdatedDate: formattedDate}})
      return res.status(201).send({ status: 201, message: `Update CarServices done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  
  
  carcapacitiesRouter.get("/getAllcarEngineCapacities", async (req: Request, res: Response) => {
  
    const result = await collections?.addCarEngineCapacities?.find({}).toArray()
  
    if (result) {
      return res.status(200).send({ status: 200, message: "getAllcarEngineCapacities sucessfully", data: result }
      )
  
    }
    else {
      return res.status(400).send({ status: 400, message: "No data found", data: {} })
    }
  
  })
  