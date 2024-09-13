package com.dea.PropertySphere.Service;

import com.dea.PropertySphere.dto.TransactionDto;

import java.util.List;

public interface ITransactionService {
    TransactionDto createTransaction (TransactionDto transactionDto); //create
    TransactionDto getTransactionById(Long transactionId); //get by Id
    List<TransactionDto> getAllTransactions(); //get all
    TransactionDto updateTransaction(Long transactionId, TransactionDto updatedTransaction); //put
    void deleteTransaction(Long transactionId); //delete
}
