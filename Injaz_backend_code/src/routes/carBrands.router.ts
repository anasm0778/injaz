
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { Categoryes } from "../models/categoryes"
import { format } from "date-fns";


export const carBrandsRouter = express.Router();
carBrandsRouter.use(express.json());

carBrandsRouter.post("/createBrand", async (req: Request, res: Response) => {
  try {
    let { name, status, slag, createdDate, updatedDate } = req.body;
    const date = new Date(); // Note: Months are zero-based (8 represents September)

    let formattedDate = format(date, 'dd/MM/yyyy');
    createdDate = formattedDate
    updatedDate = formattedDate
    // If the email is unique, create a new Auth instance
    const newBrand = new Categoryes(name, status, slag, createdDate, updatedDate);

    // Save the new user to the database
    const result = await collections?.carBrands?.insertOne(newBrand);

    if (result) {
      return res.status(201).send({ status: 201, message: `Successfully created a new Brand with id ${result.insertedId}` });
    } else {
      return res.status(500).send({ status: 500, message: "Failed to create a new Brand." });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send((error as Error).message); // Respond with the error message from the validation
  }
});
carBrandsRouter.get("/getBrand/:id", async (req: Request, res: Response) => {
  try {
    const objectId = new ObjectId(req.params.id); // Convert to ObjectId
    console.log(objectId); // Log the converted ObjectId

    const result = await collections?.carBrands?.findOne({ _id: objectId })
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
carBrandsRouter.delete("/deleteBrand/:id", async (req: Request, res: Response) => {
  try {
    console.log(req.params.id); // Corrected statement
    const objectId = new ObjectId(req.params.id); // Convert to ObjectId
    console.log(objectId); // Log the converted ObjectId

    const result = await collections?.carBrands?.deleteOne({ _id: objectId })
    return res.status(201).send({ status: 201, message: `Delete Brand is done with ${req.params.id}` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
});
carBrandsRouter.put("/updateBrand", async (req: Request, res: Response) => {
  try {
    const { name, status, slag, createdDate, updatedDate, _id } = req.body;
    console.log(req.params.id); // Corrected statement
    const objectId = new ObjectId(_id); // Convert to ObjectId
    console.log(objectId); // Log the converted ObjectId
    const date = new Date(); // Note: Months are zero-based (8 represents September)

    const formattedDate = format(date, 'dd/MM/yyyy');

    const result = await collections?.carBrands?.updateOne({ _id: objectId }, { $set: { name: name, status: status, slag: slag, createdDate: createdDate, updatedDate: formattedDate } })
    return res.status(201).send({ status: 201, message: `Update Brand done with ${req.params.id}` });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
});

carBrandsRouter.get("/getAllBrands", async (req: Request, res: Response) => {
  try {


    // Save the new user to the database
    const result = await collections?.carBrands?.find({}).toArray()
    if (result) {
      return res.status(201).send({ status: 201, message: "getAllBrands sucessfully", data: result });
    }
    else {
      return res.status(400).send({ status: 400, message: "No data found", data: {} });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).send((error as Error).message); // Respond with the error message from the validation
  }
});
