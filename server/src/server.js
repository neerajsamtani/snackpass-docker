// server/src/server.js
const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

// Assign environment variables
const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/db";

// Initiliase an express server
const app = express();

// Options to pass to mongodb to avoid deprecation warnings
const options = {
  useNewUrlParser: true, 
  useUnifiedTopology: true, 
  useFindAndModify: false, 
  useCreateIndex: true
};

// Function to connect to the database
const conn = () => {
  mongoose.connect(
    mongoUri,
    options
  );
};
// Call it to connect
conn();

// Handle the database connection and retry as needed
const db = mongoose.connection;
db.on("error", err => {
  console.log("There was a problem connecting to mongo!: ", err);
  console.log("Trying again");
  setTimeout(() => conn(), 5000);
});
db.once("open", () => console.log("Successfully connected to mongo"));

const orderSchema = new mongoose.Schema({
  orderID: Number,
  restaurant: String,
  itemName: String,
  quantity: Number,
  productPrice: Number,
  totalProducts: Number,
  orderTime: Date
})
const Order = mongoose.model("Order", orderSchema);
const order = new Order({
  orderID: 25583,
  restaurant: "Hogwarts",
  itemName: "Minty Sauce",
  quantity: 1,
  productPrice: 0.5,
  totalProducts: 12
});

const twoDaysAgo = new Date("2021-03-12T12:17:00Z")

app.get("/api/orders", async (req, res) => {
  console.log("Client request received");
  // TODO: Custom Mongo Sorting Function for Trending
  const agg = await Order.aggregate([
      {$match: {'Order Time' : { $gte : twoDaysAgo.toISOString() }}},
      {$group: {_id : {itemName : '$Item Name', price:'$Product Price'}, totalOrders:{$sum :1}, mostRecentOrder:{$max :'$Order Time'}}},
      {$project : {itemName : '$_id.itemName', price : '$_id.price', totalOrders : '$totalOrders', mostRecentOrder: '$mostRecentOrder', _id : 0}},
      { $sort : { mostRecentOrder : -1 } }
      // ,      { $limit : 25 }
  ])
  await res.json(agg)
});

// Setup a records in the database to retrieve
// mongoimport --type csv -d db -c orders --headerline --drop ordersWithTime.csv

app.listen(port, () => console.log(`Listening on port ${port}`));