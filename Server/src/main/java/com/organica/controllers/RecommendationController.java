package com.organica.controllers;

import com.organica.config.ContentBasedRecommendation;
import com.organica.config.JwtService;
import com.organica.config.Test;
import com.organica.payload.RecommenderDto;
import com.organica.services.PaymentService;
import com.organica.services.ProductService;
import com.organica.services.RecommenderService;
import com.organica.services.impl.PaymentServiceImpl;
import com.organica.services.impl.ProductServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Log4j2
@RequestMapping("/recommendations")
public class RecommendationController {
    @Autowired private RecommenderService recommenderService;

    @Autowired private ProductService productService;

    @GetMapping("/generate")
    public ResponseEntity<List<RecommenderDto>> recommendProducts(@RequestParam String desc) {

        List<RecommenderDto> recommendations = recommenderService.filterRecommenderList(
                productService.findSimilarProducts(desc));

        return ResponseEntity.ok(recommendations);
//        return null;
    }
}
