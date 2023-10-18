// server.js
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const { invalid } = require("moment");

const app = express();
const PORT = 4000;

// MongoDB setup
mongoose.connect("mongodb://localhost:27017/inventoryapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("MongoDB connected successfully");
});

// Define a schema for User
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  pass: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
    default: null, // Set a default value to null to indicate no profile picture
  },
});

// Create a User model using the schema
const User = mongoose.model("userlogs", userSchema); // collections

app.use(bodyParser.json());

// API endpoint to save user logs

app.put("/inventoryapp/userlogs/:id", async (req, res) => {
  const id = req.params.id;

  const profileUrl = req.body;

  try {
    const updatedItem = await User.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { ...profileUrl },
      { upsert: true }
    );
    if (updatedItem)
      res.status(201).json({ message: "profile update successfully" });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Error update profile" });
  }
});
// Update database cutie API ENDPOINT

app.get("/inventoryapp/userlogs", async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

const inventoryItemSchema = new mongoose.Schema(
  {
    // ITEM LIST INVENTORY SCHEMA
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    classification: {
      type: String,
      required: true,
    },
    itemImage: {
      type: String,
      default: null, // Set a default value to null to indicate no profile picture
    },
  },
  { timestamps: true }
);
const InventoryItem = mongoose.model("itemlist", inventoryItemSchema);

app.put("/inventoryapp/itemlist/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, price, desc, classification, itemImage } = req.body;
  console.log(" ngano mani", itemImage);
  try {
    const updatedItem = await InventoryItem.findByIdAndUpdate(
      new mongoose.Types.ObjectId(id),
      { name, quantity, price, desc, classification, itemImage },
      { upsert: true }
      // This ensures that the updated item is returned
    );
    console.log("The updated item", updatedItem);

    if (updatedItem) {
      res.status(200).json({ message: "Inventory item updated successfully" });
    } else {
      res.status(404).json({ message: "Inventory item not found" });
    }
  } catch (error) {
    console.error("Error updating inventory item:", error);
    res.status(500).json({ message: "Error updating inventory item" });
  }
});

app.post("/inventoryapp/itemlist", async (req, res) => {
  const { name, quantity, price, desc, classification, itemImage } = req.body;

  const newInventoryItem = new InventoryItem({
    name,
    quantity,
    price,
    desc,
    classification,
    itemImage,
  });
  try {
    await newInventoryItem.save();
    console.log(newInventoryItem);
    res.status(201).json({ message: "Inventory item saved successfully" });
  } catch (error) {
    console.error("Error saving inventory item:", error);
    res.status(500).json({ message: "Error saving inventory item" });
  }
});

// API endpoint to delete an inventory item
app.delete("/inventoryapp/itemlist/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await InventoryItem.deleteOne({ _id: id });
    res.status(200).json({ message: "Inventory item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting inventory item" });
  }
});

app.get("/inventoryapp/itemlist", async (req, res) => {
  try {
    let inventoryItemSchema = [];
    const query = {};

    if (req.query.name) {
      query.$or = [
        { name: req.query.name },
        { classification: req.query.classification }, // Match by name or classification
      ];
    }

    if (req.query.classification) {
      query.classification = req.query.classification;
    }

    const inventoryItems = await InventoryItem.find(query).sort({
      createdAt: "descending",
    });

    inventoryItemSchema.push(inventoryItems);
    res.status(200).json(inventoryItemSchema[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching inventory items" });
  }
});

app.get("/inventoryapp/itemlist/:param", async (req, res) => {
  const { param } = req.params;

  try {
    if (mongoose.Types.ObjectId.isValid(param)) {
      // Search by ID
      const existingItem = await InventoryItem.findOne({ _id: param });
      if (existingItem) {
        const { id, name, quantity, price, desc, classification } =
          existingItem;
        res
          .status(200)
          .json({ id, name, quantity, price, desc, classification });
      } else {
        res.status(200).json({ exists: false });
      }
    } else {
      // Search by name
      const existingItems = await InventoryItem.findOne({ name: param });
      if (existingItems) {
        res.status(200).json(existingItems);
      } else {
        res.status(200).json({ exists: false });
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error checking item existence" });
  }
});
const itemLogSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const ItemLog = mongoose.model("itemlog", itemLogSchema);

// Create an item log
app.post("/inventoryapp/itemlogs", async (req, res) => {
  const { itemName, action } = req.body;

  const newItemLog = new ItemLog({
    itemName,
    action,
  });
  console.log("Item Logs", newItemLog);
  try {
    await newItemLog.save();
    res.status(201).json({ message: "Item log saved successfully" });
  } catch (error) {
    console.error("Error saving item log:", error);
    res.status(500).json({ message: "Error saving item log" });
  }
});

// Get item logs for a specific item
app.get("/inventoryapp/itemlogs/", async (req, res) => {
  try {
    const itemLogs = await ItemLog.find().sort({ createdAt: "descending" });
    res.status(200).json(itemLogs);
  } catch (error) {
    console.error("Error fetching item logs:", error);
    res.status(500).json({ message: "Error fetching item logs" });
  }
});

app.delete("/inventoryapp/itemlogs", async (req, res) => {
  try {
    await ItemLog.deleteMany({});
    res.status(200).json({ message: "All Item logs deleted successfully" });
  } catch (error) {
    console.error("Error Deleign Item Logs", error);
    res.status(500).json({ message: "Error deleting Items logs" });
  }
});

const ShipItemSchema = new mongoose.Schema(
  {
    // Ship-list INVENTORY SCHEMA
    itemId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    quantityToShip: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const ShipItem = mongoose.model("ShipItem", ShipItemSchema);

app.post("/inventoryapp/ship-items", async (req, res) => {
  const { itemId, itemName, quantityToShip, destination } = req.body;
  let total = 0; // Initialize tota  with 0

  try {
    const inventoryItem = await InventoryItem.findById(itemId);

    if (!inventoryItem) {
      return res.status(404).json({ message: "Inventory item not found" });
    }

    if (inventoryItem.quantity < quantityToShip) {
      return res
        .status(400)
        .json({ message: "Not enough items in stock to ship" });
    }

    inventoryItem.quantity -= quantityToShip;
    total = quantityToShip * inventoryItem.price; // Calculate the total based on item price

    await inventoryItem.save();

    // Create a new ShipItem document using the model
    const shipItem = new ShipItem({
      itemId,
      name: itemName, // Use "name" instead of "itemName" if that's the field name in the schema
      quantityToShip,
      price: inventoryItem.price, // Use the price from the inventoryItem
      total,
      destination,
    });

    await shipItem.save();

    console.log("Item saved successfully", inventoryItem);

    res.status(200).json({
      message: "Items shipped successfully",
      shippedQuantity: quantityToShip,
      destination,
      total, // Include the total in the response
    });
  } catch (error) {
    console.error("Error shipping items:", error);
    res.status(500).json({ message: "Error shipping items" });
  }
});

// Define a GET endpoint to retrieve ship items
app.get("/inventoryapp/ship-items/", async (req, res) => {
  try {
    // Use your ShipItem model to fetch ship items from the database
    const shipItems = await ShipItem.find().sort({ createdAt: "descending" }); // This assumes you have a ShipItem model

    // Return the ship items as a JSON response
    res.status(200).json(shipItems);
  } catch (error) {
    console.error("Error fetching ship items:", error);
    res.status(500).json({ message: "Error fetching ship items" });
  }
});
app.delete("/inventoryapp/ship-items", async (req, res) => {
  console.log(req.body)

  try {
    if(req.body?.type === "all") {
      await ShipItem.deleteMany({});
      return res
        .status(200)
        .json({ message: "All shipping logs deleted successfully" });
    }
 else if (req.body?.type === "filtered") {
      const searchDate = new Date(req.body.date);

      const startOfDay = new Date(
        searchDate.getFullYear(),
        searchDate.getMonth(),
        searchDate.getDate()
      );

      const endOfDay = new Date(startOfDay);
      endOfDay.setDate(endOfDay.getDate() + 1);
      const result = await ShipItem.deleteMany({
        createdAt: { $gte: startOfDay, $lt: endOfDay },
      });

      res.status(200).json({ message: "Shipping Logs deleted successfully" });
    }
    else {
      res.status(404).json({ message: "Error deleting shipping logs" });

    }
  } catch (error) {
    console.error("Error deleting all shipping logs:", error);
    res.status(500).json({ message: "Error deleting shipping logs" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
