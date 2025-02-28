import ReactDOM from 'react-dom/client';
import React from 'react';
import App from './pages/App';
import users from "../dataset/users.json"


function setupToyData() {
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Toy data has been initialized in localStorage.");
    } else {
        // const blob = new Blob([localStorage.getItem("users")], { type: "application/json" });
        // const a = document.createElement("a");
        // a.href = URL.createObjectURL(blob);
        // a.download = "backup_toy_data.json";
        // document.body.appendChild(a);
        // a.click();
        // document.body.removeChild(a);
        console.log("Toy data already exists in localStorage.");
    }
}
function Index() {
    setupToyData();
    return <App />;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Index />);