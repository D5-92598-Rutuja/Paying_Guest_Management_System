package com.pg.entities.Categories;

import com.pg.entities.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "category")
public class Category extends BaseEntity{
	 @Enumerated(EnumType.STRING)
	 @Column(nullable = false, length = 10)
	 private CategoryPriority priority;   // HIGH, MEDIUM, LOW

	 @Column(name = "category_name", nullable = false, unique = true, length = 100)
	 private String categoryName;    // Payment, Maintenance, Refund
	
}
