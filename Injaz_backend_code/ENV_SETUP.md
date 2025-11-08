# Environment Variables Setup

Create a `.env` file in the root directory with the following variables:

## Required Environment Variables

```env
# Database Configuration (REQUIRED)
DB_CONN_STRING=mongodb://localhost:27017
DB_NAME=your_database_name

# Collections (REQUIRED)
USERS=users
TOKEN=tokens
CAR_IMAGES=carImages
DRIVER_COLLECTION_NAME=drivers
NEW_LIST=newList
CAR_INQUIRY=carInquiry
CAR_CATEGORYES=carCategory
CAR_BRNDS=carBrands
CAR_DATA=carData
CAR_MODEL=carModel
CAR_FEATURES=carFeatures
CAR_SERVICES=carServices
CAR_ENGINE=carEngineCapacities
CAR_DOCUMENT=carDocuments
CAR_LOCATION=carLocation
CAR_FAQS=carFAQs
CONTACT_INFO=contactInfo
TRADE_LICENCE=tradeLicence
CORPORATE_VIDEO=corporateVideo
ADD_CHARGES=addCharges
ADD_DELIVERY_OPTIONS=addDeliveryOptions
SETTINGS=settings
BANNERS=banners
CARMODELNEW=CarModelNew

# Server Configuration (Optional)
PORT=4001
NODE_ENV=development

# JWT Configuration (REQUIRED for auth)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Email Configuration (REQUIRED for email features)
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=587
EMAIL_USER=info@logicrent.ae
EMAIL_PASS=your-email-password
```

## Notes

- **DB_CONN_STRING** and **DB_NAME** are critical and must be set for the server to start
- All collection names should match your MongoDB collections
- Change **JWT_SECRET** to a strong, random secret in production
- Update email credentials with your actual SMTP credentials

