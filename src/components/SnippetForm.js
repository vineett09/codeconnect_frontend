import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveSnippet } from "../redux/features/snippetSlice";
import Layout from "./Layout";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Editor } from "@monaco-editor/react";
import Spinner from "../components/Spinner"; // Import the Spinner component
import "../styles/SnippetForm.css";

const SnippetForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.snippets);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        saveSnippet({ title, description, code, language })
      ).unwrap();
      toast.success("Snippet created successfully!");
    } catch (error) {
      toast.error("Failed to create snippet: " + error.message);
    }
  };

  return (
    <Layout>
      <div className="snippet-form-container">
        {loading && <Spinner loading={loading} />}{" "}
        {/* Show spinner if loading */}
        <div className="side-navbar">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="Enter snippet title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="language">Language</label>
              <select
                id="language"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                {/* List of languages */}
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="java">Java</option>
                <option value="c">C</option>
                <option value="cpp">C++</option>
                <option value="csharp">C#</option>
                <option value="ruby">Ruby</option>
                <option value="php">PHP</option>
                <option value="swift">Swift</option>
                <option value="go">Go</option>
                <option value="rust">Rust</option>
                <option value="typescript">TypeScript</option>
                <option value="kotlin">Kotlin</option>
                <option value="sql">SQL</option>
                <option value="r">R</option>
                <option value="perl">Perl</option>
                <option value="shell">Shell</option>
                <option value="dart">Dart</option>
                <option value="objective-c">Objective-C</option>
                <option value="scala">Scala</option>
                <option value="groovy">Groovy</option>
                <option value="haskell">Haskell</option>
                <option value="lua">Lua</option>
                <option value="elixir">Elixir</option>
                <option value="vhdl">VHDL</option>
                <option value="matlab">MATLAB</option>
                <option value="delphi">Delphi</option>
                <option value="assembly">Assembly</option>
                <option value="fortran">Fortran</option>
                <option value="sas">SAS</option>
                <option value="abap">ABAP</option>
                <option value="solidity">Solidity</option>
                <option value="scheme">Scheme</option>
                <option value="d">D</option>
                <option value="groovy">Groovy</option>
                <option value="actionscript">ActionScript</option>
                <option value="tcl">Tcl</option>
                <option value="smalltalk">Smalltalk</option>
                <option value="prolog">Prolog</option>

                {/* ... other options ... */}
              </select>
            </div>
            <button type="submit" className="save-button" disabled={loading}>
              {loading ? "Saving..." : "Save Snippet"}
            </button>
          </form>
        </div>
        <div className="editor-container">
          <Editor
            height="400px"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              automaticLayout: true,
              minimap: { enabled: false },
            }}
          />
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default SnippetForm;
