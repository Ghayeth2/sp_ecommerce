package com.organica.config;

import com.organica.entities.Product;
import com.organica.payload.ProductDto;
import com.organica.payload.RecommenderDto;
import com.organica.repositories.ProductRepo;
import com.organica.repositories.ReviewRepo;
import com.organica.services.ProductService;
import com.organica.services.impl.ProductServiceImpl;
import jakarta.annotation.PostConstruct;
import lombok.NoArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.apache.mahout.math.DenseVector;
import org.apache.mahout.math.Vector;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.util.*;
@Configuration
 @Log4j2
public class ContentBasedRecommendation {
   @Autowired private ProductService productService;
    @Autowired private ProductRepo productRepo;
    @Autowired private ReviewRepo reviewRepo;


    private static final int VECTOR_SIZE = 1000;

    public Vector convertToVector(String input) {
        Map<String, Integer> dictionary = new HashMap<>();

        Set<String> terms = extractTerms(input);

        Vector vector = new DenseVector(VECTOR_SIZE);

        for (String term : terms) {
            int termID = dictionary.computeIfAbsent(term, k -> dictionary.size());
            if (termID < VECTOR_SIZE) {
                vector.setQuick(termID, vector.getQuick(termID) + 1);
            }
        }
        return vector;
    }

    private Set<String> extractTerms(String input) {
        Set<String> terms = new HashSet<>();
        String[] words = input.split("\\s+");
        for (String word : words) {
            word = word.toLowerCase();
            terms.add(word);
        }
        return terms;
    }

    public List<RecommenderDto> findSimilarProducts(String queryDescription) {
        List<Product> allProducts = productService.getAll();
        Vector queryVector = convertToVector(queryDescription);
        List<RecommenderDto> similarProducts = new ArrayList<>();
        for (Product product : allProducts) {
            Vector productVector = convertToVector(product.getDescription());
            double similarity = calculateCosineSimilarity(queryVector, productVector);
            RecommenderDto productDto = RecommenderDto.builder()
                    .productId(product.getProductId())
                    .productName(product.getProductName())
                    .price(product.getPrice())
                    .description(product.getDescription())
                    .img(product.getImg())
                    .weight(product.getWeight())
                    .similarity(similarity)
                    .build();
            similarProducts.add(productDto);
        }

        similarProducts.sort((p1, p2) -> Double.compare(p2.getSimilarity(), p1.getSimilarity()));

        return similarProducts.subList(0, Math.min(10, similarProducts.size()));
    }

    private double calculateCosineSimilarity(Vector vector1, Vector vector2) {
        return vector1.dot(vector2) / (vector1.norm(2) * vector2.norm(2));
    }
}
