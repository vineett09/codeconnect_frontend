import React, { useRef, useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import LanguageSelector from "./LanguageSelector"; // Import the LanguageSelector component
import { ACTIONS } from "../Actions"; // Adjust the path as necessary
import "../styles/Editor.css";

const EditorComponent = ({ socketRef, roomId, onMount }) => {
  const editorRef = useRef(null);
  const [files, setFiles] = useState([
    {
      id: "default", // Unique id for the default editor
      name: "Untitled",
      content: "// Start coding here...",
      language: "javascript",
    },
  ]);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [language, setLanguage] = useState("javascript");

  const openFile = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const content = await file.text();
      const newFile = {
        id: Date.now(),
        name: file.name,
        content,
        language, // Set the language to the currently selected language
      };

      setFiles((prevFiles) => [...prevFiles, newFile]);
      setActiveFileIndex(files.length); // Set the newly opened file as active
      socketRef.current.emit(ACTIONS.FILE_OPENED, { roomId, file: newFile });
    }
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor; // Store the editor instance
    if (onMount) onMount(editor); // Notify the parent component
  };

  const closeTab = (index) => {
    setFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      if (updatedFiles.length === 0) {
        setActiveFileIndex(0); // Reset active index
        setLanguage("javascript"); // Reset to default language
      } else if (index === activeFileIndex) {
        setActiveFileIndex(Math.max(0, index - 1)); // Set to previous tab or first tab
        setLanguage(updatedFiles[Math.max(0, index - 1)].language); // Set language based on new active tab
      }
      return updatedFiles;
    });
  };

  useEffect(() => {
    const socket = socketRef.current; // Create a stable reference to socketRef.current

    if (socket) {
      // Handle new file opened by another user
      socket.on(ACTIONS.FILE_OPENED, (file) => {
        setFiles((prevFiles) => [...prevFiles, file]);
      });

      // Handle code changes
      socket.on(ACTIONS.CODE_CHANGE, ({ code, fileId }) => {
        setFiles((prevFiles) =>
          prevFiles.map((file) =>
            file.id === fileId ? { ...file, content: code } : file
          )
        );
      });

      // Handle language changes
      socket.on(ACTIONS.LANGUAGE_CHANGE, ({ language }) => {
        setLanguage(language);
        setFiles((prevFiles) =>
          prevFiles.map((file, index) =>
            index === activeFileIndex ? { ...file, language } : file
          )
        );
      });
    }

    return () => {
      if (socket) {
        // Use the stable reference for cleanup
        socket.off(ACTIONS.FILE_OPENED);
        socket.off(ACTIONS.CODE_CHANGE);
        socket.off(ACTIONS.LANGUAGE_CHANGE);
      }
    };
  }, [socketRef, roomId, activeFileIndex]); // Dependencies remain the same

  const handleEditorChange = (value) => {
    const activeFile = files[activeFileIndex];
    if (activeFile) {
      const updatedFile = { ...activeFile, content: value };
      setFiles((prevFiles) =>
        prevFiles.map((file) =>
          file.id === activeFile.id ? updatedFile : file
        )
      );

      if (socketRef.current) {
        socketRef.current.emit(ACTIONS.CODE_CHANGE, {
          roomId,
          code: value,
          fileId: activeFile.id,
        });
      }
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = e.target.value;
    setLanguage(selectedLanguage);

    const updatedFiles = files.map((file, index) =>
      index === activeFileIndex ? { ...file, language: selectedLanguage } : file
    );
    setFiles(updatedFiles);

    if (socketRef.current) {
      // Emit the language change to all users in the room
      socketRef.current.emit(ACTIONS.LANGUAGE_CHANGE, {
        roomId,
        language: selectedLanguage,
      });
    }
  };

  const handleTabClick = (index) => {
    setActiveFileIndex(index);
    setLanguage(files[index].language); // Set language based on active tab's file
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div className="input-file-container">
        <label className="file-upload-button" htmlFor="file-upload">
          Choose File
        </label>
        <input
          type="file"
          id="file-upload"
          accept=".js,.html,.css,.txt"
          onChange={openFile}
        />
      </div>

      <div className="file-tabs">
        {files.map((file, index) => (
          <div key={file.id} className="file-tab">
            <button
              className={index === activeFileIndex ? "active-tab" : ""}
              onClick={() => handleTabClick(index)}
            >
              {file.name}
            </button>
            {file.id !== "default" && (
              <button className="close-btn" onClick={() => closeTab(index)}>
                X
              </button>
            )}
          </div>
        ))}
      </div>

      <LanguageSelector
        selectedLanguage={language}
        onLanguageChange={handleLanguageChange}
      />

      <Editor
        height="90vh"
        language={language}
        value={files.length > 0 ? files[activeFileIndex]?.content : ""}
        onChange={(value) => handleEditorChange(value)}
        theme="vs-dark"
        onMount={handleEditorDidMount}
        options={{
          selectOnLineNumbers: true,
        }}
      />
    </div>
  );
};

export default EditorComponent;
