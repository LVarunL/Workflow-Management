import React from "react";
import { useState } from "react";

import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router";
import {ChooseWorkspace} from "./ChooseWorkspace";
import { Signup, Login } from "./auth/AuthComponents";

import { createContext } from "react";
import AuthContext from "./auth/AuthContext";

export default function App(){

    const [isAuth, setIsAuth] = useState<Boolean>(true);
    
    const PrivateRoutes = () => {
        let auth = {'token':isAuth}
      return (
          auth.token ? <Outlet/> : <Navigate to='/login'/>
        )
      }
    return (
        <AuthContext value={true}>
        <BrowserRouter>
            <Routes>
                
                <Route element={<PrivateRoutes/>}>
                    <Route path="/" element={<ChooseWorkspace/>}></Route>
                </Route>

                <Route path="/signup" element={<Signup/>}></Route>
                <Route path="/login" element={<Login/>}></Route>

            </Routes>
        </BrowserRouter>
        </AuthContext>
    )
}