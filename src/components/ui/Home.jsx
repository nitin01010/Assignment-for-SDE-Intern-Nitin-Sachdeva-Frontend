import Header from "./Header"
import CarLogo from '../../assit/carlogo.jpg'
import { useNavigate } from "react-router-dom"

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className=" h-[500px] flex gap-10 mt-10 w-[100%] m-auto  md:w-[90%]">
                <div className=" bg-white flex-col shadow-2xl gap-10 p-9 text-black rounded-lg flex justify-center  w-[50%] ">
                    <h1 className=" text-6xl font-bold">CarsWay</h1>
                    <p className=" text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda harum obcaecati quae ducimus quod aliquid quo! Aliquam, tenetur nihil consequuntur doloremque consequatur dolorem doloribus ipsa qui odit eius, sed quaerat.</p>
                    <button onClick={ () => navigate('/signup') } className=" w-[200px] py-3 rounded-3xl text-lg bg-black text-white ">Get Start</button>
                </div>
                <div className=" text-black rounded-lg overflow-hidden w-[50%] ">
                    <img src={ CarLogo } className=" object-contain" />
                </div>
            </div>
        </>
    )
}

export default Home