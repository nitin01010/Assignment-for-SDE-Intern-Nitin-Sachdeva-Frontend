import { useNavigate } from "react-router-dom"

const Header = () => {
    const navigate = useNavigate();
    return (
        <div className=" bg-indigo-600 flex justify-between items-center bg-opacity-25 h-[70px]">
            <h1 className=" font-bold text-xl px-20">CarsWay</h1>
            <ul className=" flex gap-10 px-20">
                <li onClick={ () => navigate('/') }>Home</li>
                <li onClick={ () => navigate('/signup') }>Signup</li>
                <li onClick={ () => navigate('/login') }>Login</li>
            </ul>
        </div>
    )
}

export default Header