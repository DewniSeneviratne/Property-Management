import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTransaction, listTransaction } from '../services/TransactionService';

const ListTransactionComponent = () => {

    const [transactions, setTransactions] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAllTransactions();
    }, []);

    function getAllTransactions() {
        listTransaction().then((response) => {
            setTransactions(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewTransaction() {
        navigate('/add-transaction');
    }

    function updateTransaction(id) {
        navigate(`/edit-transaction/${id}`);
    }

    function removeTransaction(id) {
        console.log(id);

        deleteTransaction(id).then(() => {
            getAllTransactions();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container'>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className='text-center'>Transactions</h2>
                <button className='btn btn-success' onClick={addNewTransaction}>
                    <i className="bi bi-plus-circle me-2"></i> Add Transaction
                </button>
            </div>

            <div className="row">
                {
                    transactions.map(transaction =>
                        <div className="col-md-4 mb-4" key={transaction.id}>
                            <div className="card shadow bg-light">
                                <img
                                    src="/Finance.jpeg"
                                    className="card-img-top"
                                    alt="Transaction Image"
                                    style={{ height: '250px', objectFit: 'contain' }}
                                />
                                <div className="card-body" style={{ backgroundColor: '#f4f0ec' }}>
                                    <h5 className="card-title text-primary">Transaction Details</h5>
                                    <div className="row">
                                        <div className="col-5"><strong>Tenant Id:</strong></div>
                                        <div className="col-7">{transaction.tenantId}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>Amount:</strong></div>
                                        <div className="col-7">{transaction.amount}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>Transaction Type:</strong></div>
                                        <div className="col-7">{transaction.transactionType}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>Date:</strong></div>
                                        <div className="col-7">{transaction.transactionDate}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>Description:</strong></div>
                                        <div className="col-7">{transaction.description}</div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex justify-content-end">
                                    <div className="btn-group">
                                        <button className="btn btn-primary" onClick={() => updateTransaction(transaction.id)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => removeTransaction(transaction.id)}>
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default ListTransactionComponent;
