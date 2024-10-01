

'use server';

import productModel from "@/models/product";
import connect from "@/utils/db";

// Create a new product
export default async function CreateProduct(data: { productname: string; price: number; quantity: number; total: number }) {
    try {
        await connect();
        const ProductData = await productModel.create({ ...data });
        console.log("data posted successfully", ProductData);
        return { created: true, data: ProductData };
    } catch (error) {
        console.error("error", error);
        return { created: false, error: "internal error" };
    }
}

// Get all active (non-deleted) products
export async function GetActiveProducts() {
    try {
        await connect();
        const products = await productModel.find({ isDeleted: false }).exec(); // Get all non-deleted products
        console.log("Active products retrieved successfully", products);
        return { success: true, data: products };
    } catch (error) {
        console.error("Error while retrieving active products", error);
        return { success: false, error: "Internal error" };
    }
}

// Get all products that are in the cart
export async function GetCartItems() {
    try {
        await connect();
        const products = await productModel.find({ isDeleted: false, inCart: true }).exec(); // Get all products in the cart
        console.log("Cart items retrieved successfully", products);
        return { success: true, data: products };
    } catch (error) {
        console.error("Error while retrieving cart items", error);
        return { success: false, error: "Internal error" };
    }
}

export const GetProductById = async (productId: string) => {
    try {
      await connect(); 
      const product = await productModel.findById(productId); // Find the product by ID
      if (!product) {
        return { success: false, error: 'Product not found' };
      }
      return { success: true, data: product };
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      return { success: false, error: 'Error fetching product by ID' };
    }
  };
// Edit a product
export async function EditCrud(id: string, data: { productname: string; price: number; quantity: number; total?: number }) {
    try {
        await connect();
        data.total = data.price * data.quantity;

        const updatedData = await productModel.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        ).exec();

        if (!updatedData) {
            return { success: false, error: "Data not found" };
        }

        console.log("Data updated successfully", updatedData);
        return { success: true, data: updatedData };
    } catch (error) {
        console.error("Error while updating data", error);
        return { success: false, error: "Internal error" };
    }
}

// Soft delete a product
export async function DeleteCrud(id: string) {
    try {
        await connect();
        const deletedData = await productModel.findOneAndUpdate(
            { _id: id },
            { isDeleted: true },
            { new: true }
        ).exec();

        if (!deletedData) {
            return { success: false, error: "Product not found" };
        }

        console.log("Product soft deleted successfully", deletedData);
        return { success: true, data: deletedData };
    } catch (error) {
        console.error("Error while soft deleting product", error);
        return { success: false, error: "Internal error" };
    }
}

// Add product to the cart
export async function AddToCart(id: string) {
    try {
        await connect();
        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: id, isDeleted: false }, 
            { inCart: true }, 
            { new: true } 
        ).exec();

        if (!updatedProduct) {
            return { success: false, error: "Product not found or already deleted" };
        }

        console.log("Product added to cart successfully", updatedProduct);
        return { success: true, data: updatedProduct };
    } catch (error) {
        console.error("Error while adding product to cart", error);
        return { success: false, error: "Internal error" };
    }
}

// Remove product from the cart
export async function RemoveFromCart(id: string) {
    try {
        await connect();
        const updatedProduct = await productModel.findOneAndUpdate(
            { _id: id, isDeleted: false }, // Ensure the product is not deleted
            { inCart: false }, // Set inCart to false
            { new: true } // Return the updated document
        ).exec();

        if (!updatedProduct) {
            return { success: false, error: "Product not found or already deleted" };
        }

        console.log("Product removed from cart successfully", updatedProduct);
        return { success: true, data: updatedProduct };
    } catch (error) {
        console.error("Error while removing product from cart", error);
        return { success: false, error: "Internal error" };
    }
}
