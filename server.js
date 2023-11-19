// Import module dependencies

// Express module to create an express applciation
const express = require('express');
// Module to handle file paths
const path = require('path');
// module to read and write files
const fs = require('fs');
const uuid = require('uuid');
// Create an express application by calling express() and assign it to the app variable
const app = express();


const PORT = process.env.PORT || 3001;


app.use(express.static(path.join(__dirname, 'public')));
// Parse JSON data in the request body
app.use(express.json());
// Middleware to parse URL-encoded data in the request body
app.use(express.urlencoded({ extended: true }));
// Path to the JSON database file
const dbFilePath = path.join(__dirname, 'db', 'db.json');

// Function to read data from the database file
function readDataFromFile() {
  const data = fs.readFileSync(dbFilePath, 'utf-8');
  return JSON.parse(data);
}

// Function to write data to the database file
function writeDataToFile(data) {
  fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

// Route handler for the '/notes' GET request
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'notes.html'));
});

// Route handler for the root '/' GET request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route handler for the '/api/notes' GET request
app.get('/api/notes', (req, res) => {
  const noteData = readDataFromFile();
  console.log('GET /api/notes - noteData:', noteData);
  res.json(noteData);
});