package com.organica.services;

import com.organica.entities.Product;
import com.organica.payload.ProductDto;
import com.organica.payload.RecommenderDto;

import java.util.List;

public interface RecommenderService {
    List<RecommenderDto> filterRecommenderList(List<RecommenderDto> recommenders);
}
