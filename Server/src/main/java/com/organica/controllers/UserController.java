package com.organica.controllers;

import com.organica.entities.User;
import com.organica.exceptions.UserNameExistsException;
import com.organica.payload.SingIn;
import com.organica.payload.UserDto;
import com.organica.services.UserService;
import lombok.extern.log4j.Log4j2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
@Log4j2
public class UserController {

    @Autowired
    private UserService userService;


    @PostMapping("/singup")
    public ResponseEntity<?> CreateUser(@RequestBody UserDto userDto) throws UserNameExistsException {
        log.info("Creating user"+userDto);
        UserDto userDto1 = this.userService.CreateUser(userDto);
        return new ResponseEntity<>(userDto1, HttpStatus.OK);
    }


    @PostMapping("/singin")
    public ResponseEntity<SingIn> CreateUser(@RequestBody SingIn singIn){

        SingIn singIn1 = this.userService.SingIn(singIn);
        return new ResponseEntity<>(singIn1, HttpStatusCode.valueOf(200));
    }
}
