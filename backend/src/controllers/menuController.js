import MenuItem from '../models/MenuItem.js';

// Get all menu items
// export const getMenuItems = async (req, res) => {
//   try {
//     const menuItems = await MenuItem.find();
//     res.status(200).json(menuItems);
//   } catch (error) {
//     console.error('Error fetching menu:', error); 
//     res.status(500).json({ error: error.message });
//   }
// };

export const getMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find()
      .populate({
        path: 'ingredients.ingredientId',
        select: 'name stock unit threshold' // Only include these fields
      });
    
    res.status(200).json(menuItems);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ error: error.message });
  }
};
// Create a new menu item
export const createMenuItem = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    const newMenuItem = new MenuItem({ name, description, price, category });
    await newMenuItem.save();
    res.status(201).json(newMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a menu item
export const updateMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedMenuItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a menu item
export const deleteMenuItem = async (req, res) => {
  try {
    const { id } = req.params;
    await MenuItem.findByIdAndDelete(id);
    res.status(200).json({ message: 'Menu item deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Delete all menu items from the MenuItem collection
// export const deleteAllItems = async (req, res) => {
//   try {
//     // Debug: Show available collections
//     const collections = await mongoose.connection.db.listCollections().toArray();
//     console.log('Available collections:', collections.map(c => c.name));

//     const result = await mongoose.connection.db.collection('menuitems')
//       .deleteMany({});
      
//     res.json({
//       success: true,
//       deleted: result.deletedCount
//     });
//   } catch (error) {
//     console.error('RAW MONGO ERROR:', error);
//     res.status(500).json({
//       error: "Delete failed",
//       mongoError: error.message
//     });
//   }
// };