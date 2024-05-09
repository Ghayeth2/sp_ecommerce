package com.organica.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import jakarta.persistence.*;
import lombok.*;
import org.w3c.dom.Text;

import java.util.Base64;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@NoArgsConstructor
@Data
@AllArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    @Column
    private String productName;
//    @Column(columnDefinition = "TEXT")
    private String description;
    private Float price;
//    private Float weight;
    private String category;
    private String img;
    @OneToMany(mappedBy = "products", cascade = CascadeType.ALL)
    @JsonManagedReference
    @JsonIgnore
    private List<CartDetalis> list;
    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Review> reviews;

    @Override
    public String toString() {
        final String shortCustomersToString;
        if(this.list != null)
            shortCustomersToString = this.list.stream()
                    .map(CartDetalis::toString)
                    .collect(Collectors.joining(", ", "[", "]"));
        else
            shortCustomersToString = null;

//        // Convert image data to base64-encoded string
//        String imgBase64 = Base64.getEncoder().encodeToString(this.img);

        return "{" + " productId='" + getProductId() + "'"
                + ", productName='" + getProductName() + "'"
                + ", price='" + getPrice() + "'"
                + ", weight='" + getCategory() + "'"
                + ", description='" + getDescription() + "'"
                + ", img='" + getImg() + "'"
                + ", list=" + shortCustomersToString + "}";
    }

    public Product(int productId, String productName, String description, Float price, String category, String img) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.category = category;
        this.img = img;
    }
}
