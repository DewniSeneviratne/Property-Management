import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTenant, getTenant, updateTenant } from '../services/MaintatanceService';

const MaintenanceComponent = () => {
    const [facilityName, setFacilityName] = useState('');
    const [description, setDescription] = useState('');
    const [cost, setCost] = useState('');
    const [status, setStatus] = useState('');
    const [requestDate, setRequestDate] = useState('');
    const [completionDate, setCompletionDate] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        facilityName: '',
        description: '',
        cost: '',
        status: '',
        requestDate: '',
        completionDate: '',
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getTenant(id).then((response) => {
                setFacilityName(response.data.facilityName);
                setDescription(response.data.description);
                setCost(response.data.cost);
                setStatus(response.data.status);
                setRequestDate(response.data.requestDate);
                setCompletionDate(response.data.completionDate);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateTenant(e) {
        e.preventDefault();

        if (validateForm()) {
            const tenant = {
                facilityName,
                description,
                cost,
                status,
                requestDate,
                completionDate
            };
    
            if (id) {
                updateTenant(id, tenant).then(() => {
                    setSuccessMessage('Maintenance updated successfully!');
                    setTimeout(() => {
                        navigator('/maintenance');
                    }, 3000); // Redirect after 2 seconds
                }).catch(error => {
                    console.errors(error);
                });
            } else {
                createTenant(tenant).then(() => {
                    setSuccessMessage('Maintenance added successfully!');
                    setTimeout(() => {
                        navigator('/maintenance');
                    }, 3000); // Redirect after 2 seconds
                }).catch(error => {
                    console.errors(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };
    
        if (!facilityName.trim()) {
            errorsCopy.facilityName = 'Facility Name is required';
            valid = false;
        } else {
            errorsCopy.facilityName = '';
        }
    
        if (!description.trim()) {
            errorsCopy.description = 'Description is required';
            valid = false;
        } else {
            errorsCopy.description = '';
        }
    
        if (!cost) {
            errorsCopy.cost = 'Cost is required';
            valid = false;
        } else if (isNaN(cost)) {
            errorsCopy.cost = 'Cost must be a valid number';
            valid = false;
        } else {
            errorsCopy.cost = '';
        }
    
        if (!status.trim()) {
            errorsCopy.status = 'Status is required';
            valid = false;
        } else {
            errorsCopy.status = '';
        }
    
        if (!requestDate.trim()) {
            errorsCopy.requestDate = 'Request Date is required';
            valid = false;
        } else {
            errorsCopy.requestDate = '';
        }
    
        if (completionDate && new Date(completionDate) < new Date(requestDate)) {
            errorsCopy.completionDate = 'Completion Date cannot be earlier than Request Date';
            valid = false;
        } else {
            errorsCopy.completionDate = '';
        }
    
        setErrors(errorsCopy);
        return valid;
    }
    

    function pageTitle() {
        if (id) {
            return <div className="card-header text-center "><h2>Update Maintenance</h2></div>;
        } else {
            return <div className="card-header text-center "><h2>Add Maintenance</h2></div>;
        }
    }

    return (
        <div className='container my-4'>
            <div className="card shadow">
                {pageTitle()}
                <div className="card-body">
                {successMessage && ( // Conditionally render success message
                        <div className="alert alert-success text-center" role="alert">
                            {successMessage}
                        </div>
                    )}
                    <div className='row'>
                        <div className="col-md-5 p-3 d-flex align-items-center justify-content-center">
                            <img src="/add-tenant.png" alt="Tenant" className="img-fluid rounded" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-7">
                        <form>
    <div className="row mb-3">
        <div className="col">
            <label className="form-label">Facility Name</label>
            <input 
                type="text" 
                placeholder='Enter Facility Name' 
                className={`form-control ${errors.facilityName ? 'is-invalid' : ''}`} 
                value={facilityName} 
                onChange={(e) => setFacilityName(e.target.value)} 
            />
            {errors.facilityName && <div className='invalid-feedback'>{errors.facilityName}</div>}
        </div>
        <div className="col">
            <label className="form-label">Description</label>
            <input 
                type="text" 
                placeholder='Enter Description' 
                className={`form-control ${errors.description ? 'is-invalid' : ''}`} 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
            />
            {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
        </div>
    </div>

    <div className="mb-3">
        <label className="form-label">Cost</label>
        <input 
            type="number" 
            placeholder='Enter Cost' 
            className={`form-control ${errors.cost ? 'is-invalid' : ''}`} 
            value={cost} 
            onChange={(e) => setCost(e.target.value)} 
        />
        {errors.cost && <div className='invalid-feedback'>{errors.cost}</div>}
    </div>

    <div className="mb-3">
        <label className="form-label">Status</label>
        <input 
            type="text" 
            placeholder='Enter Status (Pending, In Progress, Completed)' 
            className={`form-control ${errors.status ? 'is-invalid' : ''}`} 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
        />
        {errors.status && <div className='invalid-feedback'>{errors.status}</div>}
    </div>

    <div className="row mb-3">
        <div className="col">
            <label className="form-label">Request Date</label>
            <input 
                type="date" 
                className={`form-control ${errors.requestDate ? 'is-invalid' : ''}`} 
                value={requestDate} 
                onChange={(e) => setRequestDate(e.target.value)} 
            />
            {errors.requestDate && <div className='invalid-feedback'>{errors.requestDate}</div>}
        </div>
        <div className="col">
            <label className="form-label">Completion Date</label>
            <input 
                type="date" 
                className={`form-control ${errors.completionDate ? 'is-invalid' : ''}`} 
                value={completionDate} 
                onChange={(e) => setCompletionDate(e.target.value)} 
            />
            {errors.completionDate && <div className='invalid-feedback'>{errors.completionDate}</div>}
        </div>
    </div>

    <div className='text-center'>
        <button onClick={saveOrUpdateTenant} className="btn btn-success px-4">Submit</button>
    </div>
</form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MaintenanceComponent;
