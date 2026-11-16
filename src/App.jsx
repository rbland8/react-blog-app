
import { Routes, Route } from "react-router";

import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import BlogPostsPage from "./pages/BlogPostsPage";
import IndividualPostPage from "./pages/IndividualPostPage";
import ContactPage from "./pages/ContactPage";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Navbar />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={<BlogPostsPage />}
          />

          <Route
            path="/posts/:id"
            element={<IndividualPostPage />}
          />

          <Route
            path="/contact"
            element={<ContactPage />}
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
