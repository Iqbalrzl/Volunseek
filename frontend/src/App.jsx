import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { AboutUs } from "./pages/AboutUs";
import { DetailPage } from "./pages/DetailPage";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { MoreEvent } from "./pages/MoreEvent";
import { UserProfilePage } from "./pages/UserProfilePage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/detail-activity/:eventId" element={<DetailPage />} />
        <Route path="/more-event" element={<MoreEvent />} />
        <Route path="/user-profile" element={<UserProfilePage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
