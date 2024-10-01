'use client'

import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormDescription,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import CreateProduct from "@/lib/productActions";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProductSchema = z.object({
    productname: z.string().min(1, "Product name is required").max(50, "Product name is too long"),
    price: z
        .number({ invalid_type_error: "Price must be a number" })
        .min(1, "Price must be greater than 0")
        .max(120000, "Price must be less than or equal to 120,000"),
    quantity: z
        .number({ invalid_type_error: "Quantity must be a number" })
        .min(1, "Quantity must be greater than 0")
        .max(50, "Quantity must be less than or equal to 50"),
    total: z.number().min(1, "Total must be greater than 0"),
});

interface ProductFormData {
    productname: string;
    price: number;
    quantity: number;
    total: number;
}

function ProductPage() {
    const router = useRouter();
    const methods = useForm<ProductFormData>({
        resolver: zodResolver(ProductSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        shouldFocusError: true,
    });

    const {
        register,
        handleSubmit,
        reset,
        setValue, 
        watch,
        formState: { errors },
    } = methods;
    
    const price = watch("price", 0);
    const quantity = watch("quantity", 0);

    useEffect(() => {
       
        setValue("total", price * quantity);
    }, [price, quantity, setValue]);

    const onSubmit = async (data: ProductFormData) => {
        try {
            console.log("Submitting data:", data);
            const result = await CreateProduct(data);
            if (result.created) {
                reset();
                console.log("Data posted successfully", result.data);
                router.push('/getAll');
            } else {
                console.error("Posting data failed", result);
            }
        } catch (error) {
            console.error("Error while submitting data:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="w-full max-w-lg border-gray-300 border-2 p-6 rounded-[10px] shadow-lg">
                <h1 className="text-center text-2xl font-bold mb-6">✨✨ Products</h1>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input className="w-full" placeholder="Enter product name" {...register("productname")} />
                                </FormControl>
                                <FormDescription>This is your public display product name.</FormDescription>
                                {errors.productname && <FormMessage>{errors.productname.message}</FormMessage>}
                            </FormItem>

                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input
                                        className="w-full"
                                        placeholder="Enter price"
                                        type="number"
                                        {...register("price", { valueAsNumber: true })}
                                    />
                                </FormControl>
                                <FormDescription>This is your product price.</FormDescription>
                                {errors.price && <FormMessage>{errors.price.message}</FormMessage>}
                            </FormItem>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormItem>
                                <FormLabel>Quantity</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Enter quantity"
                                        type="number"
                                        {...register("quantity", { valueAsNumber: true })}
                                    />
                                </FormControl>
                                <FormDescription>This is your product quantity.</FormDescription>
                                {errors.quantity && <FormMessage>{errors.quantity.message}</FormMessage>}
                            </FormItem>

                            <FormItem>
                                <FormLabel>Total</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Total amount"
                                        type="number"
                                        value={price * quantity} 
                                        readOnly
                                        {...register("total", { valueAsNumber: true })}
                                    />
                                </FormControl>
                                <FormDescription>Total (Price × Quantity) is calculated automatically.</FormDescription>
                                {errors.total && <FormMessage>{errors.total.message}</FormMessage>}
                            </FormItem>
                        </div>

                        {/* <div className="flex justify-center">
                            <img className="w-[150px] h-[150px]" src="/jel.png" alt="Product Image" />
                        </div> */}

                        <Button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800" type="submit">
                            Submit
                        </Button>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

export default ProductPage;
