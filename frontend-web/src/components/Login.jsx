// frontend-web/src/components/Login.jsx
import React, { useState } from 'react';
import api from '../api/axiosInstance';

const Login = () => {
    const [credentials, setCredentials] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/token/', credentials);
            // Architect's Tip: Store tokens securely
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            
            alert('Login Successful! Token stored.');
            window.location.href = '/dashboard'; // Or use react-router-dom
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 rounded-xl bg-white p-8 shadow-lg">
                <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">School ERP Login</h2>
                
                {error && <p className="mb-4 text-sm text-red-500">{error}</p>}

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input 
                        type="text" name="username" onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 outline-none"
                        required 
                    />
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                        type="password" name="password" onChange={handleChange}
                        className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring-blue-500 outline-none"
                        required 
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full rounded-md bg-blue-600 py-2 text-white transition-hover hover:bg-blue-700 cursor-pointer"
                >
                    Sign In
                </button>
            </form>
        </div>
    );
};

export default Login;