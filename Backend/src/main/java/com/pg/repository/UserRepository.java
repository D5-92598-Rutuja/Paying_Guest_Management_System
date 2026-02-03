package com.pg.repository;

import java.util.Optional;
<<<<<<< HEAD
=======

>>>>>>> 435c058182e35770fbaa5b0c50639bd23c1f1165
import org.springframework.data.jpa.repository.JpaRepository;
import com.pg.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
<<<<<<< HEAD

    Optional<User> findByEmail(String email);
=======
   
    Optional<User> findByEmail(String email);
    

>>>>>>> 435c058182e35770fbaa5b0c50639bd23c1f1165
}
