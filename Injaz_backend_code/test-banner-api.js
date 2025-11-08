const axios = require('axios');

const BASE_URL = 'http://localhost:4001/admin';

const testBannerAPI = async () => {
    console.log('🧪 Testing Banner Management API...\n');
    
    try {
        // Test 1: Get all banners
        console.log('1️⃣ Testing GET /getBanners...');
        const getResponse = await axios.get(`${BASE_URL}/getBanners`);
        console.log(`✅ Status: ${getResponse.data.status}`);
        console.log(`📊 Found ${getResponse.data.data?.length || 0} banners\n`);
        
        // Test 2: Create a test banner (if you have a test image)
        console.log('2️⃣ Testing POST /createBanner...');
        console.log('ℹ️  This test requires a test image file. Skipping for now.\n');
        
        // Test 3: Get banner by ID (if banners exist)
        if (getResponse.data.data && getResponse.data.data.length > 0) {
            const firstBanner = getResponse.data.data[0];
            console.log('3️⃣ Testing GET /getBanner/:id...');
            const getByIdResponse = await axios.get(`${BASE_URL}/getBanner/${firstBanner._id}`);
            console.log(`✅ Status: ${getByIdResponse.data.status}`);
            console.log(`📝 Banner Name: ${getByIdResponse.data.data?.name}\n`);
        }
        
        console.log('🎉 All API tests completed successfully!');
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
        if (error.response) {
            console.error('📊 Response status:', error.response.status);
            console.error('📝 Response data:', error.response.data);
        }
    }
};

// Run tests
testBannerAPI();
