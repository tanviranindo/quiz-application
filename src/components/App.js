import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthContext";
import "../styles/App.css";
import Layout from "./Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Signup from "./pages/Signup";
import PrivateOutlet from "./PrivateOutlet";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="quiz" element={<PrivateRoute><Quiz /></PrivateRoute>}></Route> */}
            {/* <Route path="result" element={<PrivateRoute><Result /></PrivateRoute>}></Route> */}
            <Route path="/*" element={<PrivateOutlet />}>
              <Route path="quiz" element={<Quiz />}></Route>
              <Route path="result" element={<Result />}></Route>
            </Route>
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;