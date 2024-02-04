const sudoPrompt = require('sudo-prompt');

// Check for admin rights
sudoPrompt.exec('echo Checking for admin rights', { name: 'Your App Name' }, (error, stdout, stderr) => {
  if (error) {
    console.error('You do not have administrative privileges. Please run the application as an administrator.');
    process.exit(1);
  } else {
    console.log('You have administrative privileges. Starting the application...');
  }
});
