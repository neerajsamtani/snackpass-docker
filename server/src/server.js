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


// Old Request
app.get("/api/orders", async (req, res) => {
  console.log("Client request received");
  // TODO: Custom Mongo Sorting Function for Trending
  const agg = await Order.aggregate([
      {$match: {'Order Time' : { $gte : new Date("2021-03-12T12:17:00Z").toISOString() }}},
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

app.get("/api/trendingOrders", async (req, res) => {
  console.log("Client request received");
  // TODO: Custom Mongo Sorting Function for Trending Score
  const agg = await Order.aggregate([
    {$match: {'Order Time' : { $gte : new Date("2021-03-12T12:17:00Z").toISOString() }}},
    {$group: {_id : {itemName : '$Item Name', price:'$Product Price'}, 
              totalOrders:{$sum :1}, 
              mostRecentOrder:{$max :'$Order Time'},
              totalRecentOrders : {
                $accumulator:
                {
                  init: function() {                        // Set the initial state
                    return { sum: 0, orderTime: "" }
                  },
  
                  accumulate: function(state, numOrders, thisOrderTime) {  // Define how to update the state
                    // TODO: Don't harcode Date
                    if (new Date(thisOrderTime) - new Date("2021-03-14T03:16:54Z") > 0) { // TODO: Change this time. Currently 9 hours ago
                      numOrders = state.sum + numOrders
                    } else {
                      numOrders = state.sum 
                    }
  
                    return {
                      orderTime: thisOrderTime,
                      sum: numOrders
                    }
                  },
  
                  accumulateArgs: ["$Quantity", "$Order Time"],              // Argument required by the accumulate function
  
                  merge: function(state1, state2) {         // When the operator performs a merge,
                    return {   
                      orderTime: state1.orderTime,
                      sum: state1.sum + state2.sum
                    }
                  },
  
                  finalize: function(state) {               // After collecting the results from all documents,
                    return (state.sum)
                  },
                  lang: "js"
                }
            }}
          },
    {$project : {itemName : '$_id.itemName', price : '$_id.price', totalOrders : '$totalOrders', 
                  totalRecentOrders : '$totalRecentOrders', mostRecentOrder: '$mostRecentOrder',
                trendingScore:
                  {$divide: [
                    {$pow: [
                    '$totalRecentOrders',
                  2]
                    },
                    {$pow: [
                      {$divide:  [ { $subtract: [{$toDate: "2021-03-14T07:53:00Z"}, {$toDate: '$mostRecentOrder'}] }, 60000]}, // Minutes since last order
                      1.2 // Gravity
                    ]}
                  ]}
                ,
                 _id : 0}},
    { $sort : { trendingScore : -1 } }
  ])
  await res.json(agg)
});