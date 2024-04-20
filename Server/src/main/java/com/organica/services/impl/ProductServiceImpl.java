package com.organica.services.impl;

import com.organica.entities.Product;
import com.organica.payload.ProductDto;
import com.organica.payload.RecommenderDto;
import com.organica.repositories.ProductRepo;
import com.organica.services.ProductService;
import lombok.extern.log4j.Log4j2;
import org.apache.mahout.math.DenseVector;
import org.apache.mahout.math.Vector;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service @Log4j2
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepo productRepo;



    //Create
    @Override
    public ProductDto CreateProduct(ProductDto productDto) {
        Product product=this.modelMapper.map(productDto,Product.class);
        product.setImg(compressBytes(product.getImg()));

        Product save = this.productRepo.save(product);
        save.setImg(null);
        return this.modelMapper.map(save,ProductDto.class);
    }

    //Read One
    @Override
    public ProductDto ReadProduct(Integer ProductId) {
        log.info("product service >>> ReadProduct <<< METHOD");
        Product save = this.productRepo.findById(ProductId).orElseThrow();
        save.setImg(decompressBytes(save.getImg()));


        return this.modelMapper.map(save,ProductDto.class);
    }

    @Override
    public List<ProductDto> getAll(){
        List<Product> all = this.productRepo.findAll();


        return all.stream().map(dto -> new ProductDto(dto.getProductId(), dto.getProductName(), dto.getDescription(), dto.getPrice(), dto.getWeight(), decompressBytes(dto.getImg()))).collect(Collectors.toList());
    }
    //Read All
    @Override
    public Page<Product> ReadAllProduct(Pageable pageable) {
        return this.productRepo.findAll(pageable);

        /*
        Perhaps fixing images' issue is from returning the products
        where i can see he created a function to get images' bytes which currently
        is closed
         */
//        List<ProductDto> collect = all.stream().map(dto -> new ProductDto(dto.getProductId(), dto.getProductName(), dto.getDescription(), dto.getPrice(), dto.getWeight(), decompressBytes(dto.getImg()))).collect(Collectors.toList());
//
//        return collect;
    }

    //Delete
    @Override
    public void DeleteProduct(Integer productId) {

//        Product product = this.productRepo.findById(productId).orElseThrow();
        this.productRepo.deleteById(productId);
        return;

    }


    //Update
    @Override
    public ProductDto UpdateProduct(ProductDto productDto,Integer ProductId) {

        Product newProduct = this.productRepo.findById(ProductId).orElseThrow();
        newProduct.setProductId(ProductId);
        newProduct.setDescription(productDto.getDescription());
        newProduct.setProductName(productDto.getProductName());
        newProduct.setWeight(Float.valueOf(productDto.getWeight()));
        newProduct.setPrice(Float.valueOf(productDto.getPrice()));
        newProduct.setImg(productDto.getImg());

        productRepo.save(newProduct);


        return this.modelMapper.map(newProduct,ProductDto.class);
    }





    // compress the image bytes before storing it in the database
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);

        return outputStream.toByteArray();
    }

    // uncompress the image bytes before returning it to the angular application
    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }

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
        log.info("product: "+productRepo.findById(3).get());
        log.info("Desc from Recommender: "+queryDescription);
        List<Product> allProducts = productRepo.findAll();
        log.info("list of products: " + allProducts);
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
