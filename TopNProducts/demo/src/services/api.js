import axios from 'axios';

const BASE_URL = 'http://20.244.56.144/test/companies';

export const fetchTopProducts = async (company, category, minPrice, maxPrice) => {
    try {
        const url = `${BASE_URL}/${company}/categories/${category}/products/top-n?minPrice=${minPrice}&maxPrice=${maxPrice}`;
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};
