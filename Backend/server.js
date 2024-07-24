const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const cors = require("cors"); // Add this line
const app = express();

app.use(cors()); // Add this line
app.use(bodyParser.json());
app.use(express.static("uploads")); // Serve static files from the "uploads" directory

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Saibaba9857@",
  database: "ecommerce",
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL database!");
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.get("/home1", (req, res) => {
  res.send("Hello world");
});

// Create a new product
app.post("/product", upload.single("image"), (req, res) => {
  console.log("Request received with data ", req.body);
  const { name, price } = req.body;
  console.log("req file is ", req.file);
  const image_url = req.file ? req.file.filename : null;
  const sql = "INSERT INTO products (name, price, image_url) VALUES (?, ?, ?)";
  connection.query(sql, [name, price, image_url], (err, result) => {
    if (err) throw err;
    res.send("Product added successfully!");
  });
});

// Get all products
app.get("/product", (req, res) => {
  const sql = "SELECT * FROM products";
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update a product by id
app.put("/product/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  const { name, price } = req.body;
  const image_url = req.file ? req.file.filename : null;
  let sql = "UPDATE products SET name = ?, price = ? WHERE id = ?";
  let values = [name, price, id];
  if (image_url) {
    sql = "UPDATE products SET name = ?, price = ?, image_url = ? WHERE id = ?";
    values = [name, price, image_url, id];
  }
  connection.query(sql, values, (err, result) => {
    if (err) throw err;
    res.send("Product updated successfully!");
  });
});

// Delete a product by id
app.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM products WHERE id = ?";
  connection.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.send("Product deleted successfully!");
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
