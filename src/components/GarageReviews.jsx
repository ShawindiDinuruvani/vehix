import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Form, Button, Card, Row, Col } from "react-bootstrap";
import "./GarageReviews.css"; 

const GarageReviews = () => {
 
  const garageName = "Vehix"; 

  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    garageName: garageName,
    userName: "",
    rating: 0,
    comment: ""
  });

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/reviews/${garageName}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newReview.rating === 0) {
      alert("Please select a star rating!");
      return;
    }
    await axios.post("http://localhost:8080/api/reviews/add", newReview);
    alert("Review Added!");
    setNewReview({ ...newReview, userName: "", rating: 0, comment: "" }); 
    loadReviews();
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i
          key={i}
          className={`bi ${i <= rating ? "bi-star-fill" : "bi-star"} text-warning me-1`}
          style={{ cursor: "pointer" }}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="review-page">
      <Container>
        <h2 className="text-center text-white mb-4">
          Rate & Review: <span className="text-warning">{garageName.replace(/_/g, " ")}</span>
        </h2>

        <Row>
        
          <Col md={5}>
            <div className="glass-card p-4 mb-4">
              <h4 className="text-white mb-3">Write a Review</h4>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Your Name"
                    value={newReview.userName}
                    onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
                    required
                  />
                </Form.Group>

                
                <div className="mb-3">
                  <span className="text-white me-2">Rating:</span>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`bi ${star <= newReview.rating ? "bi-star-fill" : "bi-star"} text-warning fs-4`}
                      style={{ cursor: "pointer", marginRight: "5px" }}
                      onClick={() => setNewReview({ ...newReview, rating: star })}
                    ></i>
                  ))}
                </div>

                <Form.Group className="mb-3">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Describe your experience..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    required
                  />
                </Form.Group>

                <Button variant="warning" type="submit" className="w-100 fw-bold">
                  Submit Review
                </Button>
              </Form>
            </div>
          </Col>

          <Col md={7}>
            <div className="glass-card p-4">
              <h4 className="text-white mb-3">Customer Reviews ({reviews.length})</h4>
              {reviews.length === 0 ? (
                <p className="text-white-50">No reviews yet.</p>
              ) : (
                reviews.map((rev) => (
                  <Card key={rev.id} className="mb-3 bg-transparent border-light text-white">
                    <Card.Body>
                      <div className="d-flex justify-content-between">
                        <Card.Title className="fw-bold">{rev.userName}</Card.Title>
                        <div>{renderStars(rev.rating)}</div>
                      </div>
                      <Card.Text className="mt-2">{rev.comment}</Card.Text>
                      <small className="text-white-50">Posted on: {new Date(rev.date).toLocaleDateString()}</small>
                    </Card.Body>
                  </Card>
                ))
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GarageReviews;