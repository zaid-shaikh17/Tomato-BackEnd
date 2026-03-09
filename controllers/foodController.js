import foodModel from "../models/foodModel.js";

// Add a single food item.
export const addFood = async (req, res) => {
  try {
    const { name, image, price, description, category } = req.body;

    if (!name || !image || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "All fields are required: name, image, price, description, category.",
      });
    }

    const food = await foodModel.create({
      name,
      image,
      price,
      description,
      category,
    });

    return res.status(201).json({
      success: true,
      message: "Food item added successfully.",
      data: food,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to add food item.",
      error: error.message,
    });
  }
};

// List all food items.
export const listFoods = async (_req, res) => {
  try {
    const foods = await foodModel.find({}).sort({ category: 1, name: 1 });

    return res.status(200).json({
      success: true,
      count: foods.length,
      data: foods,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch foods.",
      error: error.message,
    });
  }
};

// Remove a food item by id using request body: { id: "..." }.
export const removeFood = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Food id is required in request body.",
      });
    }

    const deletedFood = await foodModel.findByIdAndDelete(id);

    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        message: "Food item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Food item removed successfully.",
      data: deletedFood,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to remove food item.",
      error: error.message,
    });
  }
};
