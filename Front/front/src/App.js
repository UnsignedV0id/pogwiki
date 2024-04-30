import React from "react";
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";

import { Routes, Route } from 'react-router-dom';
import About from "./pages/about"
import ContactPages from "./pages/contactPage"
import Home from "./pages/home";
import Service from "./pages/services"


function App() {
  return (
    <div>
      <div className="displayFlex">
        <Header />
        <main>
          <article>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/servicos" element={<Service />} />
            <Route path="/contato" element={<ContactPages />} />
          </Routes>
          </article>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;