import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createCampaign, getCampaign, updateCampaign } from '../services/CampaignService';

const CampaignComponent = () => {
    const [estprice, setEstprice] = useState('');
    const [stDate, setStDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [description, setDescription] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({
        estprice: '',
        stDate: '',
        endDate: '',
        description: '',
    });

    const { id } = useParams();
    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getCampaign(id).then((response) => {
                setEstprice(response.data.estprice);
                setStDate(response.data.stDate);
                setEndDate(response.data.endDate);
                setDescription(response.data.description);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateCampaign(e) {
        e.preventDefault();

        if (validateForm()) {
            const campaign = { estprice, stDate, endDate, description };
            if (id) {
                updateCampaign(id, campaign).then(() => {
                    setSuccessMessage('Campaign updated successfully!');
                    setTimeout(() => {
                        navigator('/campaigns');
                    }, 2000); // Redirect after 2 seconds
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createCampaign(campaign).then(() => {
                    setSuccessMessage('Campaign added successfully!');
                    setTimeout(() => {
                        navigator('/campaigns');
                    }, 2000); // Redirect after 2 seconds
                }).catch(error => {
                    console.error(error);
                });
            }
        }
    }

    function validateForm() {
        let valid = true;
        const errorsCopy = { ...errors };

        if (!estprice || isNaN(estprice)) {
            errorsCopy.estprice = 'Estimated Price is required and should be a number';
            valid = false;
        } else {
            errorsCopy.estprice = '';
        }

        if (!stDate) {
            errorsCopy.stDate = 'Start Date is required';
            valid = false;
        } else {
            errorsCopy.stDate = '';
        }

        if (!endDate) {
            errorsCopy.endDate = 'End Date is required';
            valid = false;
        } else {
            errorsCopy.endDate = '';
        }

        if (!description.trim()) {
            errorsCopy.description = 'Description is required';
            valid = false;
        } else {
            errorsCopy.description = '';
        }

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <div className="card-header text-center "><h2>Update Campaign</h2></div>;
        } else {
            return <div className="card-header text-center "><h2>Add Campaign</h2></div>;
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
                            <img src="/property-keys.jpg" alt="Campaign" className="img-fluid rounded" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-7">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Estimated Price</label>
                                    <input
                                        type="number"
                                        placeholder='Enter Estimated Price'
                                        className={`form-control ${errors.estprice ? 'is-invalid' : ''}`}
                                        value={estprice}
                                        onChange={(e) => setEstprice(e.target.value)}
                                    />
                                    {errors.estprice && <div className='invalid-feedback'>{errors.estprice}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Start Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.stDate ? 'is-invalid' : ''}`}
                                        value={stDate}
                                        onChange={(e) => setStDate(e.target.value)}
                                    />
                                    {errors.stDate && <div className='invalid-feedback'>{errors.stDate}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">End Date</label>
                                    <input
                                        type="date"
                                        className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                                        value={endDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />
                                    {errors.endDate && <div className='invalid-feedback'>{errors.endDate}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Description</label>
                                    <textarea
                                        placeholder='Enter Campaign Description'
                                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                    {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
                                </div>

                                <div className='text-center'>
                                    <button onClick={saveOrUpdateCampaign} className="btn btn-success px-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CampaignComponent;
