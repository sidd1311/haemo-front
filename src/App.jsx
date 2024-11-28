import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Footer from "./components/Footer/Footer";
import AdminHome from "./components/Admin/AdminHome/AdminHome";
import AdminSideBar from "./components/Admin/AdminSideBar/AdminSideBar";
import AdminDonors from "./components/Admin/AdminDonors/AdminDonors";
import AdminProspects from "./components/Admin/AdminProspects/AdminProspects";
import AdminOrder from "./components/Admin/AdminOrder/AdminOrder";
import AdminCharts from "./components/Admin/AdminCharts/AdminCharts";
import Donors from "./components/Donors/Donors";
import Contact from "./components/Contact/Contact";
import About from "./components/About/About";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/admin/*"
          element={
            <div style={{ display: "flex" }}>
              <AdminSideBar />
              <div style={{ marginLeft: "250px", width: "100%" }}>
                <Routes>
                  <Route path="/" element={<AdminHome />} />
                  <Route path="/home" element={<AdminHome />} />
                  <Route path="/donors" element={<AdminDonors />} />
                  <Route path="/prospects" element={<AdminProspects />} />
                  <Route path="/orders" element={<AdminOrder />} />
                  <Route path="/charts" element={<AdminCharts />} />
                  
                </Routes>
              </div>
            </div>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/donors" element={<Donors />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />}/>
              </Routes>
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
