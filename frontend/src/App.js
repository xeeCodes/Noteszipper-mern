import "./App.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import LandingPage from "./screens/landingPage/LandingPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNotes from "./screens/myNotes/MyNotes";
import LoginPage from "./screens/loginPage/LoginPage";
import RegisterPage from "./screens/registerPage/RegisterPage";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="p-0 " >
        <Routes>
          <Route path="/" element={<LandingPage />} exact/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route path="/mynotes" element={<MyNotes />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
  