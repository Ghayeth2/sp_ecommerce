package com.organica.repositories;

import com.organica.entities.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ReviewRepo extends JpaRepository<Review, Integer> {
    @Query(value = "SELECT * FROM review r WHERE r.product_product_id = :productId", nativeQuery = true)
    List<Review> findAllReviewsByProductId(@Param("productId") int productId);

}
