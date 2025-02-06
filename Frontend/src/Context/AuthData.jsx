import React, { createContext, useState } from "react";

export const AuthDataContext = createContext();

const AuthDataProvider = ({ children }) => {
    const [authResponse, setAuthResponse] = useState(null);

    return (
        <AuthDataContext.Provider value={{ authResponse, setAuthResponse }}>
            {children}
        </AuthDataContext.Provider>
    );
};

export default AuthDataProvider; 
