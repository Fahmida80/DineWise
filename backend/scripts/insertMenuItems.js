// import mongoose from 'mongoose';
// import MenuItem from '../src/models/MenuItem.js';  // Ensure the path is correct

// // List of menu items to insert (including fast food items and more burgers)
// const menuItems = [
//   { name: 'Caesar Salad', description: 'Fresh Romaine lettuce with Caesar dressing and croutons.', price: 300, category: 'kitchen' },
//   { name: 'Cheeseburger', description: 'A juicy beef patty with melted cheese, lettuce, and tomato.', price: 320, category: 'kitchen' },
//   { name: 'Chicken Nuggets', description: 'Crispy, golden brown chicken nuggets served with dipping sauce.', price: 170, category: 'kitchen' },
//   { name: 'French Fries', description: 'Crispy fried potato strips, lightly salted.', price: 150, category: 'kitchen' },
//   { name: 'Fish and Chips', description: 'Crispy battered fish fillets served with fries and tartar sauce.', price: 520, category: 'kitchen' },
//   { name: 'Cheese Pizza', description: 'Classic cheese pizza with a crispy crust and mozzarella cheese.', price: 780, category: 'kitchen' },
//   { name: 'Burger Combo', description: 'A delicious burger with fries and a soft drink.', price: 1200, category: 'kitchen' },
//   // New burger items
//   { name: 'Double Cheeseburger', description: 'Two juicy beef patties with double the cheese and all the classic toppings.', price: 485, category: 'kitchen' },
//   { name: 'Bacon Cheeseburger', description: 'A delicious burger with crispy bacon, cheese, lettuce, and tomato.', price: 390, category: 'kitchen' },
//   { name: 'Veggie Burger', description: 'A vegetarian patty made from fresh vegetables and spices, topped with lettuce and tomato.', price: 270, category: 'kitchen' },
//   { name: 'BBQ Burger', description: 'A beef patty with tangy BBQ sauce, cheese, and onion rings.', price: 290, category: 'kitchen' },
//   { name: 'Mushroom Swiss Burger', description: 'A beef patty with sautéed mushrooms and Swiss cheese.', price: 350, category: 'kitchen' },
//   { name: 'Chicken Burger', description: 'A crispy chicken patty with lettuce, tomato, and mayo.', price: 250, category: 'kitchen' }
// ];

// // MongoDB connection string
// const dbURI = 'mongodb+srv://fahmidakarim2002:KwlsiUGU9NuTRyVP@cluster0.iiofbpt.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0';

// // Connect to MongoDB
// mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     return Promise.all(
//       menuItems.map(async (item) => {
//         // Check if the item already exists in the database
//         const existingItem = await MenuItem.findOne({ name: item.name });

//         if (existingItem) {
//           // If the item exists, update its price, description, and category
//           existingItem.price = item.price;
//           existingItem.description = item.description;
//           existingItem.category = item.category;
//           return existingItem.save(); // Save the updated item
//         } else {
//           // If the item doesn't exist, insert a new one
//           const newItem = new MenuItem(item);
//           return newItem.save(); // Save the new item
//         }
//       })
//     );
//   })
//   .then(() => {
//     console.log('Menu items inserted/updated successfully');
//     mongoose.disconnect(); // Disconnect from the database
//   })
//   .catch((error) => {
//     console.error('Error inserting/updating menu items:', error);
//     mongoose.disconnect(); // Disconnect in case of error
//   });
import mongoose from 'mongoose';
import Ingredient from '../src/models/Ingredient.js';  // Correct path for Ingredient model
import MenuItem from '../src/models/MenuItem.js';  // Correct path for MenuItem model

// MongoDB connection string
const dbURI = 'mongodb+srv://fahmidakarim2002:KwlsiUGU9NuTRyVP@cluster0.iiofbpt.mongodb.net/restaurant?retryWrites=true&w=majority&appName=Cluster0';  // Replace with your actual MongoDB connection string

// List of ingredients to insert
const ingredients = [
  { name: 'Romaine Lettuce', stock: 100, unit: 'head', threshold: 10 },
  { name: 'Caesar Dressing', stock: 200, unit: 'g', threshold: 20 },
  { name: 'Croutons', stock: 150, unit: 'g', threshold: 15 },
  { name: 'Beef Patty', stock: 100, unit: 'pcs', threshold: 10 },
  { name: 'Cheese', stock: 200, unit: 'pcs', threshold: 20 },
  { name: 'Lettuce', stock: 50, unit: 'pcs', threshold: 5 },
  { name: 'Tomato', stock: 100, unit: 'pcs', threshold: 10 },
  { name: 'Burger Bun', stock: 150, unit: 'pcs', threshold: 15 },
  { name: 'Potatoes', stock: 300, unit: 'g', threshold: 50 },
  { name: 'Salt', stock: 100, unit: 'g', threshold: 10 },
  { name: 'Tartar Sauce', stock: 200, unit: 'g', threshold: 30 },
  { name: 'Mozzarella Cheese', stock: 180, unit: 'g', threshold: 15 },
  { name: 'BBQ Sauce', stock: 150, unit: 'g', threshold: 10 },
  { name: 'Onion Rings', stock: 50, unit: 'pcs', threshold: 5 },
  { name: 'Mushrooms', stock: 100, unit: 'g', threshold: 20 },
  { name: 'Swiss Cheese', stock: 100, unit: 'g', threshold: 15 },
  { name: 'Chicken Patty', stock: 200, unit: 'pcs', threshold: 20 },
  { name: 'Mayo', stock: 150, unit: 'g', threshold: 15 },
  { name: 'Chicken', stock: 150, unit: 'g', threshold: 20 },
  { name: 'Breadcrumbs', stock: 100, unit: 'g', threshold: 10 },
  { name: 'Dipping Sauce', stock: 100, unit: 'g', threshold: 10 },
  { name: 'Fish Fillets', stock: 100, unit: 'g', threshold: 10 },
  { name: 'Pizza Dough', stock: 100, unit: 'g', threshold: 10 },
  { name: 'Tomato Sauce', stock: 100, unit: 'g', threshold: 10 },
  { name: 'Soft Drink', stock: 100, unit: 'ml', threshold: 10 },
  { name: 'Veggie Patty', stock: 100, unit: 'pcs', threshold: 10 },
  { name: 'Bacon', stock: 100, unit: 'pcs', threshold: 10 }
];

// List of menu items to insert (including fast food items and more burgers)
const menuItems = [
  {
    name: 'Caesar Salad',
    description: 'Fresh Romaine lettuce with Caesar dressing and croutons.',
    price: 300,
    category: 'kitchen',
    ingredients: [
      { name: 'Romaine Lettuce', quantity: 1, unit: 'head' },
      { name: 'Caesar Dressing', quantity: 50, unit: 'g' },
      { name: 'Croutons', quantity: 30, unit: 'g' }
    ]
  },
  {
    name: 'Cheeseburger',
    description: 'A juicy beef patty with melted cheese, lettuce, and tomato.',
    price: 320,
    category: 'kitchen',
    ingredients: [
      { name: 'Beef Patty', quantity: 1, unit: 'pcs' },
      { name: 'Cheese', quantity: 2, unit: 'pcs' },
      { name: 'Lettuce', quantity: 2, unit: 'pcs' },
      { name: 'Tomato', quantity: 2, unit: 'pcs' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' }
    ]
  },
  {
    name: 'Chicken Nuggets',
    description: 'Crispy, golden brown chicken nuggets served with dipping sauce.',
    price: 170,
    category: 'kitchen',
    ingredients: [
      { name: 'Chicken', quantity: 150, unit: 'g' },
      { name: 'Breadcrumbs', quantity: 50, unit: 'g' },
      { name: 'Dipping Sauce', quantity: 20, unit: 'g' }
    ]
  },
  {
    name: 'French Fries',
    description: 'Crispy fried potato strips, lightly salted.',
    price: 150,
    category: 'kitchen',
    ingredients: [
      { name: 'Potatoes', quantity: 200, unit: 'g' },
      { name: 'Salt', quantity: 5, unit: 'g' }
    ]
  },
  {
    name: 'Fish and Chips',
    description: 'Crispy battered fish fillets served with fries and tartar sauce.',
    price: 520,
    category: 'kitchen',
    ingredients: [
      { name: 'Fish Fillets', quantity: 150, unit: 'g' },
      { name: 'Potatoes', quantity: 200, unit: 'g' },
      { name: 'Tartar Sauce', quantity: 30, unit: 'g' },
      { name: 'Salt', quantity: 5, unit: 'g' }
    ]
  },
  {
    name: 'Cheese Pizza',
    description: 'Classic cheese pizza with a crispy crust and mozzarella cheese.',
    price: 780,
    category: 'kitchen',
    ingredients: [
      { name: 'Pizza Dough', quantity: 200, unit: 'g' },
      { name: 'Mozzarella Cheese', quantity: 150, unit: 'g' },
      { name: 'Tomato Sauce', quantity: 10, unit: 'g' }
    ]
  },
  {
    name: 'Burger Combo',
    description: 'A delicious burger with fries and a soft drink.',
    price: 1200,
    category: 'kitchen',
    ingredients: [
      { name: 'Beef Patty', quantity: 1, unit: 'pcs' },
      { name: 'Cheese', quantity: 2, unit: 'pcs' },
      { name: 'Lettuce', quantity: 2, unit: 'pcs' },
      { name: 'Tomato', quantity: 2, unit: 'pcs' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' },
      { name: 'Potatoes', quantity: 150, unit: 'g' },
      { name: 'Soft Drink', quantity: 1, unit: 'ml' }
    ]
  },
  {
    name: 'Double Cheeseburger',
    description: 'Two juicy beef patties with double the cheese and all the classic toppings.',
    price: 485,
    category: 'kitchen',
    ingredients: [
      { name: 'Beef Patty', quantity: 2, unit: 'pcs' },
      { name: 'Cheese', quantity: 4, unit: 'pcs' },
      { name: 'Lettuce', quantity: 2, unit: 'pcs' },
      { name: 'Tomato', quantity: 2, unit: 'pcs' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' }
    ]
  },
  {
    name: 'Bacon Cheeseburger',
    description: 'A delicious burger with crispy bacon, cheese, lettuce, and tomato.',
    price: 390,
    category: 'kitchen',
    ingredients: [
      { name: 'Beef Patty', quantity: 1, unit: 'pcs' },
      { name: 'Bacon', quantity: 2, unit: 'pcs' },
      { name: 'Cheese', quantity: 2, unit: 'pcs' },
      { name: 'Lettuce', quantity: 2, unit: 'pcs' },
      { name: 'Tomato', quantity: 2, unit: 'pcs' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' }
    ]
  },
  {
    name: 'Veggie Burger',
    description: 'A vegetarian patty made from fresh vegetables and spices, topped with lettuce and tomato.',
    price: 270,
    category: 'kitchen',
    ingredients: [
      { name: 'Veggie Patty', quantity: 1, unit: 'pcs' },
      { name: 'Lettuce', quantity: 2, unit: 'pcs' },
      { name: 'Tomato', quantity: 2, unit: 'pcs' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' }
    ]
  },
  {
    name: 'BBQ Burger',
    description: 'A beef patty with tangy BBQ sauce, cheese, and onion rings.',
    price: 290,
    category: 'kitchen',
    ingredients: [
      { name: 'Beef Patty', quantity: 1, unit: 'pcs' },
      { name: 'BBQ Sauce', quantity: 30, unit: 'g' },
      { name: 'Cheese', quantity: 2, unit: 'pcs' },
      { name: 'Onion Rings', quantity: 5, unit: 'pcs' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' }
    ]
  },
  {
    name: 'Mushroom Swiss Burger',
    description: 'A beef patty with sautéed mushrooms and Swiss cheese.',
    price: 350,
    category: 'kitchen',
    ingredients: [
      { name: 'Beef Patty', quantity: 1, unit: 'pcs' },
      { name: 'Swiss Cheese', quantity: 2, unit: 'pcs' },
      { name: 'Mushrooms', quantity: 50, unit: 'g' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' }
    ]
  },
  {
    name: 'Chicken Burger',
    description: 'A crispy chicken patty with lettuce, tomato, and mayo.',
    price: 250,
    category: 'kitchen',
    ingredients: [
      { name: 'Chicken Patty', quantity: 1, unit: 'pcs' },
      { name: 'Lettuce', quantity: 2, unit: 'pcs' },
      { name: 'Tomato', quantity: 2, unit: 'pcs' },
      { name: 'Mayo', quantity: 20, unit: 'g' },
      { name: 'Burger Bun', quantity: 1, unit: 'pcs' }
    ]
  }
];

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB');

    // Step 1: Insert ingredients into the database if they don't already exist
    await Promise.all(
      ingredients.map(async (ingredient) => {
        const existingIngredient = await Ingredient.findOne({ name: ingredient.name });
        if (!existingIngredient) {
          const newIngredient = new Ingredient(ingredient);
          await newIngredient.save();
          console.log(`Ingredient "${ingredient.name}" added`);
        }
      })
    );

    // Step 2: Insert menu items and link them to the correct ingredient IDs
    // await Promise.all(
    //   menuItems.map(async (menuItem) => {
    //     // Find the ingredients by name and link them to their ingredient IDs
    //     const ingredientsWithIds = await Promise.all(menuItem.ingredients.map(async (ingredient) => {
    //       const ingredientData = await Ingredient.findOne({ name: ingredient.name });
    //       if (!ingredientData) {
    //         console.log(`Ingredient "${ingredient.name}" not found for menu item "${menuItem.name}"`);
    //         return null;  // Skip if ingredient not found
    //       }
    //       return {
    //         ingredientId: ingredientData._id,  // Link ingredient ID
    //         quantity: ingredient.quantity,
    //         unit: ingredient.unit
    //       };
    //     }));

        // Filter out any invalid (null) ingredients (if some weren't found)
    //     const validIngredients = ingredientsWithIds.filter(ingredient => ingredient !== null);

    //     if (validIngredients.length === 0) {
    //       console.log(`No valid ingredients found for menu item "${menuItem.name}". Skipping...`);
    //       return;  // Skip this menu item if no valid ingredients
    //     }

    //     // Create and save the menu item with the linked ingredients
    //     const newMenuItem = new MenuItem({
    //       name: menuItem.name,
    //       description: menuItem.description,
    //       price: menuItem.price,
    //       category: menuItem.category,
    //       ingredients: validIngredients,
    //     });
    //     await newMenuItem.save();
    //     console.log(`Menu item "${menuItem.name}" added`);
    //   })
    // );
    // Step 2: Insert menu items and link them to the correct ingredient IDs
      await Promise.all(
      menuItems.map(async (menuItem) => {
        // Find the ingredients by name and link them to their ingredient IDs
        const ingredientsWithIds = await Promise.all(menuItem.ingredients.map(async (ingredient) => {
          const ingredientData = await Ingredient.findOne({ name: ingredient.name });
          if (!ingredientData) {
            console.log(`Ingredient "${ingredient.name}" not found for menu item "${menuItem.name}"`);
            return null;  // Skip if ingredient not found
          }
          return {
            ingredientId: ingredientData._id,  // Link ingredient ID here
            quantity: ingredient.quantity,
            unit: ingredient.unit
          };
        }));

        // Filter out any invalid (null) ingredients (if some weren't found)
        const validIngredients = ingredientsWithIds.filter(ingredient => ingredient !== null);

        if (validIngredients.length === 0) {
          console.log(`No valid ingredients found for menu item "${menuItem.name}". Skipping...`);
          return;  // Skip this menu item if no valid ingredients
        }

        // Create and save the menu item with the linked ingredients
        const newMenuItem = new MenuItem({
          name: menuItem.name,
          description: menuItem.description,
          price: menuItem.price,
          category: menuItem.category,
          ingredients: validIngredients,
        });
        await newMenuItem.save();
        console.log(`Menu item "${menuItem.name}" added`);
      })
      );


    console.log('Menu items and ingredients inserted successfully');
    mongoose.disconnect();  // Disconnect from the database
  })
  .catch((error) => {
    console.error('Error inserting data:', error);
    mongoose.disconnect();  // Disconnect in case of error
  });
