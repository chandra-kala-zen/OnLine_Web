// Show the products
// Filter the products
// Add to product to cart
// Add the quatitity
// Calcualate the Total price

import mongoose, { Document, Schema, Model } from 'mongoose';

interface Products extends Document {
    productname: string;
    price: number;
    quantity: number;
    total: number;
    isDeleted?: boolean; // Soft delete flag
    inCart?: boolean; // Flag to check if the product is in the cart
}

const ProductSchema: Schema<Products> = new Schema({
    productname: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    isDeleted: { type: Boolean, default: false }, // Default to not deleted
    inCart: { type: Boolean, default: false } // Default to not in cart
});

// Model definition
const productModel: Model<Products> = mongoose.models.Products || mongoose.model<Products>('Products', ProductSchema);

export default productModel;



// import mongoose, { Document, Schema, Model } from 'mongoose';

// // Interface to define the structure of the Products document
// interface Products extends Document {
//     productname: string;
//     productImage: string; // To store the URL/path of the uploaded image
//     price: number;
//     quantity: number;
//     total: number;
// }

// // Mongoose Schema for the Products model
// const ProductSchema: Schema<Products> = new Schema({
//     productname: { type: String, required: true },
//     productImage: {
//         type: String,
//         required: true,
//         validate: {
//             validator: function (value: string) {
//                 // Validate that the image has an allowed extension (svg, png, jpeg)
//                 return /\.(svg|png|jpe?g)$/i.test(value); // Case-insensitive regex check
//             },
//             message: "Invalid image format. Only .svg, .png, .jpg, and .jpeg files are allowed."
//         }
//     },
//     price: { type: Number, required: true },
//     quantity: { type: Number, required: true },
//     total: { type: Number, required: true }
// });

// // Create or retrieve the Products model from Mongoose
// const productModel: Model<Products> = mongoose.models.Products || mongoose.model<Products>('Products', ProductSchema);

// export default productModel;
