package com.organica.services.impl;

import com.organica.entities.Review;
import com.organica.repositories.ReviewRepo;
import com.organica.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewServiceImpl implements ReviewService {
    @Autowired private ReviewRepo reviewRepo;

    @Override
    public List<Review> findAllByProductId(int productId) {
        return reviewRepo.findAllReviewsByProductId(productId);
    }
}
