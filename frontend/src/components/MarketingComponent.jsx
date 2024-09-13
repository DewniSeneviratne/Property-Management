import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createMarketingProposal, getMarketingProposal, updateMarketingProposal } from '../services/MarketingService';

const MarketingComponent = () => {
    const [proposalName, setProposalName] = useState('');
    const [proposalDescription, setProposalDescription] = useState('');
    const [proposalApproval, setProposalApproval] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { id } = useParams();
    const [errors, setErrors] = useState({
        proposalName: '',
        proposalDescription: '',
        proposalApproval: '',
    });

    const navigator = useNavigate();

    useEffect(() => {
        if (id) {
            getMarketingProposal(id).then((response) => {
                setProposalName(response.data.proposalName);
                setProposalDescription(response.data.proposalDescription);
                setProposalApproval(response.data.proposalApproval);
            }).catch(error => {
                console.error(error);
            });
        }
    }, [id]);

    function saveOrUpdateProposal(e) {
        e.preventDefault();

        if (validateForm()) {
            const proposal = { proposalName, proposalDescription, proposalApproval };
            if (id) {
                updateMarketingProposal(id, proposal).then(() => {
                    setSuccessMessage('Proposal updated successfully!');
                    setTimeout(() => {
                        navigator('/marketing');
                    }, 2000);
                }).catch(error => {
                    console.error(error);
                });
            } else {
                createMarketingProposal(proposal).then(() => {
                    setSuccessMessage('Proposal added successfully!');
                    setTimeout(() => {
                        navigator('/marketing');
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

        if (!proposalName.trim()) {
            errorsCopy.proposalName = 'Proposal Name is required';
            valid = false;
        } else {
            errorsCopy.proposalName = '';
        }

        if (!proposalDescription.trim()) {
            errorsCopy.proposalDescription = 'Proposal Description is required';
            valid = false;
        }

        

        setErrors(errorsCopy);
        return valid;
    }

    function pageTitle() {
        if (id) {
            return <div className="card-header text-center"><h2>Update Marketing Proposal</h2></div>;
        } else {
            return <div className="card-header text-center"><h2>Add Marketing Proposal</h2></div>;
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
                            <img src="/marketing.jpeg" alt="Marketing Proposal" className="img-fluid rounded" style={{ maxHeight: '300px', objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-7">
                            <form>
                                <div className="mb-3">
                                    <label className="form-label">Proposal Name</label>
                                    <input type="text" placeholder='Enter Proposal Name' className={`form-control ${errors.proposalName ? 'is-invalid' : ''}`} value={proposalName} onChange={(e) => setProposalName(e.target.value)} />
                                    {errors.proposalName && <div className='invalid-feedback'>{errors.proposalName}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Proposal Description</label>
                                    <textarea placeholder='Enter Proposal Description' className={`form-control ${errors.proposalDescription ? 'is-invalid' : ''}`} value={proposalDescription} onChange={(e) => setProposalDescription(e.target.value)} />
                                    {errors.proposalDescription && <div className='invalid-feedback'>{errors.proposalDescription}</div>}
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Approval Status</label>
                                    <select className={`form-control ${errors.proposalApproval ? 'is-invalid' : ''}`} value={proposalApproval} onChange={(e) => setProposalApproval(e.target.value)}>
                                        <option value="">Select Approval Status</option>
                                        <option value="true">Approved</option>
                                        <option value="false">Declined</option>
                                    </select>
                                    {errors.proposalApproval && <div className='invalid-feedback'>{errors.proposalApproval}</div>}
                                </div>

                                <div className='text-center'>
                                    <button onClick={saveOrUpdateProposal} className="btn btn-success px-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MarketingComponent;
