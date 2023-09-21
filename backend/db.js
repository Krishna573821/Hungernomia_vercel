const mongoose = require("mongoose");

async function mongoDB() {
  const dbUrl =
    "mongodb://gofood:bluewhale@ac-txxhwg6-shard-00-00.u8lmxiv.mongodb.net:27017,ac-txxhwg6-shard-00-01.u8lmxiv.mongodb.net:27017,ac-txxhwg6-shard-00-02.u8lmxiv.mongodb.net:27017/gofoodmern?ssl=true&replicaSet=atlas-1xd2wo-shard-0&authSource=admin&retryWrites=true&w=majority";

    try {
      await mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        socketTimeoutMS: 30000,
      });
      console.log("MongoDB connected successfully");
  
      const fetched_data = await mongoose.connection.db.collection("food_items").find({}).toArray();
      const foodCategory = await mongoose.connection.db.collection("foodCategory").find({}).toArray();
      
      global.food_items = fetched_data;
      global.foodCategory = foodCategory;
    } catch (err) {
      console.error("MongoDB connection error:", err);
    }
  }
  
  module.exports = mongoDB;
