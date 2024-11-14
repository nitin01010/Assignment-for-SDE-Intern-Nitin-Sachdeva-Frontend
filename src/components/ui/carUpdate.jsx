import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";

const CarUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [carData, setCarData] = useState({
        title: '',
        description: '',
        tag: '',
        image: ''
    });

    const [loading, setLoading] = useState(true);

    // Fetch car data on component mount
    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.post(
                    `https://assignment-for-sde-intern-nitin-sachdeva.onrender.com/api/v1/cars/find/`,
                    { id }
                );
                const data = response.data.cardata;
                setCarData({
                    title: data?.title || '',
                    description: data?.description || '',
                    tag: data?.tags?.join(", ") || '', // Ensure tags are joined as a string
                    image: data?.image || ''
                });
                setLoading(false);
            } catch (error) {
                console.error("Error fetching car data:", error);
                setLoading(false);
            }
        };
        fetchCarData();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCarData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the data for submission
        const formattedTags = carData.tag.split(/\s*,\s*/); // Split tags into an array

        try {
            // Send the update request
            const response = await axios.post(
                `https://assignment-for-sde-intern-nitin-sachdeva.onrender.com/api/v1/cars/update`,
                {
                    id,
                    title: carData.title,
                    description: carData.description,
                    tags: formattedTags,
                    image: carData.image
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            // Handle response
            if (response.status === 200) {
                // If successful, navigate back to the dashboard
                navigate("/dashboard");
            } else {
                console.error("Error updating car:", response.data.error);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading state while fetching data
    }

    return (
        <div>
            <DashboardHeader />
            <div className="max-w-2xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold mb-6 text-center">Update Car Details</h2>
                <form onSubmit={ handleSubmit } className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={ carData.title }
                            onChange={ handleChange }
                            placeholder="Enter car title"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Description:</label>
                        <textarea
                            name="description"
                            value={ carData.description }
                            onChange={ handleChange }
                            placeholder="Enter car description"
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Tags:</label>
                        <input
                            type="text"
                            name="tag"
                            value={ carData.tag }
                            onChange={ handleChange }
                            placeholder="Enter tags (comma separated)"
                            className="w-full outline-none py-2 p-2 mt-1 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">Image URL:</label>
                        <input
                            type="text"
                            name="image"
                            value={ carData.image }
                            onChange={ handleChange }
                            placeholder="Enter image URL"
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
                    >
                        Update Car
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CarUpdate;
