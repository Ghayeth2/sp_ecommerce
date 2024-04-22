package com.organica.services;

import com.organica.entities.Review;

import java.util.List;

public interface ReviewService {
    List<Review> findAllByProductId(int productId);
}
