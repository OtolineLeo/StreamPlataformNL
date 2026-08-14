import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return(
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;