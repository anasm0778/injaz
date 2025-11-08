import { collections } from './../services/database.service';
// routes/cars.ts
import express from 'express';
import { Car, CarModelNew } from '../models/Cars';
import upload from '../middlewares/multer';
import path from 'path';

const router = express.Router();

// Create (POST) a new car
router.post('/', upload.array('images'), async (req, res) => {
  try {
    if (!collections?.CarModelNew) {
      return res.status(500).json({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const images: Car['images'] = [];
    console.log('files--->',req.files)
    if (Array.isArray(req.files)) {
        images.push(...(req.files as unknown as File[]).map((file) => ({ url: `./uploads/${file.name}` })));
      }
    const newCar: Car = {
      name: req.body.name,
      brand: req.body.brand,
      location: req.body.location,
      price: req.body.price,
      images,
      specifications: req.body.specifications ? JSON.parse(req.body.specifications) : [], // Parse JSON for specifications
    };

    

    const car = await collections.CarModelNew.insertOne(newCar);
   console.log({newCar})
   res.status(201).json(car);
} catch (error) {
  console.error(error);
  res.status(500).json({ 
    status: 500,
    message: 'Error creating car',
    error: (error as Error).message 
  });
}
});

// Read (GET) all cars
router.get('/', async (req, res) => {
try {
  if (!collections?.CarModelNew) {
    return res.status(500).json({ 
      status: 500, 
      message: 'Database not initialized' 
    });
  }

  const cars = await collections.CarModelNew.find({}).toArray();

  res.json(cars);
} catch (error) {
  console.error(error);
  res.status(500).json({ 
    status: 500,
    message: 'Error fetching cars',
    error: (error as Error).message 
  });
}
});

// Read (GET) a car by ID
router.get('/:id', async (req, res) => {
try {
  if (!collections?.CarModelNew) {
    return res.status(500).json({ 
      status: 500, 
      message: 'Database not initialized' 
    });
  }

  const id = req.body.id
  // const { filename } = req.body;
  // console.log({filename})
  // const imagePath = path.join(__dirname, '../../uploads/', filename);
  // console.log({imagePath})
  // res.sendFile(imagePath);
  const car = await collections.CarModelNew.findOne({_id: id});
  if (!car) {
    return res.status(404).json({ message: 'THe Car not found' });
  }
  res.json(car);

} catch (error) {
  console.error(error);
  res.status(500).json({ 
    status: 500,
    message: 'Error fetching car',
    error: (error as Error).message 
  });
}
});

// Update (PUT) a car by ID
router.put('/:id', upload.array('images'), async (req, res) => {
try {
  const updates = req.body;
  if (Array.isArray(req.files)) {
    const images: Car['images'] = [];
    images.push(...(req.files as unknown as File[]).map((file) => ({ url: `uploads/${file.name}`, public_id: file.name }))); // Adjust property name based on multer // eslint-disable-line , 
  }
  


  const car = await CarModelNew.findByIdAndUpdate(req.params.id, updates, { new: true });
  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }
  res.json(car);
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error updating car' });
}
});

// Delete (DELETE) a car by ID
router.delete('/:id', async (req, res) => {
try {
  const car = await CarModelNew.findByIdAndDelete(req.params.id);
  if (!car) {
    return res.status(404).json({ message: 'Car not found' });
  }
  res.json({ message: 'Car deleted' });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error deleting car' });
}
});


router.get('/images/images', async (req, res) => {
  try {
    if (!collections?.CarModelNew) {
      return res.status(500).json({ 
        status: 500, 
        message: 'Database not initialized' 
      });
    }

    const cars = await collections.CarModelNew.find({}).toArray();

    const carsWithImages = cars?.map(car => {
      const imageUrls = car.images.map(filename => `/uploads/${filename}`); 

      return {
        ...car, 
        images: imageUrls 
      };
    });
    res.json(carsWithImages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      status: 500,
      message: 'Error fetching cars',
      error: (error as Error).message 
    });
  }
});


export default router;

