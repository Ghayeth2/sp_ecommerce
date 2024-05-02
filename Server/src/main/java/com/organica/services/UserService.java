package com.organica.services;

import com.organica.exceptions.UserNameExistsException;
import com.organica.payload.SingIn;
import com.organica.payload.UserDto;

public interface UserService {


    UserDto CreateUser(UserDto userDto) throws UserNameExistsException;

    SingIn SingIn(SingIn singIn);
}
