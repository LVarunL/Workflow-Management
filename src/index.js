import ReactDOM from 'react-dom/client';
import React from 'react';
import App from "./App"

function Index() {
    return <App />;
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<Index />);