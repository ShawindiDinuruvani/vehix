import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import "./Forum.css"; // 👈 CSS එක Import කරන්න

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: "", content: "", authorName: "" });

  useEffect(() => {
    loadPosts();
  }, []);

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
    try {
      await axios.post("http://localhost:8080/api/forum", newPost);
      alert("Post added successfully!");
      setNewPost({ title: "", content: "", authorName: "" });
      loadPosts();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div className="forum-page"> {/* 👈 1. Main Background */}
      <Container>
        <h2 className="text-center mb-4">Community <span className="text-gold">Forum</span></h2>

        <Row>
          {/* --- වම් පැත්ත: ප්‍රශ්න අහන Form එක --- */}
          <Col md={5} className="mb-4">
            <div className="glass-card"> {/* 👈 2. Glass Card Style */}
              <h4 className="mb-4">Ask a Question</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={newPost.authorName}
                    onChange={(e) => setNewPost({...newPost, authorName: e.target.value})} 
                    required 
                    placeholder="Enter name"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Topic</Form.Label>
                  <Form.Control 
                    type="text" 
                    value={newPost.title}
                    onChange={(e) => setNewPost({...newPost, title: e.target.value})} 
                    required 
                    placeholder="E.g. Engine Overheating"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control 
                    as="textarea" rows={4} 
                    value={newPost.content}
                    onChange={(e) => setNewPost({...newPost, content: e.target.value})} 
                    required 
                    placeholder="Describe your issue..."
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <i className="bi bi-send-fill me-2"></i> Post Question
                </Button>
              </Form>
            </div>
          </Col>

          {/* --- දකුණු පැත්ත: ප්‍රශ්න List එක --- */}
          <Col md={7}>
            <div className="glass-card">
              <h4 className="mb-4">Recent Discussions</h4>
              
              {posts.length === 0 ? (
                <p className="text-center text-muted">No discussions yet. Be the first to ask!</p>
              ) : (
                posts.map((post) => (
                  <div key={post.id} className="forum-post-item"> {/* 👈 3. Post Item Style */}
                    <div className="post-title">{post.title}</div>
                    <div className="post-meta">
                      <i className="bi bi-person-circle me-1"></i> {post.authorName}
                    </div>
                    <div className="post-content">
                      {post.content}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Forum;