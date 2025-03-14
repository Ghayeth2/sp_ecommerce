package com.organica.repositories;

import com.organica.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {
    Optional<List<Product>> findAllByCategory(String categoryName);
}
