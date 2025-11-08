#!/usr/bin/env node

const { exec } = require('child_process');
const path = require('path');

console.log('Starting banner migration...');

// Compile TypeScript and run migration
exec('npx ts-node src/scripts/migrateBanners.ts', { cwd: path.join(__dirname, '..') }, (error, stdout, stderr) => {
    if (error) {
        console.error('Migration failed:', error);
        return;
    }
    
    if (stderr) {
        console.error('Migration stderr:', stderr);
        return;
    }
    
    console.log('Migration output:', stdout);
    console.log('Banner migration completed successfully!');
});
