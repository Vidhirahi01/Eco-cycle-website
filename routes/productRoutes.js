import express from "express";
import { verifyToken as auth } from "../middleware/authmiddleware.js";
import authorize from "../middleware/roleCheck.js"; 
import { 
  uploadProduct, 
  getAllProducts, 
  getProductById, 
  getMyProducts, 
  updateProduct, 
  deleteProduct, 
  changeProductStatus 
} from "../controller/productController.js"; 
import upload from "../middleware/uploadMiddleware.js";   
import Product from "../models/products.js";

const router = express.Router();  
router.post("/", auth, authorize("User", "Admin"), upload.single("image"), uploadProduct);
router.get("/", getAllProducts); 
router.get("/:id", getProductById);
router.get("/my/list", auth, getMyProducts);

router.put("/:id", auth, updateProduct);  
router.delete("/:id", auth, deleteProduct);

router.put("/:id/status", auth, authorize("Recycler", "Admin"), changeProductStatus);

// Upload a product with an image
// Remove the duplicate route and use the existing post route
// Assuming this logic is part of `uploadProduct`
router.post("/upload", auth, upload.single("image"), async (req, res) => {
    try {
      const { name, description, price } = req.body;
      const { file, user } = req;
  
      if (!file) {
        return res.status(400).json({ message: "Please upload an image" });
      }
  
      // Create a new Product instance
      const newProduct = new Product({
        name,
        description,
        price,
        image: {
          data: file.buffer,  // Store the file data in MongoDB
          contentType: file.mimetype  // Store the file's MIME type
        },
        user: user._id  // Associate product with the logged-in user
      });
  
      // Save the product to the database
      const savedProduct = await newProduct.save();
  
      res.status(201).json({
        message: "Product uploaded successfully",
        product: savedProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error uploading product" });
    }
});

router.get("/image/:id", async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
  
      if (!product || !product.image.data) {
        return res.status(404).json({ message: "Image not found" });
      }
  
      res.set("Content-Type", product.image.contentType);
      res.send(product.image.data);  // Send the image buffer as response
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error retrieving image" });
    }
});
  
export default router;
