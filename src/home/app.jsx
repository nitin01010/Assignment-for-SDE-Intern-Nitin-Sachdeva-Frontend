import { Routes, Route } from "react-router-dom";
import CarDashboard from '../components/ui/carDashboard'
import Signup from '../components/ui/Signup'
import Login from '../components/ui/Login'
import Home from "../components/ui/Home";
import CarsDeatils from "../components/ui/carsDeatils";
import CreateCar from "../components/ui/CreateCar";
import CarUpdate from "../components/ui/carUpdate";

const App = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={ <Home /> }></Route>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/signup" element={ <Signup /> }></Route>
                <Route path="/dashboard" element={ <CarDashboard /> }></Route>
                <Route path="/cars/:id" element={ <CarsDeatils /> }></Route>
                <Route path="/cars/create" element={ <CreateCar /> }></Route>
                <Route path="/carUpdate/:id" element={ <CarUpdate /> }></Route>
                <Route path="*" element={ <h1>NO Page Found</h1> } />
            </Routes>
        </>
    )
}

export default App