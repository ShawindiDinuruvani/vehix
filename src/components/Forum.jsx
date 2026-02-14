import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import "./Forum.css"; 

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", authorName: "" });
  const messagesEndRef = useRef(null); // Chat එක පහළට scroll කරන්න

  useEffect(() => {
    loadPosts();
    // සෑම තත්පර 5කට වරක් අලුත් මැසේජ් refresh වෙන්න (Real-time වගේ දැනෙන්න)
    const interval = setInterval(loadPosts, 5000); 
    return () => clearInterval(interval);
  }, []);

  // අලුත් මැසේජ් එකක් ආපු ගමන් පහළට auto-scroll කරන්න
  useEffect(() => {
    scrollToBottom();
  }, [posts]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const loadPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/forum");
      setPosts(res.data);
    } catch (error) {
      console.error("Error loading posts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPost.authorName || !newPost.content) return;

    try {
      await axios.post("http://localhost:8080/api/forum", newPost);
      setNewPost({ ...newPost, content: "", title: "" }); // නම ඉතුරු කරලා අනිත්වා clear කරනවා
      loadPosts();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="chat-page">
      <Container className="d-flex flex-column h-100 py-3">
        
        {/* 1. Header Area */}
        <div className="chat-header text-center mb-3">
            <h2 className="text-white fw-bold">Community <span className="text-warning">Chat</span></h2>
            <p className="text-white-50 small">Live discussions with Vehix members</p>
        </div>

        {/* 2. Chat Area (Scrollable) */}
        <div className="chat-window-container flex-grow-1">
            <div className="chat-window">
                {posts.length === 0 ? (
                    <div className="text-center text-white-50 mt-5">
                        <i className="bi bi-chat-dots fs-1"></i>
                        <p>No messages yet. Start the conversation!</p>
                    </div>
                ) : (
                    posts.map((post, index) => (
                        <div key={index} className={`message-row ${post.authorName === newPost.authorName ? 'my-message' : 'other-message'}`}>
                            <div className="message-bubble">
                                <div className="message-header">
                                    <span className="author-name">{post.authorName}</span>
                                    {post.title && <span className="message-topic badge bg-secondary ms-2">{post.title}</span>}
                                </div>
                                <div className="message-body">
                                    {post.content}
                                </div>
                                <div className="message-time">
                                    Just now
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>

        {/* 3. Input Area (Fixed Bottom Look) */}
        <div className="chat-input-area mt-3 p-3">
            <Form onSubmit={handleSubmit}>
                <Row className="g-2">
                    {/* නම සහ Topic එක උඩින් පොඩියට */}
                    <Col md={3}>
                        <Form.Control 
                            type="text" 
                            placeholder="Your Name" 
                            className="chat-input-sm mb-2"
                            value={newPost.authorName}
                            onChange={(e) => setNewPost({...newPost, authorName: e.target.value})}
                            required
                        />
                        <Form.Control 
                            type="text" 
                            placeholder="Topic (Optional)" 
                            className="chat-input-sm"
                            value={newPost.title}
                            onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                        />
                    </Col>
                    
                    {/* Message එක ලොකුවට */}
                    <Col md={7}>
                        <Form.Control 
                            as="textarea" 
                            rows={3}
                            placeholder="Type your message here..." 
                            className="chat-input-main h-100"
                            value={newPost.content}
                            onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                            required
                        />
                    </Col>

                    {/* Send Button */}
                    <Col md={2} className="d-grid">
                        <Button variant="warning" type="submit" className="fw-bold send-btn">
                            <i className="bi bi-send-fill fs-4"></i>
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>

      </Container>
    </div>
  );
};

export default Forum;