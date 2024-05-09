package com.organica.entities;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class CartDetalis {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartDetalisId;
    @ManyToOne
    @JsonBackReference
    private Product products;
    private int quantity;
    private int amount;
    @ManyToOne
    @JsonIgnoreProperties("cartDetalis")
    private Cart cart;


    @Override
    public String toString() {
        return "{cartDetalistId=" + cartDetalisId
                + ", quantity='"+ quantity
                + "', amount='"+ amount + "'}";
    }


}
