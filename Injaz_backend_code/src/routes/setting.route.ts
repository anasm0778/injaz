import * as express from 'express';
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import { format } from "date-fns";

export const SettingsRouter = express.Router();

SettingsRouter.use(express.json());

// Create a new settings entry
SettingsRouter.post('/createsettings', async (req: Request, res: Response) => {
    try {
        const { phoneNumber, email, whatsappNumber } = req.body;

        const date = new Date();
        const formattedDate = format(date, 'dd/MM/yyyy');

        const result = await collections?.settings?.insertOne({ phoneNumber, email, whatsappNumber, createdDate: formattedDate, updatedDate: formattedDate });

        if (result) {
            return res.status(201).send({ status: 201,result: result, message: 'Settings added successfully.' });
        } else {
            return res.status(500).send({ status: 500, message: 'Failed to add settings.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(400).send((error as Error).message);
    }
});

// Get all settings
SettingsRouter.get('/getAllsettings', async (req: Request, res: Response) => {
    try {
        const result = await collections?.settings?.find({}).toArray();

        if (result) {
            return res.status(200).send({ status: 200,result: result, message: "All settings retrieved successfully", data: result });
        } else {
            return res.status(400).send({ status: 400, message: "No settings found", data: [] });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Internal server error" });
    }
});

// Get settings by ID
SettingsRouter.get('/getSettings/:id', async (req: Request, res: Response) => {
    try {
        const objectId = new ObjectId(req.params.id);
        const result = await collections?.settings?.findOne({ _id: objectId });

        if (result) {
            return res.status(200).send({ status: 200,result: result, message: "Settings retrieved successfully", data: result });
        } else {
            return res.status(400).send({ status: 400, message: "Settings not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Internal server error" });
    }
});

// Update settings by ID
SettingsRouter.put('/updateSettings/:id', async (req: Request, res: Response) => {
    try {
        const { phoneNumber, email, whatsappNumber } = req.body;
        const objectId = new ObjectId(req.params.id);
        const date = new Date();
        const formattedDate = format(date, 'dd/MM/yyyy');

        const result = await collections?.settings?.updateOne({ _id: objectId }, { $set: { phoneNumber, email, whatsappNumber, updatedDate: formattedDate } });

        if (result.modifiedCount !== 0) {
            return res.status(200).send({ status: 200,result: result, message: `Settings updated successfully for id ${req.params.id}` });
        } else {
            return res.status(400).send({ status: 400, message: "Settings not found or no changes made" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Internal server error" });
    }
});

// Delete settings by ID
SettingsRouter.delete('/deleteSettings/:id', async (req: Request, res: Response) => {
    try {
        const objectId = new ObjectId(req.params.id);
        const result = await collections?.settings?.deleteOne({ _id: objectId });

        if (result.deletedCount !== 0) {
            return res.status(200).send({ status: 200,result: result, message: `Settings deleted successfully for id ${req.params.id}` });
        } else {
            return res.status(400).send({ status: 400, message: "Settings not found" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: 500, message: "Internal server error" });
    }
});
