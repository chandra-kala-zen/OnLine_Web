'use client';

import React, { useEffect, useState } from 'react';
import { GetCartItems, RemoveFromCart, EditCrud } from '@/lib/productActions';
import { toast } from 'react-toastify';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CartPage: React.FC = () => {
    const [cartItems, setCartItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [editingItemId, setEditingItemId] = useState<string | null>(null);
    const [editData, setEditData] = useState<{ productname: string; price: number; quantity: number } | null>(null);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        setLoading(true);
        try {
            const response = await GetCartItems();
            if (response.success) {
                setCartItems(response.data);
            } else {
                setErrorMessage("Error fetching cart items: " + response.error);
                toast.error("Error fetching cart items: " + response.error);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
            setErrorMessage("Error fetching cart items: " + error);
            toast.error("Error fetching cart items: " + error);
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveFromCart = async (id: string) => {
        const response = await RemoveFromCart(id);
        if (response.success) {
            setCartItems(cartItems.filter(item => item._id !== id));
            toast.success("Product removed from cart");
        } else {
            toast.error("Error removing product: " + response.error);
        }
    };

    const handleEditClick = (item: any) => {
        setEditingItemId(item._id);
        setEditData({
            productname: item.productname,
            price: item.price,
            quantity: item.quantity,
        });
    };

    const handleEditSubmit = async (id: string) => {
        if (editData) {
            const response = await EditCrud(id, editData);
            if (response.success) {
                setCartItems(cartItems.map(item => item._id === id ? response.data : item));
                toast.success("Product updated successfully");
                setEditingItemId(null);
                setEditData(null);
            } else {
                toast.error("Error updating product: " + response.error);
            }
        }
    };

    return (
        <div>
            <h1 className="text-center text-2xl font-bold mb-5">Cart Items</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="grid grid-cols-1 w-[80%] m-auto md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {cartItems.length === 0 ? (
                        <p>Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <Card key={item._id} className="shadow-lg">
                                <CardHeader>
                                <div className='w-[330px] h-[100px] border- rounded-[10px] border-gray-00'>
                                        <img className="m-auto" src='item.png' alt={item.productname} />
                                </div>
                                    <CardTitle>{editingItemId === item._id ? "Edit Product" : item.productname}</CardTitle>
                                    <CardDescription>Price: {item.price}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {editingItemId === item._id ? (
                                        <>

                                            {/* <Input
                                                type="text"
                                                value={editData?.productname}
                                                onChange={(e) => setEditData({ ...editData!, productname: e.target.value })}
                                                placeholder="Product Name"
                                                className="mb-2"
                                            />
                                            <Input
                                                type="number"
                                                value={editData?.price}
                                                onChange={(e) => setEditData({ ...editData!, price: Number(e.target.value) })}
                                                placeholder="Price"
                                                className="mb-2"
                                            /> */}
                                            <Input
                                                type="number"
                                                value={editData?.quantity}
                                                onChange={(e) => setEditData({ ...editData!, quantity: Number(e.target.value) })}
                                                placeholder="Quantity"
                                                className="mb-2"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <p>Quantity: {item.quantity}</p>
                                            <p>Total: ₹ {(item.price * item.quantity)}</p>
                                        </>
                                    )}
                                </CardContent>
                                <CardFooter className="flex justify-between">
                                    {editingItemId === item._id ? (
                                        <>
                                            <Button onClick={() => handleEditSubmit(item._id)} className="mr-2">Save</Button>
                                            <Button variant="outline" onClick={() => setEditingItemId(null)}>Cancel</Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button onClick={() => handleRemoveFromCart(item._id)} className="mr-2 bg-orange-400">Remove</Button>
                                            <Button variant="outline" onClick={() => handleEditClick(item)}  className="mr-2 bg-blue-400">Edit</Button>
                                        </>
                                    )}
                                </CardFooter>
                            </Card>
                        ))
                    )}
                </div>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
    );
};

export default CartPage;
