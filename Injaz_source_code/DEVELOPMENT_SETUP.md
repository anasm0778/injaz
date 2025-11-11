# Environment Configuration for Injaz Rent A Car

## Local Development Setup

### Backend (Port 4000)
```bash
cd "E:\zz new work\injaz_backend_code"
npm start
```

### Frontend (Port 3000)
```bash
cd "E:\zz new work\injaz_source_code"
npm run dev
```

### Access URLs:
- **Frontend**: http://localhost:3000/en/
- **Admin Panel**: http://localhost:3000/en/pages/adminPage/
- **Backend API**: http://localhost:4000

### API Configuration:
The frontend automatically detects localhost and uses `http://localhost:4000` for API calls.
For production, it will use `https://injazrent.ae/api`.

## Production Deployment

### Environment Variables:
- `NEXT_PUBLIC_API_URL=https://injazrent.ae/api`
- `NEXT_PUBLIC_ENVIRONMENT=production`

### Manual Override (if needed):
Edit `src/utils/helper.js` and uncomment the desired line:
```javascript
// export const serverUrl = "http://localhost:4000";  // Local development
// export const serverUrl = "https://injazrent.ae/api"; // Production
```

## Testing Car Update Functionality

1. **Start both servers** (backend on :4000, frontend on :3000)
2. **Navigate to**: http://localhost:3000/en/pages/adminPage/
3. **Login** with admin credentials
4. **Go to Cars section**
5. **Click edit** on any car
6. **Update car details** and submit
7. **Verify** the update works without errors

## Current Status:
✅ Backend running on port 4000
✅ Frontend running on port 3000  
✅ CORS configured for PATCH requests
✅ updateCar endpoint working
✅ Frontend configured for local development
✅ Ready for production deployment
