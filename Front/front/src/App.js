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
import Site1 from "./pages/site1"
import Site2 from "./pages/site2"
import Site3 from "./pages/site3"
import Site4 from "./pages/site4"


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
            <Route path="/site1" element={<Site1 />} />
            <Route path="/site2" element={<Site2 />} />
            <Route path="/site3" element={<Site3 />} />
            <Route path="/site4" element={<Site4 />} />
          </Routes>
          </article>
        </main>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;