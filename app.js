const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

// API endpoint to create a text file with the current timestamp
app.post('/createFile', (req, res) => {
  const folderPath = './textFiles'; // Specify your folder path

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }

  const currentDate = new Date();
  const fileName = `${currentDate.toISOString().replace(/[:.]/g, '-')}.txt`;
  const filePath = `${folderPath}/${fileName}`;

  // Write timestamp to the file
  fs.writeFile(filePath, currentDate.toString(), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error creating file.' });
    }

    res.status(200).json({ message: 'File created successfully.', filePath });
  });
});

// API endpoint to retrieve all text files in the folder
app.get('/getAllFiles', (req, res) => {
  const folderPath = './textFiles'; // Specify your folder path

  // Read all files in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error reading files.' });
    }

    res.status(200).json({ files });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
