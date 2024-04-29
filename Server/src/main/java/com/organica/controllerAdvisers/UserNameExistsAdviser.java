package com.organica.controllerAdvisers;

import com.organica.exceptions.UserNameExistsException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class UserNameExistsAdviser {

    @ExceptionHandler(UserNameExistsException.class)
    public ResponseEntity<Map<String, String>> handleUserNameExistsException(UserNameExistsException ex) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", ex.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }
}
