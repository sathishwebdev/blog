import React from "react";
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import App from "./App";
import { ContextProvider } from "./context/Context";

ReactDOM.render(
  <React.StrictMode>
    <ContextProvider>
      <App />
      <div style={{
        position: "fixed",
        bottom : "0",
        backgroundColor: "#252525",
        height:"50px",
        width:"100%",
        color:"whitesmoke",
        textAlign:"center",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
      }}>
        <p>Developed by <a href="https://sathishwebdev.netlify.app" target="_blank" rel="noreferrer"> Sathish Kumar S</a>
      </p></div>
    </ContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
