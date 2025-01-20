import React, { createContext, useState } from "react";

export const HotelDataContext = createContext();

const HotelDataProvider = ({ children }) => {
    const [response, setResponse] = useState(null);

    return (
        <HotelDataContext.Provider value={{ response, setResponse }}>
            {children}
        </HotelDataContext.Provider>
    );
};

export default HotelDataProvider; 
