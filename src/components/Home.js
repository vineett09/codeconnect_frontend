import React, { useState } from "react";
import { v4 as uuid } from "uuid";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner"; // Import the Spinner component
import "../styles/Home.css";

function Home() {
  const [roomId, setRoomId] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const navigate = useNavigate();

  const generateRoomId = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when generating Room ID
    const Id = uuid();
    setRoomId(Id);
    toast.success("Room Id is generated");
    setLoading(false); // Set loading to false after Room ID is generated
  };

  const joinRoom = () => {
    if (!roomId || !username) {
      toast.error("Both fields are required");
      return;
    }

    setLoading(true); // Set loading to true when joining a room

    // redirect
    navigate(`/editor/${roomId}`, {
      state: {
        username,
      },
    });
    toast.success("Room is created");
    setLoading(false); // Set loading to false after redirection
  };

  // When Enter is pressed, join room
  const handleInputEnter = (e) => {
    if (e.code === "Enter") {
      joinRoom();
    }
  };

  return (
    <div className="home-container">
      {loading && <Spinner loading={loading} />} {/* Show spinner if loading */}
      <div className="home-card">
        <img src="/images/logo-3.png" alt="Logo" className="home-logo" />
        <h4 className="home-title">Enter the ROOM ID</h4>

        <div className="home-form-group">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="home-input"
            placeholder="ROOM ID"
            onKeyUp={handleInputEnter}
            disabled={loading} // Disable input when loading
          />
        </div>
        <div className="home-form-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="home-input"
            placeholder="USERNAME"
            onKeyUp={handleInputEnter}
            disabled={loading} // Disable input when loading
          />
        </div>
        <button onClick={joinRoom} className="home-button" disabled={loading}>
          {loading ? "Joining..." : "JOIN"}
        </button>
        <p className="home-text">
          Don't have a room ID? Create{" "}
          <span
            onClick={generateRoomId}
            className="home-link"
            disabled={loading}
          >
            New Room
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
