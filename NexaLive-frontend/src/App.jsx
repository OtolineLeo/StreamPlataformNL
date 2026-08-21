import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./pages/Login/login";
import Home from "./pages/Home/home";
import Categories from "./pages/Categories/Categories";
import Register from "./pages/register/register";
import { AuthProvider } from "./context/AuthContext";
import GuestRoute from "./components/GuestRoute";
import CategoryDetail from "./pages/CategoryDetail/CategoryDetail";

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <div className="h-screen flex flex-col">
                  <Navbar />
                  <main className="flex-1 overflow-y-auto">
                    <Routes>
                      <Route path="/" element={<Home />} />

                      <Route path="/login" element={
                          <GuestRoute> 
                            <Login /> 
                          </GuestRoute>
                        } 
                      />

                      <Route path="/register" element={
                          <GuestRoute>
                            <Register /> 
                          </GuestRoute>
                        }
                       />  

                      <Route path="/categories" element={<Categories/>}/>
                          
                      <Route path="/categories/:slug" element={<CategoryDetail />} />

                    </Routes>
                  </main>
                </div>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;