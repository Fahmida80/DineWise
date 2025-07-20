
import Table from "../models/Table.js";

// 1. Get all tables

export const getTables = async (req, res) => {
  try {
    const tables = await Table.find().sort({ createdAt: -1 });
    res.status(200).json(tables);
  } catch (error) {
    console.error("Error fetching tables:", error);
    res.status(500).json({ message: "Failed to get tables", error });
  }
};


// 2. Get a specific table by ID

export const getTableById = async (req, res) => {
    try {
      const table = await Table.findById(req.params.id);
      if (!table) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.status(200).json(table);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// 3. Create a new table  

export const createTable = async (req, res) => {
    try {
      const { number, status, seats } = req.body;
  
      // Check if tableNumber already exists
      const existingTable = await Table.findOne({ number });
      if (existingTable) {
        return res.status(400).json({ message: "Table already exists" });
      }
  
      // Create new table
      const newTable = new Table({ number, status, seats});
      await newTable.save();
  
      res.status(201).json({ message: "New table created successfully", table: newTable });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

// export const getTables = (req, res) => {
//     res.status(200).send("You are in the live tables");
// };


// @desc    Update a table’s status
// @route   PUT /api/tables/:id
// controllers/tableController.js

// 3. Update a table's status

export const updateTableStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { seats, status, mergedWith } = req.body;
  
      const updatedTable = await Table.findByIdAndUpdate(
        id,
        { seats, status, mergedWith },
        { new: true, runValidators: true }
      );
  
      if (!updatedTable) {
        return res.status(404).json({ message: "Table not found" });
      }
  
      res.status(200).json({ message: "Table updated successfully", table: updatedTable });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


// 4. Merge tables  

export const mergeTables = async (req, res) => {
    try {
      const { mainTableNumber, tablesToMerge } = req.body;
  
      // Find main table
      const mainTable = await Table.findOne({ number: mainTableNumber });
      if (!mainTable) {
        return res.status(404).json({ message: "Main table not found" });
      }
  
      // Check if main table is available
      if (mainTable.status !== 'available') {
        return res.status(400).json({ message: "Main table is not available for merging" });
      }
  
      // Find tables to merge
      const tables = await Table.find({ number: { $in: tablesToMerge } });
      if (tables.length !== tablesToMerge.length) {
        return res.status(404).json({ message: "One or more tables to merge not found" });
      }
  
      // Check all tables to merge are available
      for (const table of tables) {
        if (table.status !== 'available') {
          return res.status(400).json({ message: `Table ${table.number} is not available for merging` });
        }
      }
  
      // Update main table with mergedWith refs & status to merged
      mainTable.mergedWith = tables.map(table => table._id);
      mainTable.status = 'merged';
      await mainTable.save();
  
      // Update merged tables status to merged and clear their mergedWith if any
      await Table.updateMany(
        { _id: { $in: tables.map(t => t._id) } },
        { $set: { status: 'merged', mergedWith: [] } }
      );
  
      res.status(200).json({ message: "Tables merged successfully", mainTable });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

 
// 5. Split merged tables
  

export const splitTables = async (req, res) => {
  try {
    const { mainTableNumber, tablesToSplit } = req.body;

    // Find the main table
    const mainTable = await Table.findOne({ number: mainTableNumber });
    if (!mainTable) {
      return res.status(404).json({ message: "Main table not found" });
    }

    // Check if the main table is actually merged
    if (mainTable.status !== 'merged' || !mainTable.mergedWith.length) {
      return res.status(400).json({ message: "Main table is not currently merged" });
    }

    // Find and update all tables being split
    for (const tableNumber of tablesToSplit) {
      const table = await Table.findOne({ number: tableNumber });
      if (table && table.status === 'merged') {
        table.status = 'available';
        table.mergedWith = [];
        await table.save();
      }
    }

    // Clear mergedWith and update status of main table
    mainTable.mergedWith = [];
    mainTable.status = 'available';
    await mainTable.save();

    res.status(200).json({ message: "Tables successfully split", table: mainTable });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 6. deleteTableById

export const deleteTable = async (req, res) => {
    try {
      const deletedTable = await Table.findByIdAndDelete(req.params.id);
      if (!deletedTable) {
        return res.status(404).json({ message: "Table not found" });
      }
      res.status(200).json({ message: "Table deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  