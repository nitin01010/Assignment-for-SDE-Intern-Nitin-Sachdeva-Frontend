import { useState } from 'react';
import Header from "./Header";
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: '' });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validate()) {
            try {
                const response = await axios.post(`https://assignment-for-sde-intern-nitin-sachdeva.onrender.com/api/v1/users`, formData);
                if (response.data.token) {
                    localStorage.setItem('user', response.data.token);
                    toast.success("Sign-up successful!");
                    navigate("/dashboard")
                }
            } catch (error) {
                if (error.response && error.response.data) {
                    toast.error(error.response.data.message || "Something went wrong.");
                } else {
                    toast.error("An error occurred. Please try again.");
                }
            }
        } else {
            toast.error("Please fix the errors before submitting.");
        }
    };

    return (
        <>
            <Header />
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
                <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Account</h2>
                    <form onSubmit={ handleSubmit } noValidate>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                value={ formData.username }
                                onChange={ handleChange }
                                className={ `w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.username ? 'border-red-500' : 'border-gray-300'}` }
                                placeholder="Enter your username"
                            />
                            { errors.username && <p className="text-red-500 text-sm mt-1">{ errors.username }</p> }
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={ formData.email }
                                onChange={ handleChange }
                                className={ `w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.email ? 'border-red-500' : 'border-gray-300'}` }
                                placeholder="Enter your email"
                            />
                            { errors.email && <p className="text-red-500 text-sm mt-1">{ errors.email }</p> }
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                value={ formData.password }
                                onChange={ handleChange }
                                className={ `w-full px-4 py-2 border rounded-lg focus:outline-none ${errors.password ? 'border-red-500' : 'border-gray-300'}` }
                                placeholder="Enter your password"
                            />
                            { errors.password && <p className="text-red-500 text-sm mt-1">{ errors.password }</p> }
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition duration-200"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Signup;