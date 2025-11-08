import * as  express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { addFAQS } from "../models/carfaqs"
import * as  bcrypt from "bcrypt";
import * as nodemailer from "nodemailer"
import { format } from "date-fns";
export const carfaqsRouter = express.Router();

carfaqsRouter.use(express.json());


carfaqsRouter.post('/createFAQS', async (req: Request, res: Response) => {
    try {
      const data: addFAQS = req.body;
  
      if (!data.Question || !data.Answer || !data.CreatedDate || !data.UpdatedDate || !data.Status) {
        return res.status(400).send({ status: 400, message: 'Required fields are missing.' });
      }
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
      data.CreatedDate = formattedDate
      data.UpdatedDate = formattedDate
      const result = await collections?.addFAQS?.insertOne(data);
  
      if (result) {
        return res.status(201).send({ status: 201, message: 'createFAQS added successfully.' });
      } else {
        return res.status(500).send({ status: 500, message: 'Failed to add createFAQS.' });
      }
    } catch (error) {
      console.error(error);
      return res.status(400).send((error as Error).message);
    }
  });
  
  carfaqsRouter.get("/getAllFAQS", async (req: Request, res: Response) => {
  
    const result = await collections?.addFAQS?.find({}).toArray()
  
    if (result) {
      return res.status(200).send({ status: 200, message: "getAllFAQS sucessfully", data: result }
      )
    }
    else {
      return res.status(400).send({ status: 400, message: "No data Found", data: {} })
    }
  
  })
  
  carfaqsRouter.get("/getFAQ/:id", async (req: Request, res: Response) => {
    try {
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addFAQS?.findOne({ _id: objectId })
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
  carfaqsRouter.delete("/deleteFAQ/:id", async (req: Request, res: Response) => {
    try {
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(req.params.id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
  
      const result = await collections?.addFAQS?.deleteOne({ _id: objectId })
      return res.status(201).send({ status: 201, message: `Delete FAq is done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });
  carfaqsRouter.put("/updateFAQ", async (req: Request, res: Response) => {
    try {const   {Question,Answer,Status,CreatedDate,UpdatedDate,_id} = req.body;
      console.log(req.params.id); // Corrected statement
      const objectId = new ObjectId(_id); // Convert to ObjectId
      console.log(objectId); // Log the converted ObjectId
      const date = new Date(); // Note: Months are zero-based (8 represents September)
  
      const formattedDate = format(date, 'dd/MM/yyyy');
  
      const result = await collections?.addFAQS?.updateOne({ _id: objectId }, { $set:{Question:Question,Answer:Answer,Status:Status,CreatedDate:CreatedDate,UpdatedDate: formattedDate}})
      return res.status(201).send({ status: 201, message: `Update location done with ${req.params.id}` });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ status: 500, message: "Internal Server Error" });
    }
  });