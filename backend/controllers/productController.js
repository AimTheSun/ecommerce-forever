
import {v2 as cloudinary } from 'cloudinary';
import productModel from '../models/productModel.js';

// FUNCTION FOR ADD PRODUCT IN THE DATABASE
const addProduct = async (req, res) => {
    try {
      const {
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        bestseller,
      } = req.body;
  
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

        console.log(name, description, price, category, subCategory, sizes, bestseller)
        console.log(image1, image2, image3, image4)

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined);        // UPLOADING IMAGES IN THE CLOUDINARY
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
              let result = await cloudinary.uploader.upload(item.path, {
                resource_type: "image",
              });
              return result.secure_url;
            })
          );
          
          const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            bestseller: bestseller === "true" ? true : false,
            date: Date.now(),
          };
          console.log(productData);

          const product = new productModel(productData);
          await product.save(); // SAVE THE PRODUCT IN THE DATABASE

          res.json({ success: true, message: "Product Added Successfully." });
        } catch (error) {
          console.log(error);
          res.json({ success: false, message: error.message });
        }
      };

// FUNCTION FOR LIST PRODUCT
const listProducts = async (req, res) => {
 try {
    const products = await productModel.find({});
    res.json({success: true, products})

 } catch (error) {
    console.log(error)
    res.json({success: false, message: error.message})
 }
}

// FUNCTION FOR REMOVE PRODUCT
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// FUNCTION FOR SINGLE PRODUCT INFO
const singleProduct = async (req, res) => {
    try {
        const {productId } = req.body;
        const product = await productModel.findById(productId);
        res.json({success: true, product})

     } catch (error) {
        console.log(error)
            res.json({success: false, message: error.message})
    }
 
}

export {addProduct, listProducts, removeProduct, singleProduct};