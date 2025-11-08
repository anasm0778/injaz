import carImages from "../models/carImages";
import * as express from 'express';
import { Request, Response } from "express";
import { collections } from "../services/database.service";

export const carsImagesRouter = express.Router();

carsImagesRouter.use(express.json());

carsImagesRouter.post("/addCarImage", async (req: Request, res: Response) => {
  try {
    const { carId, image, imageType } = req.body;

    const newBrand = new carImages(carId, image, imageType);

    const result = await collections?.carImages?.insertOne(newBrand);

    if (result) {
      return res.status(200).send({ status: 200, message: `Successfully added carImage ${result.insertedId}` });
    } else {
      return res.status(500).send({ status: 500, message: "Failed to create a carImage" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send((error as Error).message);
  }
});

carsImagesRouter.get("/getCarImages/:imageType?", async (req: Request, res: Response) => {
  try {
    const imageType = req.params.imageType;

    let result: any[];

    if (typeof imageType === 'undefined') {
      const queryResult = await collections?.carImages?.find().toArray();
      result = queryResult || []; // If queryResult is undefined, set result to an empty array
    } else {
      const queryResult = await collections?.carImages?.find({ imageType }).toArray();
      result = queryResult || []; // If queryResult is undefined, set result to an empty array
    }

    return res.status(200).send({ status: 200, message: "Successfully getCarImages", data: result });
  } catch (error) {
    console.error(error);
    return res.status(400).send((error as Error).message);
  }
});
