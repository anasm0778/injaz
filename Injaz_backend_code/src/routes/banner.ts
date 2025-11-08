import express, { Request, Response } from 'express';
import multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { collections } from '../services/database.service';
import { ObjectId } from 'mongodb';

export const bannersRouter = express.Router();

bannersRouter.use(express.json());

// Multer configuration for handling file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../public/banners');
        fs.mkdirSync(uploadPath, { recursive: true }); // Ensure the upload directory exists
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate unique filename with timestamp
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + ext);
    }
});

const upload = multer({ 
    storage: storage,
    limits: {
        fileSize: 50 * 1024 * 1024, // 50MB limit (matches body-parser)
    },
    fileFilter: (req, file, cb) => {
        // Check file type
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

// Get all banners
bannersRouter.get('/getBanners', async (req: Request, res: Response) => {
    try {
        const banners = await collections?.banners?.find({}).toArray();
        
        // Transform banners to match frontend expectations
        const transformedBanners = banners?.map(banner => ({
            id: banner._id.toString(),
            name: banner.name || `Banner ${banner._id}`,
            imageUrl: banner.imageUrl || banner.url || `/banners/${banner.filename}`,
            altText: banner.altText || '',
            isActive: banner.isActive !== undefined ? banner.isActive : true,
            displayOrder: banner.displayOrder || 0,
            createdAt: banner.createdAt,
            updatedAt: banner.updatedAt
        })) || [];
        
        return res.status(200).send({ 
            status: 200, 
            message: 'Banners retrieved successfully', 
            data: transformedBanners 
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ 
            status: 500, 
            message: 'Failed to retrieve banners' 
        });
    }
});

// Create a new banner
bannersRouter.post('/createBanner', (req: Request, res: Response) => {
    upload.single('image')(req, res, async (err) => {
        if (err) {
            console.error('Multer error:', err);
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(400).send({
                    status: 400,
                    message: 'File too large. Maximum size is 50MB.'
                });
            }
            return res.status(400).send({
                status: 400,
                message: err.message || 'File upload error'
            });
        }
        
        try {
            const { name, altText, isActive, displayOrder } = req.body;
        
        if (!req.file) {
            return res.status(400).send({ 
                status: 400, 
                message: 'Image is required' 
            });
        }

        console.log('Uploaded file details:', {
            filename: req.file.filename,
            size: req.file.size,
            mimetype: req.file.mimetype
        });

        // Generate image URL
        const imageUrl = `/banners/${req.file.filename}`;
        
        // Create banner object - make text fields optional
        const bannerData = {
            name: name?.trim() || `Banner ${Date.now()}`,
            imageUrl,
            altText: altText?.trim() || '',
            isActive: isActive === 'true' || isActive === true || true, // Default to active
            displayOrder: parseInt(displayOrder) || 0,
            createdAt: new Date(),
            updatedAt: new Date()
        };

        // Save to database
        const result = await collections?.banners?.insertOne(bannerData);

        if (result) {
            return res.status(201).send({ 
                status: 201, 
                message: 'Banner created successfully',
                data: { id: result.insertedId, ...bannerData }
            });
        } else {
            return res.status(500).send({ 
                status: 500, 
                message: 'Failed to create banner' 
            });
        }
        } catch (error) {
            console.error(error);
            return res.status(400).send({ 
                status: 400, 
                message: (error as Error).message || 'Failed to create banner' 
            });
        }
    });
});

// Update banner by ID
bannersRouter.put('/updateBanner/:id', upload.single('image'), async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, altText, isActive, displayOrder } = req.body;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ 
                status: 400, 
                message: 'Invalid banner ID' 
            });
        }

        const updateData: any = {
            updatedAt: new Date()
        };

        if (name) updateData.name = name.trim();
        if (altText !== undefined) updateData.altText = altText.trim();
        if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;
        if (displayOrder !== undefined) updateData.displayOrder = parseInt(displayOrder) || 0;

        // If new image is uploaded, update image URL and delete old image
        if (req.file) {
            const banner = await collections?.banners?.findOne({ _id: new ObjectId(id) });
            if (banner && banner.imageUrl) {
                // Delete old image file
                try {
                    const oldImagePath = path.join(__dirname, '../public', banner.imageUrl);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                } catch (unlinkError) {
                    console.error(`Error deleting old banner image:`, unlinkError);
                    // Don't throw, just log - old file cleanup failure shouldn't prevent update
                }
            }
            updateData.imageUrl = `/banners/${req.file.filename}`;
        }

        const result = await collections?.banners?.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );

        if (result.modifiedCount !== 0) {
            return res.status(200).send({ 
                status: 200, 
                message: 'Banner updated successfully' 
            });
        } else {
            return res.status(404).send({ 
                status: 404, 
                message: 'Banner not found or no changes made' 
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ 
            status: 500, 
            message: 'Failed to update banner' 
        });
    }
});

// Delete banner by ID
bannersRouter.delete('/deleteBanner/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ 
                status: 400, 
                message: 'Invalid banner ID' 
            });
        }

        // Get banner to delete associated image file
        const banner = await collections?.banners?.findOne({ _id: new ObjectId(id) });
        
        const result = await collections?.banners?.deleteOne({ _id: new ObjectId(id) });
        
        if (result.deletedCount !== 0) {
            // Delete associated image file
            if (banner && banner.imageUrl) {
                try {
                    const imagePath = path.join(__dirname, '../public', banner.imageUrl);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                } catch (unlinkError) {
                    console.error(`Error deleting banner image file:`, unlinkError);
                    // Don't throw, just log - file cleanup failure shouldn't prevent deletion from DB
                }
            }
            
            return res.status(200).send({ 
                status: 200, 
                message: 'Banner deleted successfully' 
            });
        } else {
            return res.status(404).send({ 
                status: 404, 
                message: 'Banner not found' 
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ 
            status: 500, 
            message: 'Failed to delete banner' 
        });
    }
});

// Get banner by ID
bannersRouter.get('/getBanner/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        
        if (!ObjectId.isValid(id)) {
            return res.status(400).send({ 
                status: 400, 
                message: 'Invalid banner ID' 
            });
        }

        const banner = await collections?.banners?.findOne({ _id: new ObjectId(id) });
        
        if (banner) {
            return res.status(200).send({ 
                status: 200, 
                message: 'Banner retrieved successfully', 
                data: banner 
            });
        } else {
            return res.status(404).send({ 
                status: 404, 
                message: 'Banner not found' 
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({ 
            status: 500, 
            message: 'Failed to retrieve banner' 
        });
    }
});

// Legacy upload endpoint (kept for backward compatibility)
bannersRouter.post('/upload', upload.array('files'), async (req, res) => {
  try {
    // Handle the uploaded files
    const files: Express.Multer.File[] = req.files as Express.Multer.File[];

    if (!files || files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    // Process and store the files as required
    const errors = [];
    for (const file of files) {
      const filePath = `uploads/${file.filename}`;
      try {
        await fs.promises.rename(file.path, filePath);
      } catch (err) {
        console.error(`Error moving file ${file.filename}:`, err);
        errors.push(file.filename);
      }
    }

    if (errors.length > 0) {
      return res.status(500).json({ 
        error: 'Failed to store some files',
        failedFiles: errors 
      });
    }

    // Send an appropriate response to the client
    res.status(200).json({ message: 'File upload successful' });
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'File upload failed',
      message: (error as Error).message 
    });
  }
});

// // Create a new banner with multiple images
// bannersRouter.post('/addBanner', upload.array('bannerImages'), async (req: Request, res: Response) => {
//     try {
//         const { title, description } = req.body;
        
//         // Extract uploaded files
//         const imagePaths: string[] = req.files.map((file: Express.Multer.File) => file.path);

//         // Save banner details to the database
//         const result = await collections?.banners?.insertOne({ title, description, imagePaths });

//         if (result) {
//             return res.status(200).send({ status: 200, message: 'Banner added successfully' });
//         } else {
//             return res.status(500).send({ status: 500, message: 'Failed to add banner' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(400).send({ status: 400, message: error.message });
//     }
// });


// // Get all banners
// bannersRouter.get('/getAllBanners', async (req: Request, res: Response) => {
//     try {
//         const banners = await collections?.banners?.find({}).toArray();
//         return res.status(200).send({ status: 200, message: 'Banners retrieved successfully', data: banners });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ status: 500, message: 'Failed to retrieve banners' });
//     }
// });

// // Get banner by ID
// bannersRouter.get('/getBanner/:id', async (req: Request, res: Response) => {
//     try {
//         const banner = await collections?.banners?.findOne({ _id: req.params.id });
//         if (banner) {
//             return res.status(200).send({ status: 200, message: 'Banner retrieved successfully', data: banner });
//         } else {
//             return res.status(404).send({ status: 404, message: 'Banner not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ status: 500, message: 'Failed to retrieve banner' });
//     }
// });

// // Update banner by ID
// bannersRouter.put('/updateBanner/:id', async (req: Request, res: Response) => {
//     try {
//         const { title, description } = req.body;
//         const result = await collections?.banners?.updateOne(
//             { _id: req.params.id },
//             { $set: { title, description } }
//         );
//         if (result.modifiedCount !== 0) {
//             return res.status(200).send({ status: 200, message: 'Banner updated successfully' });
//         } else {
//             return res.status(404).send({ status: 404, message: 'Banner not found or no changes made' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ status: 500, message: 'Failed to update banner' });
//     }
// });

// // Delete banner by ID
// bannersRouter.delete('/deleteBanner/:id', async (req: Request, res: Response) => {
//     try {
//         const result = await collections?.banners?.deleteOne({ _id: req.params.id });
//         if (result.deletedCount !== 0) {
//             return res.status(200).send({ status: 200, message: 'Banner deleted successfully' });
//         } else {
//             return res.status(404).send({ status: 404, message: 'Banner not found' });
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send({ status: 500, message: 'Failed to delete banner' });
//     }
// });
