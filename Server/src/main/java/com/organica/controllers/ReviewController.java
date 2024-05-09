package com.organica.controllers;

import com.organica.entities.Product;
import com.organica.entities.Review;
import com.organica.payload.CartDto;
import com.organica.payload.CartHelp;
import com.organica.payload.ReviewDto;
import com.organica.repositories.ReviewRepo;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewRepo reviewRepo;

    @GetMapping("/{product_id}")
    public ResponseEntity<List<Review>> productReviews(@PathVariable("product_id") int product_id) {
        return ResponseEntity.status(HttpStatus.OK).body(reviewRepo.findAllReviewsByProductId(product_id));
    }

    @PostMapping("")
    public ResponseEntity<?> save(@RequestBody ReviewDto reviewDto){
        Product product = new Product();
        product.setProductId(reviewDto.getProductId());

        return ResponseEntity.status(HttpStatus.CREATED).body(reviewRepo.save(
                Review.builder()
                        .rate(reviewDto.getRate())
                        .product(product)
                        .build()
        ));





    }
}
