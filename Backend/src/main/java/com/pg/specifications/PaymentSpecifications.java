package com.pg.specifications;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.jpa.domain.Specification;

import com.pg.entities.Payment;
import com.pg.entities.PaymentStatus;
import com.pg.entities.PaymentType;
import jakarta.persistence.criteria.Predicate;

public class PaymentSpecifications {

    public static Specification<Payment> filter(String status, String type, String monthYear) {  // e.g. "2026-01"
        return (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (status != null && !status.isEmpty()) {
                predicates.add(cb.equal(root.get("paymentStatus"), PaymentStatus.valueOf(status)));
            }
            if (type != null && !type.isEmpty()) {
                predicates.add(cb.equal(root.get("paymentType"), PaymentType.valueOf(type)));
            }
            if (monthYear != null && !monthYear.isEmpty()) {
                String[] parts = monthYear.split("-");
                predicates.add(cb.equal(cb.function("year", Integer.class, root.get("paymentDate")), 
                                       Integer.parseInt(parts[0])));
                predicates.add(cb.equal(cb.function("month", Integer.class, root.get("paymentDate")), 
                                       Integer.parseInt(parts[1])));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
    }
}
