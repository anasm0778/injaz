#!/bin/bash

# Injaz Rent A Car - Environment Switcher
# This script helps you easily switch between local development and production environments

echo "🚗 Injaz Rent A Car - Environment Switcher"
echo "=========================================="

# Check if helper.js exists
if [ ! -f "src/utils/helper.js" ]; then
    echo "❌ Error: src/utils/helper.js not found!"
    echo "Please run this script from the frontend project root directory."
    exit 1
fi

echo ""
echo "Current configuration:"
echo "====================="

# Check current configuration
if grep -q "http://localhost:4000" src/utils/helper.js; then
    echo "📍 Current: LOCAL DEVELOPMENT (localhost:4000)"
elif grep -q "https://logicrent.ae/api" src/utils/helper.js; then
    echo "📍 Current: PRODUCTION (api.logicrent.ae)"
else
    echo "📍 Current: AUTO-DETECT (based on hostname)"
fi

echo ""
echo "Choose environment:"
echo "1) Local Development (localhost:4000)"
echo "2) Production (api.logicrent.ae)"
echo "3) Auto-detect (recommended)"
echo "4) Show current status"
echo "5) Exit"

read -p "Enter your choice (1-5): " choice

case $choice in
    1)
        echo "🔄 Switching to LOCAL DEVELOPMENT..."
        sed -i 's|export const serverUrl = .*|export const serverUrl = "http://localhost:4000";|' src/utils/helper.js
        echo "✅ Switched to LOCAL DEVELOPMENT"
        echo "📝 Make sure your backend is running on port 4000"
        ;;
    2)
        echo "🔄 Switching to PRODUCTION..."
        sed -i 's|export const serverUrl = .*|export const serverUrl = "https://logicrent.ae/api";|' src/utils/helper.js
        echo "✅ Switched to PRODUCTION"
        ;;
    3)
        echo "🔄 Switching to AUTO-DETECT..."
        cat > src/utils/helper.js << 'EOF'
// Environment-based API configuration
const getServerUrl = () => {
  // Check if we're in development mode
  if (typeof window !== 'undefined') {
    // Client-side: check if we're on localhost
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:4000';
    }
  }
  
  // Check environment variable (if available)
  if (typeof process !== 'undefined' && process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Default to production for server-side rendering
  return 'https://logicrent.ae/api';
};

export const serverUrl = getServerUrl();

// For easy switching during development, you can manually override:
// export const serverUrl = "http://localhost:4000";  // Local development
// export const serverUrl = "https://logicrent.ae/api"; // Production
EOF
        echo "✅ Switched to AUTO-DETECT"
        echo "📝 Will use localhost:4000 for local development and api.logicrent.ae for production"
        ;;
    4)
        echo ""
        echo "📊 Current Status:"
        echo "================="
        echo "Frontend: $(if pgrep -f "next dev" > /dev/null; then echo "✅ Running on port 3000"; else echo "❌ Not running"; fi)"
        echo "Backend:  $(if pgrep -f "nodemon.*server.ts" > /dev/null; then echo "✅ Running on port 4000"; else echo "❌ Not running"; fi)"
        echo ""
        echo "🌐 Access URLs:"
        echo "Frontend: http://localhost:3000/en/"
        echo "Admin:    http://localhost:3000/en/pages/adminPage/"
        echo "Backend:  http://localhost:4000"
        ;;
    5)
        echo "👋 Goodbye!"
        exit 0
        ;;
    *)
        echo "❌ Invalid choice. Please run the script again."
        exit 1
        ;;
esac

echo ""
echo "🎉 Configuration updated successfully!"
echo "💡 Restart your frontend development server to apply changes:"
echo "   npm run dev"
