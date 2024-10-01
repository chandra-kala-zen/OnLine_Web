// 'use client'; // This is important for client-side data fetching

// import { GetProductById } from '@/lib/productActions';
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { Button } from '@/components/ui/button'; // Adjust this import according to your project

// const ProductDetailsPage = () => {
//     const router = useRouter();
//     const { id } = router.query; // Get the product ID from the URL

//     const [product, setProduct] = useState<any>(null);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         if (id) {
//             // Fetch product by ID using the server action
//             const fetchProduct = async () => {
//                 setLoading(true);
//                 try {
//                     const response = await GetProductById(id);
//                     if (response.success) {
//                         setProduct(response.data);
//                     } else {
//                         setError(response.error);
//                     }
//                 } catch (err) {
//                     setError("Failed to fetch product details.");
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchProduct();
//         }
//     }, [id]);

//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error}</p>;
//     if (!product) return <p>Product not found</p>;

//     return (
//         <div>
//             <h1>{product.productname}</h1>
//             <p>Price: {product.price}</p>
//             <p>Quantity: {product.quantity}</p>
//             {/* Edit and Delete buttons */}
//             <Button onClick={() => router.push(`/products/${id}/edit`)}>Edit</Button>
//             <Button onClick={() => router.push(`/products/${id}/delete`)}>Delete</Button>
//         </div>
//     );
// };

// export default ProductDetailsPage;
