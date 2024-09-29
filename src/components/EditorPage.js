import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";
import { FiMessageCircle, FiCopy, FiLogOut, FiDownload } from "react-icons/fi";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout } from "../redux/features/authSlice";
import Client from "./Client";
import Editor from "./Editor";
import ChatWindow from "./chatWindow";
import { initSocket } from "../Socket";
import { ACTIONS } from "../Actions";
import Spinner from "../components/Spinner";
import "../styles/EditorPage.css";

function EditorPage() {
  const [clients, setClients] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [interviewMode, setInterviewMode] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [showLeaveRoomConfirm, setShowLeaveRoomConfirm] = useState(false);
  const codeRef = useRef(null);
  const editorRef = useRef(null);
  const socketRef = useRef(null);
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  const handleDownload = () => {
    if (editorRef.current) {
      const codeContent = editorRef.current.getValue();
      const blob = new Blob([codeContent], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "code.txt"; // Specify the file name
      link.click();
      URL.revokeObjectURL(link.href); // Clean up the URL object
    } else {
      console.error("Editor instance is not available");
    }
  };

  useEffect(() => {
    const init = async () => {
      socketRef.current = await initSocket();
      socketRef.current.on("connect_error", (err) => handleErrors(err));
      socketRef.current.on("connect_failed", (err) => handleErrors(err));

      const handleErrors = (err) => {
        console.log("Error", err);
        toast.error("Socket connection failed, Try again later");
        navigate("/");
      };

      socketRef.current.emit(ACTIONS.JOIN, {
        roomId,
        username: location.state?.username || user?.username,
      });

      socketRef.current.on(
        ACTIONS.JOINED,
        ({ clients, username, socketId }) => {
          if (
            username !== location.state?.username &&
            username !== user?.username
          ) {
            toast.success(`${username} joined the room.`);
          }
          setClients(clients);
          socketRef.current.emit(ACTIONS.SYNC_CODE, {
            code: codeRef.current,
            socketId,
          });
          setLoading(false);
          // Show the warning message after the first user joins
          if (clients.length === 1) {
            setShowWarningMessage(true);
          }
        }
      );

      socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, username }) => {
        toast.success(`${username} left the room`);
        setClients((prev) =>
          prev.filter((client) => client.socketId !== socketId)
        );
      });

      socketRef.current.on(ACTIONS.INTERVIEW_MODE_UPDATED, ({ enabled }) => {
        setInterviewMode(enabled);
      });

      socketRef.current.on(ACTIONS.INTERVIEW_WARNING, ({ message }) => {
        toast.warning(message);
      });
    };
    init();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current.off(ACTIONS.JOINED);
        socketRef.current.off(ACTIONS.DISCONNECTED);
        socketRef.current.off(ACTIONS.INTERVIEW_MODE_UPDATED);
        socketRef.current.off(ACTIONS.INTERVIEW_WARNING);
      }
    };
  }, [roomId, location.state?.username, user?.username, navigate]);
  const dismissWarning = () => {
    setShowWarningMessage(false);
  };

  useEffect(() => {
    if (interviewMode) {
      const handleVisibilityChange = () => {
        if (document.hidden) {
          const currentUser = clients.find(
            (client) => client.socketId === socketRef.current.id
          );
          const username = currentUser ? currentUser.username : "Unknown User";

          socketRef.current.emit(ACTIONS.INTERVIEW_WARNING, {
            roomId,
            message: `${username} switched between tabs or minimized the window`,
          });
        }
      };

      const handleFocusChange = () => {
        if (!document.hasFocus()) {
          const currentUser = clients.find(
            (client) => client.socketId === socketRef.current.id
          );
          const username = currentUser ? currentUser.username : "Unknown User";

          socketRef.current.emit(ACTIONS.INTERVIEW_WARNING, {
            roomId,
            message: `${username} switched focus to another window`,
          });
        }
      };

      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("focus", handleFocusChange);
      window.addEventListener("blur", handleFocusChange);

      return () => {
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange
        );
        window.removeEventListener("focus", handleFocusChange);
        window.removeEventListener("blur", handleFocusChange);
      };
    }
  }, [interviewMode, roomId, clients]);

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success(`Room ID is copied`);
    } catch (error) {
      console.log(error);
      toast.error("Unable to copy the Room ID");
    }
  };

  const handleCopy = () => {
    if (editorRef.current) {
      const codeContent = editorRef.current.getValue();
      navigator.clipboard
        .writeText(codeContent)
        .then(() => {
          toast.success(`Code copied to clipboard`);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    } else {
      toast.error("Failed to copy code");
    }
  };
  const leaveRoom = () => {
    setShowLeaveRoomConfirm(true); // Show custom confirmation dialog
  };

  const confirmLeaveRoom = () => {
    setShowLeaveRoomConfirm(false); // Hide dialog
    navigate("/"); // Leave the room
  };

  const cancelLeaveRoom = () => {
    setShowLeaveRoomConfirm(false); // Hide dialog
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleToggleInterviewMode = async () => {
    if (interviewMode) {
      setInterviewMode(false);
      socketRef.current.emit(ACTIONS.TOGGLE_INTERVIEW_MODE, {
        roomId,
        enabled: false,
      });
    } else {
      const confirm = window.confirm(
        "Are you sure you want to enable strict mode?\n\nEnabling the strict mode can enable warnings for minimizing or switching between tab windows."
      );
      if (confirm) {
        setInterviewMode(true);
        socketRef.current.emit(ACTIONS.TOGGLE_INTERVIEW_MODE, {
          roomId,
          enabled: true,
        });
      }
    }
  };

  return (
    <div className="new-editor-container">
      {loading ? (
        <Spinner />
      ) : (
        <>
          {/* Warning message for users */}
          {showWarningMessage && (
            <div className="warning-message">
              <p>
                <p>
                  Before starting making changes in the room, make sure all the
                  members have joined the room.
                  <br />
                  Otherwise, the changes will not be reflected to the new
                  member.
                </p>
              </p>
              <button onClick={dismissWarning}>OK</button>
            </div>
          )}
          <aside className="new-editor-sidebar">
            <div className="new-editor-logo-container">
              <img
                src="/images/logo-3.png"
                alt="Logo"
                className="new-editor-logo"
              />
            </div>
            <div className="new-editor-clients">
              <h3 className="new-editor-members-title">Members</h3>
              {clients.map((client) => (
                <Client key={client.socketId} username={client.username} />
              ))}
            </div>
            <div className="new-editor-buttons">
              <button
                className="new-editor-button copy-button"
                onClick={copyRoomId}
              >
                <FiCopy size={20} /> Copy Room ID
              </button>
              <button
                className="new-editor-button leave-button"
                onClick={leaveRoom}
              >
                <FiLogOut size={20} /> Leave Room
              </button>

              {/* Leave Room Confirmation Dialog */}
              {showLeaveRoomConfirm && (
                <div className="confirmation-dialog">
                  <p>Are you sure you want to leave the room?</p>
                  <button onClick={confirmLeaveRoom}>Yes</button>
                  <button onClick={cancelLeaveRoom}>No</button>
                </div>
              )}
            </div>
          </aside>

          <main className="new-editor-main">
            <div className="new-editor-toolbar">
              <div className="new-toolbar-buttons">
                <div className="tooltip-container">
                  <FiCopy
                    size={20}
                    onClick={handleCopy}
                    className="new-toolbar-icon"
                  />
                  <span className="tooltip-text">Copy Code</span>
                </div>
                <div className="tooltip-container">
                  <div
                    className={`interview-toggle-icon ${
                      interviewMode ? "enabled" : "disabled"
                    }`}
                    onClick={handleToggleInterviewMode}
                  >
                    {interviewMode ? (
                      <BsToggle2On size={60} />
                    ) : (
                      <BsToggle2Off size={60} />
                    )}
                  </div>
                  <span className="tooltip-text">
                    {interviewMode
                      ? "Disable Strict Mode"
                      : "Enable Strict Mode"}
                  </span>
                </div>
                <FiDownload
                  className="download-icon"
                  onClick={handleDownload}
                />{" "}
                {!isAuthenticated && (
                  <Link to="/login">
                    <button className="new-toolbar-button login-button">
                      Login
                    </button>
                  </Link>
                )}
              </div>

              {isAuthenticated && (
                <div className="user-info">
                  <span>Welcome, {user.username}</span>
                  <div className="dropdown">
                    <button className="dropbtn">▼</button>
                    <div className="dropdown-content">
                      <Link to="/snippets/create">Create Snippet</Link>
                      <Link to="/snippets">My Snippets</Link>
                      <button onClick={handleLogout} className="dropdown-item">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <Editor
              socketRef={socketRef}
              roomId={roomId}
              code={codeRef.current}
              editorRef={editorRef}
              onMount={handleEditorDidMount} // Set the editor instance
            />
            {isChatOpen && (
              <ChatWindow
                socketRef={socketRef}
                roomId={roomId}
                username={location.state?.username}
                toggleChat={toggleChat}
              />
            )}
            {!isChatOpen && (
              <div className="new-chat-icon" onClick={toggleChat}>
                <FiMessageCircle size={40} />
              </div>
            )}
            <ToastContainer />
          </main>
        </>
      )}
    </div>
  );
}

export default EditorPage;
