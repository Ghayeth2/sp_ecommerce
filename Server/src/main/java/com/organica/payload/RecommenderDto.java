package com.organica.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecommenderDto {
    private int productId;
    private String productName;
    private String description;
    private Float price;
    private Float weight;
    private byte[] img;
    private Double similarity;
}
