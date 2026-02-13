package com.vehix.backend.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class ForumPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String content;
    private String authorName;
    private LocalDateTime postedDate = LocalDateTime.now();

    // --- Constructor (හිස් එක) ---
    public ForumPost() {
    }

    // --- Constructor (Data එක්ක) ---
    public ForumPost(String title, String content, String authorName) {
        this.title = title;
        this.content = content;
        this.authorName = authorName;
    }

    // --- GETTERS & SETTERS (මේ ටික තමයි වැදගත්ම!) ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public LocalDateTime getPostedDate() {
        return postedDate;
    }

    public void setPostedDate(LocalDateTime postedDate) {
        this.postedDate = postedDate;
    }
}