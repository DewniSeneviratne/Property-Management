import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTransaction, getTransaction, updateTransaction } from '../services/TransactionService';

const TransactionComponent = () => {

  const [tenantId, setTenantId] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('');
  const [transactionDate, setTransactionDate] = useState('');
  const [description, setDescription] = useState('');

  const { id } = useParams();

  const [errors, setErrors] = useState({
    tenantId: '',
    amount: '',
    transactionType: '',
    transactionDate: '',
    description: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getTransaction(id).then((response) => {
        setTenantId(response.data.tenantId);
        setAmount(response.data.amount);
        setTransactionType(response.data.transactionType);
        // Format the date properly for datetime-local input
        const formattedDate = new Date(response.data.transactionDate).toISOString().slice(0, 16);
        setTransactionDate(formattedDate);
        setDescription(response.data.description);
      }).catch(error => {
        console.error(error);
      });
    }
  }, [id]);

  function saveOrUpdateTransaction(e) {
    e.preventDefault();

    if (validateForm()) {
      const transaction = { tenantId, amount, transactionType, transactionDate, description };

      if (id) {
        updateTransaction(id, transaction).then((response) => {
          console.log(response.data);
          navigate('/transactions');
        }).catch(error => {
          console.error(error);
        });
      } else {
        createTransaction(transaction).then((response) => {
          console.log(response.data);
          navigate('/transactions');
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }

  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (!amount.trim()) {
      errorsCopy.amount = 'Amount is required';
      valid = false;
    }
    if (!transactionType.trim()) {
      errorsCopy.transactionType = 'Transaction type is required';
      valid = false;
    }
    if (!description.trim()) {
      errorsCopy.description = 'Description is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <div className="card-header text-center"><h2>Update Transaction</h2></div>;
    } else {
      return <div className="card-header text-center"><h2>Add Transaction</h2></div>;
    }
  }

  return (
    <div className='container my-3'>
      <div className="card">
        {
          pageTitle()
        }
        <div className="card-body">
          <div className='row'>
            <div className="col-md-6 p-1 d-flex align-items-center justify-content-center">
              <img src="/property-fin.jpeg" alt="Transaction" className="img-fluid rounded" style={{ width: '250px', height: 'auto' }} />
            </div>
            <div className="col-md-6">
              <form>
                <div className="mb-1">
                  <label className="form-label">Tenant Id</label>
                  <input
                    type="text"
                    placeholder='Enter Tenant Id'
                    className={`form-control ${errors.tenantId ? 'is-invalid' : ''}`}
                    name='tenantId'
                    value={tenantId}
                    onChange={(e) => setTenantId(e.target.value)}
                  />
                  {errors.tenantId && <div className='invalid-feedback'>{errors.tenantId}</div>}
                </div>
                <div className="mb-1">
                  <label className="form-label">Amount</label>
                  <input
                    type="text"
                    placeholder='Enter amount'
                    className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                    name='amount'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  {errors.amount && <div className='invalid-feedback'>{errors.amount}</div>}
                </div>
                <div className="mb-1">
                  <label className="form-label">Transaction Type</label>
                  <input
                    type="text"
                    placeholder='Enter Transaction Type'
                    className={`form-control ${errors.transactionType ? 'is-invalid' : ''}`}
                    name='transactionType'
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value)}
                  />
                  {errors.transactionType && <div className='invalid-feedback'>{errors.transactionType}</div>}
                </div>
                <div className="mb-1">
                  <label className="form-label">Date</label>
                  <input
                    type="datetime-local"
                    className={`form-control ${errors.transactionDate ? 'is-invalid' : ''}`}
                    name='transactionDate'
                    value={transactionDate}
                    onChange={(e) => setTransactionDate(e.target.value)}
                  />
                  {errors.transactionDate && <div className='invalid-feedback'>{errors.transactionDate}</div>}
                </div>
                <div className="mb-1">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    placeholder='Enter description'
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    name='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                </div>
                <div className='text-center'>
                  <button onClick={saveOrUpdateTransaction} className="btn btn-success">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransactionComponent;
