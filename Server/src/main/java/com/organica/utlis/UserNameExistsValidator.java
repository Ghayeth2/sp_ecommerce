package com.organica.utlis;

import com.organica.exceptions.UserNameExistsException;
import com.organica.repositories.UserRepo;
import org.springframework.stereotype.Component;

@Component
public class UserNameExistsValidator {
    private final UserRepo userRepository;

    public UserNameExistsValidator(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public boolean validate(final String userName) throws UserNameExistsException {
        return !userRepository.existsByEmail(userName);
    }
}
