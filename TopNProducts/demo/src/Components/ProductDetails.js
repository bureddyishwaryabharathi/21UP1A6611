import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchTopProducts } from '../services/api';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const getProduct = async () => {
        try {
            // As we don't have a specific API to fetch a single product, fetch all products and filter the required one
            const data = await fetchTopProducts('AMZ', 'Phone', 0, 1000); // Example, adjust parameters as needed
            const product = data.find(p => p.id === id);
            setProduct(product);
        } catch (error) {
            console.error('Error fetching product:', error);
        }
        };
        getProduct();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <h1>{product.name}</h1>
        <p>Company: {product.company}</p>
        <p>Category: {product.category}</p>
        <p>Price: {product.price}</p>
        <p>Rating: {product.rating}</p>
        <p>Discount: {product.discount}</p>
        <p>Availability: {product.availability}</p>
        </div>
    );
};

export default ProductDetails;
