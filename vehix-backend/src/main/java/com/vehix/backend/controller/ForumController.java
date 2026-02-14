package com.vehix.backend.controller;


import com.vehix.backend.entity.ForumPost;
import com.vehix.backend.repository.ForumPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
        import java.util.List;

@RestController
@RequestMapping("/api/forum")
@CrossOrigin( "*")
public class ForumController {

    @Autowired
    private ForumPostRepository repo;


    @GetMapping
    public List<ForumPost> getAllPosts() {
        return repo.findAll();
    }


    @PostMapping
    public ForumPost createPost(@RequestBody ForumPost post) {
        return repo.save(post);
    }
}
