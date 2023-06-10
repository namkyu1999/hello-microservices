import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Suspense } from "react";
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";

const Router = () => {
  return (
      <Suspense fallback={null}>
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/"element={ <Navigate to="/login" /> } />
        </Routes>
      </Suspense>
  );
};

export default function App(){
  return (
      <BrowserRouter>
        <Router />
      </BrowserRouter>
  );
}
