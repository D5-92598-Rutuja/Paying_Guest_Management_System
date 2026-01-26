package com.pg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pg.entities.Categories.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long>{

	//Optional<Category> findById(Long categoryId);
}
