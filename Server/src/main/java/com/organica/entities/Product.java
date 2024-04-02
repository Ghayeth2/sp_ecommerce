package com.organica.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    @Column
    private String productName;

    private String description;
    private Float price;
    private Float weight;
    @Column(length = 65555)
    private byte[] img;

    @Override
    public String toString() {
        final String shortCustomersToString;
        if(this.list != null)
            shortCustomersToString = this.list.stream()
                    .map(CartDetalis::toString)
                    .collect(Collectors.joining(", ", "[", "]"));
        else
            shortCustomersToString = null;

        return "{" + " productId='" + getProductId() + "'"
                + ", productName='" + getProductName() + "'"
                + ", price='" + getPrice() + "'"
                + ", weight='" + getWeight() + "'"
                + ", description='" + getDescription() + "'"
                + ", list=" + shortCustomersToString + "}";
    }

    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<CartDetalis> list;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews;
}
