package com.organica.services;

import com.organica.entities.Product;
import com.organica.payload.ProductDto;
import com.organica.payload.ProductDtoPost;
import com.organica.payload.RecommenderDto;
import org.apache.hadoop.yarn.webapp.view.HtmlPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface ProductService {

    //create
    ProductDto CreateProduct(ProductDto productDto, MultipartFile file) throws IOException;

    //read
    ProductDto ReadProduct(Integer ProductId);


    //readAll
    Page<Product> ReadAllProduct(Pageable pageable);
    List<ProductDto> getAll();
    List<RecommenderDto> findSimilarProducts(String queryDescription);


    //delete
    void DeleteProduct(Integer productId);


    //update
    ProductDto UpdateProduct(ProductDto productDto,Integer ProductId, MultipartFile file) throws IOException;



}

