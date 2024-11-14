import { useNavigate } from "react-router-dom"

const DashboardHeader = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div className=" bg-indigo-600 flex justify-between items-center bg-opacity-25 h-[70px]">
                <h1 className=" font-bold text-xl px-20">CarsWay</h1>
                <ul className=" flex gap-10 px-20">
                    <li onClick={ () => navigate('/dashboard') }>Dashboard</li>
                    <li onClick={ () => navigate('/cars/create') }>Create Cars</li>
                </ul>
            </div>
        </div>
    )
}

export default DashboardHeader