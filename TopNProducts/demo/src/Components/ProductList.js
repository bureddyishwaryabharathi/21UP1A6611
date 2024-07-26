import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchTopProducts } from '../services/api';

const companies = ['AMZ', 'FLP', 'SNP', 'MYN', 'AZO'];
const categories = ['Phone', 'Computer', 'TV', 'Earphones', 'Tablet', 'Charger', 'Mouse', 'KeyPad', 'Bluetooth', 'Laptop'];

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(companies[0]);
    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000);

    useEffect(() => {
        const getProducts = async () => {
        try {
            const data = await fetchTopProducts(selectedCompany, selectedCategory, minPrice, maxPrice);
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        };
        getProducts();
    }, [selectedCompany, selectedCategory, minPrice, maxPrice]);

    return (
        <div>
        <h1>Product List</h1>
        <div>
            <label>
            Company:
            <select value={selectedCompany} onChange={(e) => setSelectedCompany(e.target.value)}>
                {companies.map(company => (
                <option key={company} value={company}>{company}</option>
                ))}
            </select>
            </label>
            <label>
            Category:
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map(category => (
                <option key={category} value={category}>{category}</option>
                ))}
            </select>
            </label>
            <label>
            Min Price:
            <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </label>
            <label>
            Max Price:
            <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </label>
        </div>
        <ul>
            {products.map(product => (
            <li key={product.id}>
                <Link to={`/product/${product.id}`}>{product.name}</Link>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default ProductList;
