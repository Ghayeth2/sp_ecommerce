package com.organica.controllers;

import com.organica.entities.Product;
import com.organica.payload.ApiResponse;
import com.organica.payload.ProductDto;
import com.organica.payload.ProductDtoPost;
import com.organica.repositories.ProductRepo;
import com.organica.services.ProductService;
import com.organica.services.impl.ProductServiceImpl;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin @Log4j2
@RequestMapping("/product")
public class ProductControllers {

    @Autowired
    private ProductService productService;
    @Autowired
    private ProductRepo productRepo;
    //Create Product
    @PostMapping(value = "/add" )
    public ResponseEntity<ProductDto> CreateProduct(@RequestParam
                            MultiValueMap<String, String> formData,
                            @RequestPart("image") MultipartFile file)
            throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("name"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setCategory((formData.getFirst("category")));
        productDto.setPrice(Float.valueOf(formData.getFirst("price")));

        ProductDto save = this.productService.CreateProduct(productDto, file);

        return new ResponseEntity<ProductDto>(save,HttpStatusCode.valueOf(200));
    }

    @GetMapping("category")
    public ResponseEntity<List<ProductDto>> productsByCategory(@RequestParam
                                                                   String category) {
        return new ResponseEntity<>(productService.findAllByCategory(category), HttpStatus.OK);
    }

    @GetMapping("")
    public ResponseEntity<List<Product>> getAll(Pageable pageable){
        Page<Product> products = this.productService.ReadAllProduct(pageable);
        List<Product> productsList = products.getContent();
        List<Product> collect = productsList.stream().map(dto -> new Product(dto.getProductId(), dto.getProductName(),
                dto.getDescription(), dto.getPrice(), dto.getCategory(),
                dto.getImg())).collect(Collectors.toList());

        return new ResponseEntity<>(collect, HttpStatus.OK);
    }

    @GetMapping("/{productid}")
    public ResponseEntity<ProductDto> GetById(@PathVariable Integer productid){
        ProductDto product = this.productService.ReadProduct(productid);

        return new ResponseEntity<>(product,HttpStatusCode.valueOf(200));
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Product>> products(){
        return new ResponseEntity<>(productRepo.findAll(), HttpStatusCode.valueOf(200));
    }


    //Delete Product
    @DeleteMapping(value = "/del/{ProductId}",produces = "application/json")
    public ResponseEntity<ApiResponse> Delete(@PathVariable Integer ProductId){
        this.productService.DeleteProduct(ProductId);
        return new ResponseEntity<ApiResponse>(new ApiResponse("Product deleted"),HttpStatusCode.valueOf(200));
    }



    //Update Product
    @PutMapping("/{ProductId}")
    public ResponseEntity<ProductDto> UpdateProduct(@RequestParam MultiValueMap<String, String> formData, @RequestPart("image") MultipartFile file,@PathVariable Integer ProductId) throws IOException {
        ProductDto productDto = new ProductDto();
        productDto.setProductName(formData.getFirst("name"));
        productDto.setDescription(formData.getFirst("description"));
        productDto.setCategory((formData.getFirst("category")));
        productDto.setPrice(Float.valueOf(formData.getFirst("price")));

        ProductDto save = this.productService.UpdateProduct(productDto,ProductId, file);

        return new ResponseEntity<ProductDto>(save,HttpStatusCode.valueOf(200));
    }



}
