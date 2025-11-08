import { MongoClient, ObjectId } from 'mongodb';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

dotenv.config();

interface BannerData {
    name: string;
    imageUrl: string;
    altText: string;
    isActive: boolean;
    displayOrder: number;
    createdAt: Date;
    updatedAt: Date;
}

const migrateStaticBanners = async () => {
    const client = new MongoClient(process.env.DB_CONN_STRING!);
    
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME);
        const bannersCollection = db.collection(process.env.BANNERS!);
        
        // Static banners data (matching the existing HeroSlider imports)
        const staticBanners: BannerData[] = [
            {
                name: "Main Banner",
                imageUrl: "/banner-injaz-1.jpg",
                altText: "Injaz Rent A Car Main Banner",
                isActive: true,
                displayOrder: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Saudi National Day 1",
                imageUrl: "/INJAZ SAUDI NATIONAL DAY 1.webp",
                altText: "Saudi National Day Special Offer",
                isActive: true,
                displayOrder: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Saudi National Day 2",
                imageUrl: "/saudi national day 2.webp",
                altText: "Saudi National Day Special Offer 2",
                isActive: true,
                displayOrder: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Teacher Special Offer 1",
                imageUrl: "/teacher1.webp",
                altText: "Back to School Special Offers for Teachers",
                isActive: true,
                displayOrder: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Teacher Special Offer 2",
                imageUrl: "/teacher2.webp",
                altText: "Back to School Special Offers for Teachers 2",
                isActive: true,
                displayOrder: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Price Drop Banner",
                imageUrl: "/inajz price drop banner 06 06 2024 copy.webp",
                altText: "Special Price Drop Offer",
                isActive: true,
                displayOrder: 6,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "New Banner 1",
                imageUrl: "/new inajz banner 16 05 copy.webp",
                altText: "New Special Offer Banner",
                isActive: true,
                displayOrder: 7,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Sunny Banner",
                imageUrl: "/new sunny inajz banner 16 05 copy.webp",
                altText: "Nissan Sunny Special Offer",
                isActive: true,
                displayOrder: 8,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Latest Banner",
                imageUrl: "/injaz new banner.webp",
                altText: "Latest Special Offer Banner",
                isActive: true,
                displayOrder: 9,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ];
        
        // Check if banners already exist
        const existingBanners = await bannersCollection.countDocuments();
        
        if (existingBanners > 0) {
            console.log(`Found ${existingBanners} existing banners. Skipping migration.`);
            return;
        }
        
        // Insert static banners
        const result = await bannersCollection.insertMany(staticBanners);
        
        console.log(`Successfully migrated ${result.insertedCount} banners to database`);
        console.log('Banner IDs:', Object.values(result.insertedIds));
        
    } catch (error) {
        console.error('Migration failed:', error);
    } finally {
        await client.close();
    }
};

// Run migration if this file is executed directly
if (require.main === module) {
    migrateStaticBanners()
        .then(() => {
            console.log('Migration completed');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Migration failed:', error);
            process.exit(1);
        });
}

export { migrateStaticBanners };
