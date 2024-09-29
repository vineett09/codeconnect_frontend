import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSnippets, deleteSnippet } from "../redux/features/snippetSlice";
import Layout from "./Layout";
import Spinner from "../components/Spinner"; // Import the Spinner component
import "../styles/SnippetList.css";

const SnippetList = () => {
  const dispatch = useDispatch();
  const { snippets, loading, error } = useSelector((state) => state.snippets);

  useEffect(() => {
    dispatch(fetchSnippets());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this snippet?")) {
      dispatch(deleteSnippet(id));
    }
  };

  if (loading) return <Spinner loading={loading} />; // Show spinner if loading
  if (error) return <p>Error: {error}</p>;

  return (
    <Layout>
      <div className="snippet-list-container">
        <h2>Your Snippets</h2>
        <div className="snippet-cards">
          {snippets.map((snippet) => (
            <div key={snippet._id} className="snippet-card">
              <div className="snippet-header">
                <h3>{snippet.title}</h3>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(snippet._id)}
                >
                  Delete
                </button>
              </div>
              <pre className="snippet-code">{snippet.code}</pre>
              <p className="snippet-language">{snippet.language}</p>
              <p className="snippet-created-at">
                Created on: {new Date(snippet.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default SnippetList;
