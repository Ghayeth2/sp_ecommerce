package com.organica.config;

import com.organica.repositories.ProductRepo;
import com.organica.services.ProductService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Service;

@Log4j2 @Configuration
public class Test {
    @Autowired private ProductService productRepo;

    public Test(ProductService productRepo) {
        this.productRepo = productRepo;
    }

    public void productTest(){
        log.info("Printing from Test class: "+productRepo.ReadProduct(3));
    }
}
