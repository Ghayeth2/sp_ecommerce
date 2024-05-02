package com.organica.services.impl;

import com.organica.entities.Review;
import com.organica.payload.RecommenderDto;
import com.organica.services.RecommenderService;
import com.organica.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RecommenderServiceImpl implements RecommenderService {
    @Autowired private ReviewService reviewService;
    @Override
    public List<RecommenderDto> filterRecommenderList(List<RecommenderDto> recommenders) {
        List<RecommenderDto> chosenProducts = new ArrayList<>();

        for (RecommenderDto product : recommenders) {
            List<Review> reviews = reviewService.findAllByProductId(product.getProductId());
            if (reviews.size() >= 3) {
                double averageRating = calculateAverageRating(reviews);
                if (averageRating >= 2.25) {
                    chosenProducts.add(product);
                }
            }
        }

        return chosenProducts;
    }

    private double calculateAverageRating(List<Review> reviews) {
        if (reviews == null || reviews.isEmpty()) {
            return 0.0;
        }

        double sum = 0.0;
        for (Review review : reviews) {
            sum += review.getRate();
        }
        return sum / reviews.size();
    }
}
