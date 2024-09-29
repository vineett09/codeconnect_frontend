import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EditorPage from "./components/EditorPage";
import { Toaster } from "react-hot-toast";
import GettingStarted from "./components/GettingStarted";
import ContactPage from "./components/ContactPage";
import MainHome from "./components/MainHome";
import Register from "./components/Register";
import Login from "./components/Login";
import SnippetForm from "./components/SnippetForm"; // Import the SnippetForm component
import SnippetList from "./components/SnippetList";
import PrivacyPolicy from "./components/PrivacyPolicy";

function App() {
  return (
    <>
      <div>
        <Toaster position="top-center"></Toaster>
      </div>
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/getting-started" element={<GettingStarted />} />
        <Route path="/snippets/create" element={<SnippetForm />} />
        <Route path="/snippets" element={<SnippetList />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/editor/:roomId" element={<EditorPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      </Routes>
    </>
  );
}

export default App;
