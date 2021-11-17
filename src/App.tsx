import React, { useEffect, useState } from 'react';
import './App.css';
import Login from "./pages/Login";
import Nav from "./components/Nav";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Update from './pages/Update';


function App() {
    const [name, setName] = useState('');

    useEffect(() => {
        (
            async () => {
                const response = await fetch('https://jwt-token-api-2000.herokuapp.com/api/user', {
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                });

                const content = await response.json();

                setName(content.username);
            }
        )();
    });


    return (
        <div className="App">
            <BrowserRouter>
                <Nav name={name} setName={setName} />

                <main className="form-signin">
                    <Route path="/" exact component={() => <Home name={name} />} />
                    <Route path="/login" component={() => <Login setName={setName} />} />
                    <Route path="/register" component={Register} />
                    <Route path="/update/:id" component={Update} />

                </main>

            </BrowserRouter>
        </div>
    );
}

export default App;