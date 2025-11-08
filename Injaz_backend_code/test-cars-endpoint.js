// Test script to verify the cars API endpoint
const http = require('http');

const BASE_URL = 'http://localhost:4001';

console.log('🔍 Testing Cars API Endpoints...\n');

// Test 1: Server health check
function testServerHealth() {
  return new Promise((resolve, reject) => {
    console.log('1. Testing server health...');
    http.get(`${BASE_URL}/`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('   ✅ Server is running');
          console.log('   Response:', JSON.parse(data).message);
          resolve(true);
        } else {
          console.log('   ❌ Server responded with status:', res.statusCode);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('   ❌ Cannot connect to server:', err.message);
      console.log('   💡 Make sure the server is running with: npm start\n');
      reject(err);
    });
  });
}

// Test 2: Get all cars
function testGetAllCars() {
  return new Promise((resolve, reject) => {
    console.log('\n2. Testing GET /user/getAllCars...');
    http.get(`${BASE_URL}/user/getAllCars`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('   ✅ Endpoint is working');
            console.log('   Cars found:', response.data?.length || 0);
            if (response.data && response.data.length > 0) {
              console.log('   Sample car:', {
                name: response.data[0].name,
                brand: response.data[0].brand,
                model: response.data[0].model,
                category: response.data[0].category
              });
            } else {
              console.log('   ⚠️  No cars in database. Add some cars to see them in frontend.');
            }
            resolve(true);
          } else {
            console.log('   ❌ Error:', res.statusCode);
            console.log('   Response:', response);
            resolve(false);
          }
        } catch (err) {
          console.log('   ❌ Invalid JSON response');
          console.log('   Raw response:', data);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('   ❌ Request failed:', err.message);
      reject(err);
    });
  });
}

// Test 3: Dashboard stats
function testDashboard() {
  return new Promise((resolve, reject) => {
    console.log('\n3. Testing GET /user/dashBoard...');
    http.get(`${BASE_URL}/user/dashBoard`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('   ✅ Dashboard endpoint working');
            console.log('   Stats:', {
              totalCars: response.data?.totalCars || 0,
              totalBrands: response.data?.totalBrands || 0,
              totalCategories: response.data?.totalCategoryes || 0,
              totalLocations: response.data?.totalLocation || 0
            });
            resolve(true);
          } else {
            console.log('   ❌ Error:', res.statusCode);
            resolve(false);
          }
        } catch (err) {
          console.log('   ❌ Invalid JSON response');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('   ❌ Request failed:', err.message);
      reject(err);
    });
  });
}

// Test 4: Test with filters
function testWithFilters() {
  return new Promise((resolve, reject) => {
    console.log('\n4. Testing GET /user/getAllCars with query parameters...');
    http.get(`${BASE_URL}/user/getAllCars?pageNumber=1`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const response = JSON.parse(data);
          if (res.statusCode === 200) {
            console.log('   ✅ Pagination working');
            console.log('   Page 1 cars:', response.data?.length || 0);
            resolve(true);
          } else {
            console.log('   ❌ Error:', res.statusCode);
            resolve(false);
          }
        } catch (err) {
          console.log('   ❌ Invalid JSON response');
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('   ❌ Request failed:', err.message);
      reject(err);
    });
  });
}

// Run all tests
async function runTests() {
  console.log('='.repeat(60));
  console.log('Cars API Endpoint Tests');
  console.log('='.repeat(60));
  
  try {
    await testServerHealth();
    await testGetAllCars();
    await testDashboard();
    await testWithFilters();
    
    console.log('\n' + '='.repeat(60));
    console.log('✨ All tests completed!');
    console.log('='.repeat(60));
    console.log('\n📝 Next Steps:');
    console.log('   1. If all tests pass ✅, your backend is working correctly');
    console.log('   2. Check your frontend is calling: http://localhost:4001/user/getAllCars');
    console.log('   3. Verify CORS settings if frontend is on different domain');
    console.log('   4. Check browser console for any frontend errors\n');
  } catch (err) {
    console.log('\n❌ Tests failed. Please check:');
    console.log('   1. Is the .env file created with correct values?');
    console.log('   2. Is MongoDB running and accessible?');
    console.log('   3. Is the server started with: npm start?');
    console.log('   4. Check servicepr-admin.log for errors\n');
  }
}

// Run the tests
runTests();
