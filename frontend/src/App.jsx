
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Refer from "./pages/Refer";
import NoPage from "./pages/NoPage";
import "./App.css"
import { useDarkMode } from "./context/DarkModeContext";

function App(){
    const {DarkMode} = useDarkMode()
    return(
    <div className={`${DarkMode?"dark":" "}`}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element = {<Home/>} />
                <Route path="/refer" element = {<Refer/>}/>
                <Route path="*" element={<NoPage/>}/>
            </Routes>
        </BrowserRouter>
    </div>
    )
}
export default App