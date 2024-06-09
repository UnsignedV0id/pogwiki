import React from "react";
import './App.css';
import Header from "./components/header";
import Footer from "./components/footer";

import { Routes, Route } from 'react-router-dom';
import About from "./pages/about"
import ContactPages from "./pages/contactPage"
import Home from "./pages/home";
import Service from "./pages/services"
import CreateAccount from "./pages/createAccount"
import RecoverAccount from "./pages/recoverAccount"
import CreatePage from "./pages/createPage"


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
            <Route path="/createAccount" element={<CreateAccount />} />
            <Route path="/recoverAccount" element={<RecoverAccount />} />
            <Route path="/createPage" element={<CreatePage />} />
          </Routes>
          </article>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;