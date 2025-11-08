# Production Deployment Configuration Changes

This document summarizes all changes made to configure this replica website for production deployment alongside another instance.

## 🎯 Changes Made

### 1. Backend Port Configuration
**Changed:** Default backend port from `4000` → `4001`

**Files Modified:**
- `src/server.ts` - Changed default port from `4000` to `4001`
- `test-cars-endpoint.js` - Updated test URLs to use port 4001
- `test-banner-api.js` - Updated test URLs to use port 4001
- `ENV_SETUP.md` - Updated documentation
- `QUICK_START_AFTER_FIXES.md` - Updated documentation
- `README_CRASH_FIXES.md` - Updated documentation

**Impact:** Backend will now run on port 4001 by default (can be overridden with `PORT` environment variable)

---

### 2. Frontend Port Configuration
**Status:** Already configured ✅

**Files:**
- `src/server.ts` - CORS already includes `http://localhost:3001`

**Note:** Frontend should be configured to run on port 3001. The backend CORS settings already allow connections from this port.

---

### 3. Log File Configuration
**Changed:** Log filename from `servicepr-admin.log` → `injaz-admin.log`

**Files Modified:**
- `src/server.ts` - Changed log4js configuration to use `injaz-admin.log`
- `QUICK_START_AFTER_FIXES.md` - Updated documentation
- `README_CRASH_FIXES.md` - Updated documentation
- `CRASH_FIXES_APPLIED.md` - Updated documentation

**Impact:** Each instance will have its own log file, preventing conflicts

---

### 4. JWT Secret Configuration
**Changed:** Hardcoded JWT secret → Environment variable

**Files Modified:**
- `src/config/passport.ts` - Now uses `process.env.JWT_SECRET` instead of hardcoded value

**Impact:** Each instance can use a different JWT secret via `.env` file, preventing token conflicts

---

### 5. Excel Router Fix
**Changed:** Removed standalone Express server on port 3000

**Files Modified:**
- `src/routes/excel.router.ts` - Converted from standalone server to Express router

**Impact:** Eliminates port conflict on port 3000. Router can be mounted on main server if needed.

---

## 📋 Required Environment Variables

To avoid conflicts with the other instance, ensure your `.env` file has unique values:

```env
# Backend Port (already defaults to 4001)
PORT=4001

# Database Configuration - USE A DIFFERENT DATABASE NAME
DB_CONN_STRING=mongodb://localhost:27017
DB_NAME=injaz_database  # ⚠️ CHANGE THIS - Use different name than other instance

# JWT Secret - USE A DIFFERENT SECRET
JWT_SECRET=your-unique-jwt-secret-for-injaz  # ⚠️ CHANGE THIS - Use different secret than other instance

# Frontend URL (if different)
FRONTEND_URL=http://localhost:3001
```

## ⚠️ Critical Configuration for Production

### 1. Database Name
**IMPORTANT:** Use a **different database name** in `DB_NAME` environment variable to avoid data conflicts.

Example:
- Original instance: `DB_NAME=logicrent_db`
- This instance: `DB_NAME=injaz_db`

### 2. JWT Secret
**IMPORTANT:** Use a **different JWT_SECRET** to prevent token conflicts between instances.

### 3. Log Files
✅ Already handled - Each instance uses `injaz-admin.log` (this instance) vs `servicepr-admin.log` (other instance)

### 4. Ports
✅ Already handled:
- Backend: Port 4001 (this instance) vs 4000 (other instance)
- Frontend: Port 3001 (this instance) vs 3000 (other instance)

### 5. File Upload Directories
**Note:** Both instances may share the same upload directories. If you want separate directories, you can:
- Use different base paths in multer configuration
- Or ensure file naming includes instance identifier

## 🚀 Deployment Checklist

- [ ] Set `PORT=4001` in `.env` (or rely on default)
- [ ] Set unique `DB_NAME` in `.env`
- [ ] Set unique `JWT_SECRET` in `.env`
- [ ] Configure frontend to run on port 3001
- [ ] Update frontend API base URL to `http://localhost:4001` (or production backend URL)
- [ ] Verify CORS settings allow your frontend domain
- [ ] Test that both instances can run simultaneously
- [ ] Verify log files are separate (`injaz-admin.log` vs `servicepr-admin.log`)

## 🔍 Verification Steps

1. **Start both backends:**
   ```bash
   # Original instance (port 4000)
   cd original_backend
   npm start
   
   # This instance (port 4001)
   cd injaz_backend
   npm start
   ```

2. **Verify ports:**
   ```bash
   # Check if ports are listening
   netstat -ano | findstr :4000
   netstat -ano | findstr :4001
   ```

3. **Test endpoints:**
   ```bash
   # Original instance
   curl http://localhost:4000/
   
   # This instance
   curl http://localhost:4001/
   ```

4. **Check log files:**
   - Original: `servicepr-admin.log`
   - This instance: `injaz-admin.log`

## 📝 Summary

All conflicting parameters have been changed:
- ✅ Backend port: 4000 → 4001
- ✅ Frontend port: Already configured for 3001 in CORS
- ✅ Log file: servicepr-admin.log → injaz-admin.log
- ✅ JWT secret: Now uses environment variable (set unique value)
- ✅ Excel router: Removed port 3000 conflict
- ✅ Documentation: All updated

**Remaining manual steps:**
1. Set unique `DB_NAME` in `.env`
2. Set unique `JWT_SECRET` in `.env`
3. Configure frontend to use port 3001 and backend port 4001

---

**Last Updated:** Production deployment configuration changes
