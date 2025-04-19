import Product from "../models/products.js";

export const uploadProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      condition,
      type,
      location
    } = req.body;

    const userId = req.user.id;

    const image = {
      data: req.file.buffer,
      contentType: req.file.mimetype,
    };

    const product = await Product.create({
      title,
      description,
      category,
      condition,
      type,
      status: "Available",
      image,
      location,
      userId,
      postedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const filters = {};

    if (req.query.category) filters.category = req.query.category;
    if (req.query.status) filters.status = req.query.status;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.location) filters.location = req.query.location;

    const products = await Product.find(filters).populate("userId", "name email");

    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Fetch Error:", error);
    res.status(500).json({ success: false, error: "Failed to fetch products" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("userId", "name email");

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    const pickupRequest = await PickupRequest.findOne({ productId: product._id })
    .populate("userId", "name email");

    res.status(200).json({ success: true, product, pickupRequest });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch product" });
  }
};

export const getMyProducts = async (req, res) => {
  try {
    const myProducts = await Product.find({ userId: req.user.id });
    res.status(200).json({ success: true, myProducts });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to fetch your products" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.userId.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    Object.assign(product, req.body);
    await product.save();

    res.status(200).json({ success: true, message: "Product updated", product });
  } catch (error) {
    res.status(500).json({ success: false, error: "Update failed" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.userId.toString() !== req.user.id && req.user.role !== "Admin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Delete failed" });
  }
};

// 🔁 Update Product Status (Admin or Recycler)
export const changeProductStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    product.status = status;
    product.statusHistory.push({ status, updatedAt: new Date() });
    await product.save();

    res.status(200).json({ success: true, message: "Status updated", product });
  } catch (error) {
    res.status(500).json({ success: false, error: "Status update failed" });
  }
};
