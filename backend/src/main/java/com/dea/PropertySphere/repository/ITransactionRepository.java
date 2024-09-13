package com.dea.PropertySphere.repository;

import com.dea.PropertySphere.Model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

//extends JpaRepository
//need to pass two parameters (type of the model, type of the pk)
//pk, id's type is Long
public interface ITransactionRepository extends JpaRepository<Transaction, Long> {

}
