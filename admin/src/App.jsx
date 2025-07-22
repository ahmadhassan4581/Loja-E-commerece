import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [product, setProduct] = useState({
    title: '',
    description: '',
    rating: 5,
    category: '',
    price: '', // ✅ Add price to initial state
    images: ['', '', '', ''],
  });

  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error("FETCH ERROR:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('image')) {
      const index = parseInt(name.replace('image', ''), 10);
      const updatedImages = [...product.images];
      updatedImages[index] = value;
      setProduct(prev => ({
        ...prev,
        images: updatedImages,
      }));
    } else {
      setProduct(prev => ({
        ...prev,
        [name]: name === 'rating' || name === 'price' ? Number(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', product);
      setMessage('Product added successfully!');
      setProduct({
        title: '',
        description: '',
        rating: 5,
        category: '',
        price: '',
        images: ['', '', '', ''],
      });
      fetchProducts();
    } catch (error) {
      console.error(error);
      setMessage('Failed to add product.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setMessage('Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      console.error("DELETE ERROR:", error);
      setMessage('Failed to delete product.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 mt-10 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Admin Panel - Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="rating"
          value={product.rating}
          onChange={handleChange}
          min="1"
          max="5"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="category"
          value={product.category}
          onChange={handleChange}
          placeholder="Category (e.g. men, women, accessories)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price (e.g. 49.99)"
          className="w-full p-2 border rounded"
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((index) => (
            <input
              key={index}
              type="text"
              name={`image${index}`}
              value={product.images[index]}
              onChange={handleChange}
              placeholder={`Image ${index + 1} URL`}
              className="w-full p-2 border rounded"
              required
            />
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add Product
        </button>
      </form>

      {message && <p className="text-center text-green-600 mb-6">{message}</p>}

      <h3 className="text-xl font-semibold mb-3">Existing Products</h3>
      <div className="space-y-3">
        {products.map(prod => (
          <div key={prod._id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <p className="font-medium">{prod.title}</p>
              <p className="text-sm text-gray-600">{prod.category}</p>
              <p className="text-sm text-gray-800 font-semibold">${prod.price.toFixed(2)}</p>
            </div>
            <button
              onClick={() => handleDelete(prod._id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
