# Landing Page Banner Management System

## Overview
This system allows administrators to manage banner images that appear on the landing page carousel. The banners are stored in a database and can be dynamically controlled through the admin panel.

## Features

### Admin Panel Features
- **Create New Banners**: Upload new banner images with metadata
- **Edit Existing Banners**: Modify banner name, alt text, display order, and image
- **Delete Banners**: Remove banners from the system
- **Toggle Active Status**: Show/hide banners without deleting them
- **Display Order Management**: Control the order in which banners appear
- **Real-time Preview**: See banner previews before saving

### Frontend Features
- **Dynamic Loading**: Banners are fetched from the database
- **Fallback Support**: If API fails, falls back to default banner
- **Active Banner Filtering**: Only active banners are displayed
- **Ordered Display**: Banners appear in the specified display order

## File Structure

### Admin Components
```
src/app/adminpage/pages/adminSettings/landingPageBanners/
├── LandingPageBanners.tsx          # Main admin component
└── [locale]/pages/adminLandingPageBanners/
    └── page.tsx                   # Page wrapper
```

### Frontend Components
```
src/app/user/landing_page/car_slider/
└── HeroSlider.tsx                 # Updated to fetch from API
```

## API Endpoints

The system expects the following API endpoints to be implemented:

### GET `/admin/getBanners`
- **Purpose**: Fetch all banners
- **Response**: Array of banner objects
- **Example Response**:
```json
{
  "data": [
    {
      "id": "1",
      "name": "Teacher Special Offer",
      "imageUrl": "/uploads/banner1.jpg",
      "altText": "Back to School Special Offers for Teachers",
      "isActive": true,
      "displayOrder": 1,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

### POST `/admin/createBanner`
- **Purpose**: Create a new banner
- **Content-Type**: `multipart/form-data`
- **Body**:
  - `name`: Banner name (string)
  - `altText`: Alt text for accessibility (string)
  - `isActive`: Active status (boolean)
  - `displayOrder`: Display order (number)
  - `image`: Image file

### PUT `/admin/updateBanner/:id`
- **Purpose**: Update an existing banner
- **Content-Type**: `multipart/form-data`
- **Body**: Same as create, but image is optional

### DELETE `/admin/deleteBanner/:id`
- **Purpose**: Delete a banner
- **Parameters**: Banner ID in URL

## Database Schema

The banner table should have the following structure:

```sql
CREATE TABLE banners (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  imageUrl VARCHAR(500) NOT NULL,
  altText TEXT,
  isActive BOOLEAN DEFAULT true,
  displayOrder INT DEFAULT 0,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Usage

### For Administrators
1. Navigate to Admin Panel → Web Settings → Landing Page Banners
2. Click "Add New Banner" to upload a new banner
3. Fill in the banner details:
   - **Name**: Descriptive name for the banner
   - **Alt Text**: Accessibility text for screen readers
   - **Display Order**: Number to control banner sequence
   - **Image**: Upload banner image file
4. Click "Save" to create the banner
5. Use "Edit", "Show/Hide", or "Delete" buttons to manage existing banners

### For Developers
The system automatically:
- Fetches active banners on page load
- Sorts banners by display order
- Handles API failures gracefully
- Provides loading states and error handling

## Setup Instructions

### Backend Setup

1. **Database Initialization**:
   ```bash
   cd injaz_backend_code
   npx ts-node src/scripts/initBanners.ts
   ```

2. **Migrate Existing Banners**:
   ```bash
   node migrate-banners.js
   ```

3. **Start Backend Server**:
   ```bash
   npm start
   ```

### Frontend Setup

The frontend components are already updated and ready to use:

1. **Admin Panel**: Navigate to `/pages/adminLandingPageBanners`
2. **Landing Page**: Banners will automatically load from the database

### Environment Variables

Ensure these environment variables are set in your `.env` file:

```env
DB_CONN_STRING=mongodb://localhost:27017
DB_NAME=your_database_name
BANNERS=banners
```

## Migration from Static Banners

The migration is automated! Simply run:

```bash
cd injaz_backend_code
node migrate-banners.js
```

This will:
1. ✅ Check if banners collection exists
2. ✅ Create the collection if needed
3. ✅ Import all existing static banners
4. ✅ Set proper display order and metadata

## Image Requirements

- **Format**: JPG, PNG, WebP recommended
- **Size**: Optimize for web (recommended max width: 1920px)
- **Aspect Ratio**: Maintain consistent aspect ratios for better carousel experience
- **File Size**: Keep under 2MB for better performance

## Security Considerations

- **File Upload Validation**: Implement proper file type and size validation
- **Image Processing**: Consider image optimization and resizing
- **Access Control**: Ensure only authenticated admins can manage banners
- **SQL Injection**: Use parameterized queries for database operations

## Troubleshooting

### Common Issues
1. **Banners not loading**: Check API endpoint and database connection
2. **Upload failures**: Verify file size limits and image format
3. **Order not working**: Ensure displayOrder field is properly set
4. **Images not displaying**: Check image URL paths and file permissions

### Debug Steps
1. Check browser console for API errors
2. Verify database connection and table structure
3. Test API endpoints with tools like Postman
4. Check file upload permissions and storage paths
