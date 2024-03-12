const fs = require('fs');
const readline = require('readline');
const dotenv = require('dotenv');

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for Firebase configuration details
rl.question('Enter Firebase API key: ', (apiKey) => {
  rl.question('Enter Firebase auth domain: ', (authDomain) => {
    rl.question('Enter Firebase database URL: ', (databaseURL) => {
      rl.question('Enter Firebase project ID: ', (projectId) => {
        rl.question('Enter Firebase storage bucket: ', (storageBucket) => {
          rl.question('Enter Firebase messaging sender ID: ', (messagingSenderId) => {
            rl.question('Enter Firebase app ID: ', (appId) => {
              rl.question('Enter Firebase measurement ID: ', (measurementId) => {
                // Close readline interface
                rl.close();

                // Construct Firebase configuration object
                const firebaseConfig = {
                  apiKey,
                  authDomain,
                  databaseURL,
                  projectId,
                  storageBucket,
                  messagingSenderId,
                  appId,
                  measurementId
                };

                // Write configuration to .env.local file
                const envContent = Object.entries(firebaseConfig)
                  .map(([key, value]) => `${key.toUpperCase()}=${value}`)
                  .join('\n');
                
                fs.writeFileSync('.env.local', envContent);

                console.log('Firebase configuration saved to .env.local');
              });
            });
          });
        });
      });
    });
  });
});
