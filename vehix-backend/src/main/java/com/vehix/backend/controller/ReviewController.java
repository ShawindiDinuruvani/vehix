package com.vehix.backend.controller;

import com.vehix.backend.entity.Review;
import com.vehix.backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "http://localhost:3000") // React එකට අවසර
public class ReviewController {

    @Autowired
    private ReviewRepository reviewRepository;

    // 1. අලුත් Review එකක් දාන්න
    @PostMapping("/add")
    public Review addReview(@RequestBody Review review) {
        return reviewRepository.save(review);
    }

    // 2. අදාළ ගරාජ් එකේ Reviews ටික ගන්න (e.g., /api/reviews/Thanamalvila_Motors)
    @GetMapping("/{garageName}")
    public List<Review> getGarageReviews(@PathVariable String garageName) {
        return reviewRepository.findByGarageName(garageName);
    }
}