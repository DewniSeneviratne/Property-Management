import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createProperty, getProperty, updateProperty } from '../services/PropertyService';

const PropertyComponent = () => {
    const [propertyName, setPropertyName] = useState('');
    const [propertyLocation, setPropertyLocation] = useState('');
    const [propertyOwner, setPropertyOwner] = useState('');
    const [propertyImg, setPropertyImg] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        propertyName: '',
        propertyLocation: '',
        propertyOwner: '',
        propertyImg: ''
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getProperty(id).then((response) => {
                setPropertyName(response.data.propertyName);
                setPropertyLocation(response.data.propertyLocation);
                setPropertyOwner(response.data.propertyOwner);
                setPropertyImg(response.data.propertyImg);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateProperty(e) {
        e.preventDefault();

        if (validateForm()) {
            const property = { propertyName, propertyLocation, propertyOwner, propertyImg };
            if (id) {
                updateProperty(id, property).then(() => {
                    setSuccessMessage('Property updated successfully!');
                    setTimeout(() => {
                        navigator('/properties');
                    }, 2000);
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createProperty(property).then(() => {
                    setSuccessMessage('Property added successfully!');
                    setTimeout(() => {
                        navigator('/properties');
                    }, 2000);
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!propertyName.trim()) {
            errorsCopy.propertyName = 'Property Name is required';
            valid = false;
        } else {
            errorsCopy.propertyName = '';
        }

        if (!propertyLocation.trim()) {
            errorsCopy.propertyLocation = 'Property Location is required';
            valid = false;
        }

        if (!propertyOwner.trim()) {
            errorsCopy.propertyOwner = 'Property Owner is required';
            valid = false;
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <div className="card-header text-center"><h2>Update Property</h2></div>;
        } else {
            return <div className="card-header text-center"><h2>Add Property</h2></div>;
        }
    }

    return (
        <div className='container my-4'>
            <div className="card shadow">
                {pageTitle()}
                <div className="card-body">
                    {successMessage && (
                        <div className="alert alert-success text-center" role="alert">
                            {successMessage}
                        </div>
                    )}
                    <div className='row'>
                        <div className="col-md-5 p-3 d-flex align-items-center justify-content-center">
                            <img src="/property-add.png" alt="Property" className="img-fluid rounded" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-7">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Property Name</label>
                                    <input type="text" placeholder='Enter Property Name' className={`form-control ${errors.propertyName ? 'is-invalid' : ''}`} value={propertyName} onChange={(e) => setPropertyName(e.target.value)} />
                                    {errors.propertyName && <div className='invalid-feedback'>{errors.propertyName}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Property Location</label>
                                    <textarea placeholder='Enter Property Location' className={`form-control ${errors.propertyLocation ? 'is-invalid' : ''}`} value={propertyLocation} onChange={(e) => setPropertyLocation(e.target.value)} />
                                    {errors.propertyLocation && <div className='invalid-feedback'>{errors.propertyLocation}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Property Owner</label>
                                    <input type="text" placeholder='Enter Property Owner' className={`form-control ${errors.propertyOwner ? 'is-invalid' : ''}`} value={propertyOwner} onChange={(e) => setPropertyOwner(e.target.value)} />
                                    {errors.propertyOwner && <div className='invalid-feedback'>{errors.propertyOwner}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Property Image URL</label>
                                    <input type="text" placeholder='Enter Property Image URL' className={`form-control ${errors.propertyImg ? 'is-invalid' : ''}`} value={propertyImg} onChange={(e) => setPropertyImg(e.target.value)} />
                                    {errors.propertyImg && <div className='invalid-feedback'>{errors.propertyImg}</div>}
                                </div>

                                <div className='text-center'>
                                    <button onClick={saveOrUpdateProperty} className="btn btn-success px-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PropertyComponent;
