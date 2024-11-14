import { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateCar = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [tags, setTags] = useState("");
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const usersToken = localStorage.getItem('user');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const validateForm = () => {
        const formErrors = {};

        if (!title) formErrors.title = "Title is required";
        if (!description) formErrors.description = "Description is required";
        if (!tags) formErrors.tags = "Tags are required";
        // if (!image) formErrors.image = "Image upload is required";

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                const carData = { title, description, tags, image };

                const response = await axios.post("https://assignment-for-sde-intern-nitin-sachdeva.onrender.com/api/v1/cars", carData, {
                    headers: {
                        Authorization: `Bearer ${usersToken}`, // Sending the JWT token in the headers
                    },
                });

                toast.success("Car created successfully!",);
                console.log(response.data);
                navigate("/dashboard");

            } catch (error) {
                toast.error("Error creating car. Please try again.");
                console.error(error);
            }
        } else {
            toast.error("Please fill all fields correctly");
        }
    };

    return (
        <div>
            <DashboardHeader />
            <div className="mt-20 w-[100%] md:w-[80%] m-auto">
                <h1 className="text-white text-2xl font-semibold mb-4">Create a New Car</h1>
                <form onSubmit={ handleSubmit } className="space-y-4">
                    <div>
                        <label htmlFor="title" className="text-white">Title:</label>
                        <input
                            type="text"
                            id="title"
                            value={ title }
                            onChange={ (e) => setTitle(e.target.value) }
                            className="w-full outline-none py-2 p-2 mt-1 rounded"
                            placeholder="Enter car title"
                        />
                        { errors.title && <p className="text-red-500 text-sm mt-1">{ errors.title }</p> }
                    </div>
                    <div>
                        <label htmlFor="description" className="text-white">Description:</label>
                        <textarea
                            id="description"
                            value={ description }
                            onChange={ (e) => setDescription(e.target.value) }
                            className="w-full p-2 py-2 outline-none mt-1 rounded"
                            placeholder="Enter car description"
                            rows="4"
                        />
                        { errors.description && <p className="text-red-500 text-sm mt-1">{ errors.description }</p> }
                    </div>
                    <div>
                        <label htmlFor="tags" className="text-white">Tags:</label>
                        <input
                            type="text"
                            id="tags"
                            value={ tags }
                            onChange={ (e) => setTags(e.target.value) }
                            className="w-full outline-none py-2 p-2 mt-1 rounded"
                            placeholder="Enter tags (comma separated)"
                        />
                        { errors.tags && <p className="text-red-500 text-sm mt-1">{ errors.tags }</p> }
                    </div>
                    <div>
                        <label htmlFor="image" className="text-white">Image Upload:</label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={ handleImageChange }
                            className="w-full outline-none py-2 p-2 mt-1 rounded"
                        />
                        { errors.image && <p className="text-red-500 text-sm mt-1">{ errors.image }</p> }
                        { image && <img src={ image } alt="Preview" className="mt-4 w-32 h-32 object-cover" /> }
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="w-[200px] bg-blue-600 text-white py-2 mt-4 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateCar;