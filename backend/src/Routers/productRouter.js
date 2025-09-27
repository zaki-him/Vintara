import express from "express";
import Product from "../Modules/product.js";
import protect from "../Middlewares/protect.js";
import authorizeRoles from "../Middlewares/authorizeRoles.js";

const productRouter = express.Router();

//get all elements
productRouter.get("/", async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

//get specific element
productRouter.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product Not Found" });
  }

  res.status(200).json({ product });
});

//create product (admin access only)
productRouter.post(
  "/",
  protect,
  authorizeRoles(["admin"]),
  async (req, res) => {
    try {
      const { name, description, sizes, prices, category, stock, images } = req.body;

      if (!name || !prices) {
        return res
          .status(400)
          .json({ message: "Please fill the essential fields (name, prices)" });
      }

      const product = new Product({
        name,
        description,
        sizes,
        prices,
        category,
        stock,
        images,
      });
      await product.save();

      res.status(201).json({
        _id: product.id,
        product: product,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

//update product (admin only)
productRouter.put(
  "/:id",
  protect,
  authorizeRoles(["admin"], async (req, res) => {
    try {
      const { name, description, sizes, prices, category, stock, images } = req.body;

      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        { name, description, sizes, prices, category, stock, images },
        { new: true }
      );

      if (!updatedProduct) {
        return res.status(404).json({ message: "Product Not Found" });
      }

      res.status(200).json({ message: "Product Updated" });
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  })
);

//delete a product (admin only)
productRouter.delete('/:id', protect, authorizeRoles(['admin'], async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id)

    if(!deletedProduct){
      return res.status(404).json({ message: 'Product Not Found' })
    }

    res.status(200).json({ message: 'Product deleted' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}))

export default productRouter;
