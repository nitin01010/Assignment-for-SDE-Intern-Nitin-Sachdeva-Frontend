import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import axios from "axios";

const CardCars = ({ title, description, tag, idx }) => {
    const navigate = useNavigate();
    return (
        <div onClick={ () => navigate(`/cars/${idx}`) } className="text-black p-3 bg-white rounded-[16px] max-w-[350px]">
            <img
                src="https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90y..." // Example image URL
                className="object-cover h-48 w-96 rounded-[16px] shadow-2xl"
                alt="Car"
            />
            <p className="mt-2 text-xl p-2">{ title }</p>
            <p className="text-gray-400 p-2">
                { description.split(" ").length > 10
                    ? description.split(" ").slice(0, 10).join(" ") + "..."
                    : description }
            </p>
            <p className="text-gray-400 p-2">{ tag }</p>
        </div>
    );
};

const CarDashboard = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const token = localStorage.getItem("user");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                if (!token) {
                    setError("Please log in first");
                    setLoading(false);
                    navigate("/signup");
                    return;
                }
                const response = await axios.get("https://assignment-for-sde-intern-nitin-sachdeva.onrender.com/api/v1/user", {
                    headers: {
                        authorization: `${token}`,
                    },
                });
                setCars(response.data.user.cars);
                setFilteredCars(response.data.user.cars);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setError("Error fetching car data");
                navigate('/signup')
                setLoading(false);
            }
        };

        fetchCars();
    }, [token]);

    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = cars.filter((car) =>
            car.title.toLowerCase().includes(query) || car.description.toLowerCase().includes(query)
        );
        setFilteredCars(filtered);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{ error }</div>;
    }

    return (
        <div>
            <DashboardHeader />
            <h1 className="text-4xl font-bold px-20 mt-10">Dashboard</h1>
            <div className="p-1 w-[100%] mt-6 md:w-[90%] m-auto flex justify-end">
                <input
                    type="text"
                    placeholder="Search Cars..."
                    value={ searchQuery }
                    onChange={ handleSearchChange }
                    className="py-2 w-[300px] shadow-2xl outline-none rounded-3xl px-4"
                />
            </div>
            <div className="grid grid-cols-4 gap-10 w-[100%] mt-6 md:w-[90%] m-auto">
                { filteredCars.length > 0 ? (
                    filteredCars.map((car, idx) => (
                        <CardCars
                            key={ car._id } // Use _id for the key if it's a MongoDB document
                            title={ car.title }
                            description={ car.description }
                            tag={ car.tag?.join(", ") } // Assuming tags are an array
                            idx={ car._id } // Using _id for unique identifier
                        />
                    ))
                ) : (
                    <div>No cars found.</div>
                ) }
            </div>
        </div>
    );
};

export default CarDashboard;
