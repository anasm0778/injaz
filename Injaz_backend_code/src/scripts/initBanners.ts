import { MongoClient } from 'mongodb';
import * as dotenv from 'dotenv';

dotenv.config();

const initializeBannersCollection = async () => {
    const client = new MongoClient(process.env.DB_CONN_STRING!);
    
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        
        // Create banners collection if it doesn't exist
        const collections = await db.listCollections({ name: process.env.BANNERS }).toArray();
        
        if (collections.length === 0) {
            await db.createCollection(process.env.BANNERS!);
            console.log(`Created ${process.env.BANNERS} collection`);
        } else {
            console.log(`${process.env.BANNERS} collection already exists`);
        }
        
        // Create indexes for better performance
        const bannersCollection = db.collection(process.env.BANNERS!);
        
        // Create index on displayOrder for sorting
        await bannersCollection.createIndex({ displayOrder: 1 });
        
        // Create index on isActive for filtering
        await bannersCollection.createIndex({ isActive: 1 });
        
        console.log('Banner collection initialized with indexes');
        
    } catch (error) {
        console.error('Initialization failed:', error);
    } finally {
        await client.close();
    }
};

// Run initialization if this file is executed directly
if (require.main === module) {
    initializeBannersCollection()
        .then(() => {
            console.log('Database initialization completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Database initialization failed:', error);
            process.exit(1);
        });
}

export { initializeBannersCollection };
