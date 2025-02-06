import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./flags.css";
import App from "./App.jsx";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Provider } from "react-redux";
import store from "./App/store";
import HotelDataProvider from "./Context/HotelData.jsx";
import AuthDataProvider from "./Context/AuthData.jsx";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HotelDataProvider>
      <AuthDataProvider>
        <App />
      </AuthDataProvider>
    </HotelDataProvider>
  </Provider>
);
