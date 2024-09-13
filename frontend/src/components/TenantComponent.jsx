import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createTenant, getTenant, updateTenant } from '../services/TenantService';

const TenantComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [moveInDate, setMoveInDate] = useState('');
    const [moveOutDate, setMoveOutDate] = useState('');
    const [status, setStatus] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        moveInDate: '',
        moveOutDate: '',
        status: '',
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getTenant(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
                setPhone(response.data.phone);
                setAddress(response.data.address);
                setMoveInDate(response.data.moveInDate);
                setMoveOutDate(response.data.moveOutDate);
                setStatus(response.data.status);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateTenant(e) {
        e.preventDefault();

        if (validateForm()) {
            const tenant = { firstName, lastName, email, phone, address, moveInDate, moveOutDate, status };
            if (id) {
                updateTenant(id, tenant).then(() => {
                    setSuccessMessage('Tenant updated successfully!');
                    setTimeout(() => {
                        navigator('/tenants');
                    }, 2000); // Redirect after 2 seconds
                }).catch(error => {
                    console.errors(error);
                });
            } else {
                createTenant(tenant).then(() => {
                    setSuccessMessage('Tenant added successfully!');
                    setTimeout(() => {
                        navigator('/tenants');
                    }, 2000); // Redirect after 2 seconds
                }).catch(error => {
                    console.errors(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!firstName.trim()) {
            errorsCopy.firstName = 'First Name is required';
            valid = false;
        } else {
            errorsCopy.firstName = '';
        }

        if (!lastName.trim()) {
            errorsCopy.lastName = 'Last Name is required';
            valid = false;
        }

        if (!email.trim()) {
            errorsCopy.email = 'Email is required';
            valid = false;
        }

        if (!address.trim()) {
            errorsCopy.address = 'Address is required';
            valid = false;
        }

        if (!status.trim()) {
            errorsCopy.status = 'Status is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <div className="card-header text-center "><h2>Update Tenant</h2></div>;
        } else {
            return <div className="card-header text-center "><h2>Add Tenant</h2></div>;
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
                                        <label className="form-label">First Name</label>
                                        <input type="text" placeholder='Enter Tenant First Name' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                        {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Last Name</label>
                                        <input type="text" placeholder='Enter Tenant Last Name' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                        {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" placeholder='Enter Tenant Email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                                    {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" placeholder='Enter Tenant Phone Number' className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" placeholder='Enter Tenant Address' className={`form-control ${errors.address ? 'is-invalid' : ''}`} value={address} onChange={(e) => setAddress(e.target.value)} />
                                    {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                                </div>

                                <div className="row mb-3">
                                    <div className="col">
                                        <label className="form-label">Move In Date</label>
                                        <input type="date" className="form-control" value={moveInDate} onChange={(e) => setMoveInDate(e.target.value)} />
                                    </div>
                                    <div className="col">
                                        <label className="form-label">Move Out Date</label>
                                        <input type="date" className="form-control" value={moveOutDate} onChange={(e) => setMoveOutDate(e.target.value)} />
                                    </div>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Status</label>
                                    <input type="text" placeholder='Active or Inactive' className={`form-control ${errors.status ? 'is-invalid' : ''}`} value={status} onChange={(e) => setStatus(e.target.value)} />
                                    {errors.status && <div className='invalid-feedback'>{errors.status}</div>}
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

export default TenantComponent;
