package com.dea.PropertySphere.Controller;

import com.dea.PropertySphere.dto.TransactionDto;
import com.dea.PropertySphere.Service.ITransactionService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    private ITransactionService transactionService;

    //Build Add transaction REST API
    @PostMapping
    public ResponseEntity<TransactionDto> createTransaction(@RequestBody TransactionDto transactionDto){
        TransactionDto savedTransaction = transactionService.createTransaction(transactionDto);
        return new ResponseEntity<>(savedTransaction, HttpStatus.CREATED);
    }


    //Build get transaction REST API
    //add doc comments
    @GetMapping("{id}")
    public ResponseEntity<TransactionDto> getTransactionId(@PathVariable("id") Long transactionId){
        TransactionDto transactionDto = transactionService.getTransactionById(transactionId);
        return ResponseEntity.ok(transactionDto);
    }


    //build get all transactions REST API
    @GetMapping
    public ResponseEntity<List<TransactionDto>> getAllTransactions(){
        List<TransactionDto> transactionDtos= transactionService.getAllTransactions();
        return  ResponseEntity.ok(transactionDtos);
    }

    //build update transactions REST API
    @PutMapping("{id}")
    public ResponseEntity<TransactionDto> updateTransaction(@PathVariable("id") Long transactionId,
                                                  @RequestBody TransactionDto updatedTransaction){
        TransactionDto transactionDto = transactionService.updateTransaction(transactionId, updatedTransaction);
        return ResponseEntity.ok(transactionDto);
    }

    //build delete transactions REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTransaction(@PathVariable("id") Long transactionId){
        transactionService.deleteTransaction(transactionId);
        return ResponseEntity.ok("Transaction deleted successfully");
    }
}
