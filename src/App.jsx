import "./App.scss";
import { Route, Routes } from 'react-router-dom';
import ChamDiem from "./pages/score/ChamDiem";




const App = () => (
    <Routes>
      <Route>
        {/* <Route path="/" element={<Home></Home>}></Route> */}
        <Route path="/cham-diem" element={<ChamDiem></ChamDiem>}></Route>
        {/* <Route path="/dang-nhap" element={<Login></Login>}></Route> */}
      </Route>
    </Routes>
);


export default App;
