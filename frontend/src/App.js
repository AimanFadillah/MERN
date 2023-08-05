// import { BrowserRouter, Route, Routes } from "react-router-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Barang from "./components/Barang";
import BuatBarang from "./components/BuatBarang";
import EditBarang from "./components/EditBarang";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Barang />} path="/" />
        <Route element={<BuatBarang />} path="/Create" />
        <Route element={<EditBarang />} path="/Edit/:id" />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
