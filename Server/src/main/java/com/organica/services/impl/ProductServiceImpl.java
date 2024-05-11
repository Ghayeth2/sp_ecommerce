package com.organica.services.impl;

import com.organica.entities.Product;
import com.organica.payload.ProductDto;
import org.apache.commons.text.similarity.CosineSimilarity;
import com.organica.payload.ProductDtoPost;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;
import java.util.zip.Deflater;
import java.util.zip.Inflater;

@Service
@Log4j2
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ProductRepo productRepo;

    private final String DB_PATH = "D:\\Java\\sp\\galleries\\images";

    //Create
    @Override
    public ProductDto CreateProduct(ProductDto productDto, MultipartFile file) throws IOException {
        Product product = this.modelMapper.map(productDto, Product.class);
        // Saving image into File System
        String filePath = DB_PATH + file.getOriginalFilename();
        file.transferTo(new File(filePath));
        // Set the image path to the product
        product.setImg(filePath);

        Product save = this.productRepo.save(product);
        return this.modelMapper.map(save, ProductDto.class);
    }

    @Override
    public ProductDto ReadProduct(Integer ProductId) {
        Product save = this.productRepo.findById(ProductId).orElseThrow();
        return this.modelMapper.map(save, ProductDto.class);
    }

    @Override
    public List<ProductDto> findAllByCategory(String category) {
        Optional<List<Product>> products = this.productRepo.findAllByCategory(category);
        List<ProductDto> productDtos = new ArrayList<>();
        if (products.isPresent()) {
            productDtos = products.get().stream()
                    // .map used to extract objects between collections
                    // 2nd .map is to extract fields of Product into ProductDto
                    .map(p -> this.modelMapper.map(p, ProductDto.class))
                    .toList();
        }
        return productDtos;
    }

    @Override
    public List<ProductDto> getAll() {
        List<Product> all = this.productRepo.findAll();
        return all.stream().map(dto -> new ProductDto(dto.getProductId(),
                dto.getProductName(),
                dto.getDescription(),
                dto.getPrice(),
                dto.getCategory(),
                dto.getImg())).collect(Collectors.toList());
    }

    @Override
    public Page<Product> ReadAllProduct(Pageable pageable) {
        return this.productRepo.findAll(pageable);
    }

    @Override
    public void DeleteProduct(Integer productId) {
        this.productRepo.deleteById(productId);
        return;

    }


    //Update
    @Override
    public ProductDto UpdateProduct(ProductDto productDto, Integer ProductId, MultipartFile file) throws IOException {

        Product newProduct = this.productRepo.findById(ProductId).orElseThrow();
        newProduct.setProductId(ProductId);
        newProduct.setDescription(productDto.getDescription());
        newProduct.setProductName(productDto.getProductName());
        newProduct.setCategory((productDto.getCategory()));
        newProduct.setPrice(Float.valueOf(productDto.getPrice()));
        // Saving image into File System
        String filePath = DB_PATH + file.getOriginalFilename();
        file.transferTo(new File(filePath));

        // Set the image path to the product
        newProduct.setImg(filePath);

        productRepo.save(newProduct);


        return this.modelMapper.map(newProduct, ProductDto.class);
    }

    private static final int VECTOR_SIZE = 1000;

    public Vector convertToVector(String input, Map<String, Integer> dictionary, Map<String, Double> idfValues) {
        Set<String> terms = extractTerms(input);
        Vector vector = new DenseVector(VECTOR_SIZE);

        for (String term : terms) {
            int termID = dictionary.computeIfAbsent(term, k -> dictionary.size());
            if (termID < VECTOR_SIZE) {
                double tfidf = calculateTFIDF(term, terms, idfValues);
                vector.setQuick(termID, tfidf);
            }
        }
        return vector.normalize();
    }

    private double calculateTFIDF(String term, Set<String> document, Map<String, Double> idfValues) {
        double tf = calculateTermFrequency(term, document);
        double idf = idfValues.getOrDefault(term, 0.0);
//        log.info("tf * idf: "+tf * idf);
        return tf * idf;
    }

    private double calculateTermFrequency(String term, Set<String> document) {
        long termCount = document.stream().filter(word -> word.equalsIgnoreCase(term)).count();
//        log.info("Term Count: " + termCount);
        return (double) termCount / document.size();
    }

    private Set<String> extractTerms(String input) {
        Set<String> words = new HashSet<>();
        String[] tokens = input.split("\\s+");
        for (String token : tokens) {
            words.add(token.toLowerCase());
        }
//        log.info("Terms: " + words);
        return words;
    }

    public List<RecommenderDto> findSimilarProducts(String queryDescription) {
        List<Product> allProducts = productRepo.findAll();
        Map<String, Integer> dictionary = new HashMap<>();
        Map<String, Double> idfValues = new HashMap<>();

        for (Product product : allProducts) {
            Set<String> terms = extractTerms(product.getDescription());
            terms.forEach(term -> idfValues.put(term, idfValues.getOrDefault(term, 0.0) + 1));
        }
        for (String term : idfValues.keySet()) {
            idfValues.put(term, Math.log((double) allProducts.size() / (idfValues.get(term) + 1)));
        }

        Vector queryVector = convertToVector(queryDescription, dictionary, idfValues);

        List<RecommenderDto> similarProducts = new ArrayList<>();
        for (Product product : allProducts) {
//            if (queryDescription.equals(product.getDescription())) {
//                continue;
//            }

            Set<String> queryTerms = extractTerms(queryDescription);
            Set<String> productTerms = extractTerms(product.getDescription());
            double docSimilarity = calculateCosineSimilarity(queryVector, convertToVector(product.getDescription(), dictionary, idfValues));

            double wordSimilarity = calculateWordSimilarity(queryTerms, productTerms);

            // For short length descriptions// Prevent cosine similarity to be high value
            // when overall length short & similarity is one word, calculation will be high value
            if (queryTerms.size() <= 10 && wordSimilarity < 0.19) {
//                log.info("Word Similarity ISOLATED: " + wordSimilarity);
                continue;
            }

            double combinedSimilarity = (docSimilarity + wordSimilarity) / 2.5;

            if (combinedSimilarity > 0.1 && combinedSimilarity < 0.9) {
                log.info("product terms: "+ productTerms);
                log.info("query terms:"+queryTerms);
                log.info("doc similarity:"+docSimilarity);
                log.info("word similarity:"+wordSimilarity);
                log.info("combined similarity:"+combinedSimilarity);
                log.info("--------------------------------------");
                RecommenderDto productDto = RecommenderDto.builder()
                        .productId(product.getProductId())
                        .productName(product.getProductName())
                        .price(product.getPrice())
                        .description(product.getDescription())
                        .img(product.getImg())
                        .category(product.getCategory())
                        .similarity(combinedSimilarity)
                        .build();
                similarProducts.add(productDto);
            }
        }

        similarProducts.sort((p1, p2) -> Double.compare(p2.getSimilarity(), p1.getSimilarity()));

        return similarProducts.subList(0, Math.min(10, similarProducts.size()));
    }


    private double calculateCosineSimilarity(Vector vector1, Vector vector2) {
//        log.info("similarity: "+vector1.dot(vector2) / (vector1.norm(2) * vector2.norm(2)));
        return vector1.dot(vector2) / (vector1.norm(2) * vector2.norm(2));
    }

    private double calculateWordSimilarity(Set<String> queryTerms, Set<String> productTerms) {
        Set<String> intersection = new HashSet<>(queryTerms);
        intersection.retainAll(productTerms);

        Set<String> union = new HashSet<>(queryTerms);
        union.addAll(productTerms);

        return (double) intersection.size() / union.size();
    }
}


//    public List<RecommenderDto> findSimilarProducts(String queryDescription) {
//        List<Product> allProducts = productRepo.findAll();
//        Map<String, Integer> dictionary = new HashMap<>();
//        Map<String, Double> idfValues = new HashMap<>();
//
//        for (Product product : allProducts) {
//            Set<String> terms = extractTerms(product.getDescription());
//            terms.forEach(term -> idfValues.put(term, idfValues.getOrDefault(term, 0.0) + 1));
//        }
//        for (String term : idfValues.keySet()) {
//            idfValues.put(term, Math.log((double) allProducts.size() / (idfValues.get(term) + 1)));
//        }
//
//        Vector queryVector = convertToVector(queryDescription, dictionary, idfValues);
//
//        List<RecommenderDto> similarProducts = new ArrayList<>();
//        for (Product product : allProducts) {
//            if (queryDescription.equals(product.getDescription())) {
//                continue;
//            }
//
//            Set<String> queryTerms = extractTerms(queryDescription);
//            Set<String> productTerms = extractTerms(product.getDescription());
//            double docSimilarity = calculateCosineSimilarity(queryVector, convertToVector(product.getDescription(), dictionary, idfValues));
//
//            double wordSimilarity = calculateWordSimilarity(queryTerms, productTerms);
//
//            double combinedSimilarity = (docSimilarity + wordSimilarity) / 2.5;
//
//            if (combinedSimilarity > 0.1 && combinedSimilarity < 0.9) {
//                RecommenderDto productDto = RecommenderDto.builder()
//                        .productId(product.getProductId())
//                        .productName(product.getProductName())
//                        .price(product.getPrice())
//                        .description(product.getDescription())
//                        .img(product.getImg())
//                        .category(product.getCategory())
//                        .similarity(combinedSimilarity)
//                        .build();
//                similarProducts.add(productDto);
//            }
//        }
//
//        similarProducts.sort((p1, p2) -> Double.compare(p2.getSimilarity(), p1.getSimilarity()));
//
//        return similarProducts.subList(0, Math.min(10, similarProducts.size()));
//    }