
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Profile from "./pages/Studentdashboard/components/Profile";
import Auth from "./pages/Auth/Auth";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import Jobform from "./pages/DashboardPage/components/Jobform";
import Jobdetail from "./pages/DashboardPage/components/Jobdetail";
import Studentdashboard from "./pages/Studentdashboard/Studentdashboard";
import Projectform from "./pages/Studentdashboard/components/Projectform";

export default function App() {
  return (
    <>
      <BrowserRouter>
        {/* <div>
      <div>
      <Navbar/>
      </div> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/jobform" element={<Jobform />} />
          <Route path="/jobdetail" element={<Jobdetail />} />
          <Route path="/studentdashboard" element={<Studentdashboard />} />
          <Route path="/projectform" element={<Projectform/>}/>
        </Routes>
        {/* </div> */}
      </BrowserRouter>
    </>
  );
}
