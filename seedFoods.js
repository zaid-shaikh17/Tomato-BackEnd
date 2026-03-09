import "dotenv/config";
import connectDB from "./config/db.js";
import foodModel from "./models/foodModel.js";

const categories = [
  "Salad",
  "Rolls",
  "Desserts",
  "Sandwich",
  "Cake",
  "Pure Veg",
  "Pasta",
  "Noodles",
  "Pizza",
  "Burger",
  "Biryani",
  "Drinks",
  "Momos",
  "Dosa",
  "Idli",
  "Paratha",
  "Soup",
  "Fries",
  "Shawarma",
  "Tacos",
  "Sushi",
  "Steak",
  "BBQ",
  "Pancake",
  "Waffle",
  "Smoothie",
  "Coffee",
  "Tea",
  "Juice",
  "Wrap",
];

const styleTags = ["Classic", "Spicy", "Cheese Burst", "House Special"];
const descriptionTags = [
  "Prepared fresh with premium ingredients and balanced Indian flavors.",
  "Chef-crafted recipe with rich texture and satisfying taste.",
  "Popular choice for lunch and dinner with authentic seasoning.",
  "Made to order for a fresh, flavorful, and filling meal.",
];

const toSlug = (value) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Price formula keeps values realistic and always within Rs.80 - Rs.2000.
const generatePrice = (categoryIndex, itemIndex) => {
  const price = 80 + ((categoryIndex * 61 + itemIndex * 173) % 1921);
  return Math.max(80, Math.min(2000, price));
};

const generateFoods = () => {
  const foods = [];

  categories.forEach((category, categoryIndex) => {
    for (let itemIndex = 0; itemIndex < 4; itemIndex += 1) {
      const style = styleTags[itemIndex];
      const name = `${style} ${category}`;
      const description = `${descriptionTags[itemIndex]} Category: ${category}.`;
      const price = generatePrice(categoryIndex, itemIndex);
      const image = `https://picsum.photos/seed/${toSlug(name)}/640/480`;

      foods.push({
        name,
        image,
        price,
        description,
        category,
      });
    }
  });

  return foods;
};

const validateFoods = (foods) => {
  if (categories.length !== 30) {
    throw new Error("Category count must be exactly 30.");
  }

  if (foods.length !== 120) {
    throw new Error("Generated food count must be exactly 120.");
  }

  const countByCategory = foods.reduce((acc, food) => {
    acc[food.category] = (acc[food.category] || 0) + 1;
    return acc;
  }, {});

  const invalidCategory = categories.find(
    (category) => countByCategory[category] !== 4,
  );

  if (invalidCategory) {
    throw new Error(`Category "${invalidCategory}" must contain exactly 4 foods.`);
  }

  const invalidPrice = foods.find((food) => food.price < 80 || food.price > 2000);
  if (invalidPrice) {
    throw new Error(`Invalid price found for "${invalidPrice.name}".`);
  }
};

const seedFoods = async () => {
  try {
    await connectDB();

    const foods = generateFoods();
    validateFoods(foods);

    await foodModel.deleteMany({});
    await foodModel.insertMany(foods);

    console.log(`Seed complete: ${foods.length} food items inserted.`);
    process.exit(0);
  } catch (error) {
    console.error("Food seeding failed:", error.message);
    process.exit(1);
  }
};

seedFoods();
