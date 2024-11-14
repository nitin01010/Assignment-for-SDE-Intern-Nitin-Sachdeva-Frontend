import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import DashboardHeader from "./DashboardHeader";
import { toast } from "react-toastify";

const CarsDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [carData, setCarData] = useState(null);

    const deleteCar = async (carId) => {
        try {

            const response = await axios.delete("https://assignment-for-sde-intern-nitin-sachdeva.onrender.com/api/v1/cars/delete", { data: { id: carId } });
            toast.success('Car deleted successfully!');
            navigate("/dashboard");

            setCarData(null);
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.error || "Error deleting car");
        }
    };

    useEffect(() => {
        const fetchCarData = async () => {
            try {
                const response = await axios.post("https://assignment-for-sde-intern-nitin-sachdeva.onrender.com/api/v1/cars/find", { id });
                setCarData(response.data.cardata);
            } catch (error) {
                toast.error(error.response?.data?.error || "Error fetching car data");
            }
        };
        if (id) {
            fetchCarData();
        }
    }, [id]);

    if (!carData) {
        return <div>Loading car data...</div>;
    }

    return (
        <div>
            <DashboardHeader />
            <div className="m-auto w-[100%] md:w-[90%] text-white p-3 mt-5">
                <img
                    src={ carData.image || "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&h=1280&q=80" }
                    className="object-cover w-full h-[600px] rounded-[16px] shadow-2xl"
                />
                <p className="mt-2 text-xl p-2">{ carData.title }</p>
                <p className="text-gray-400 p-2">{ carData.description }</p>
                <p className="text-gray-400 p-2">{ carData.tags }</p>

                <div className="flex gap-5 mt-10 justify-end">
                    <button
                        className="py-2 rounded-3xl text-white shadow-2xl w-[100px] bg-black"
                        onClick={ () => deleteCar(id) }
                    >
                        Delete
                    </button>
                    <button
                        className="py-2 rounded-3xl text-white shadow-2xl w-[100px] bg-black"
                        onClick={ () => navigate(`/carUpdate/${id}`) }
                    >
                        Update
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CarsDetails;
