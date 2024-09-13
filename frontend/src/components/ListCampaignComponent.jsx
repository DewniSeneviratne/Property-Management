import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteCampaign, listCampaigns } from '../services/CampaignService';

const ListCampaignComponent = () => {

    const [campaigns, setCampaigns] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllCampaigns();
    }, []);

    function getAllCampaigns() {
        listCampaigns().then((response) => {
            setCampaigns(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewCampaign() {
        navigator('/add-campaign');
    }

    function updateCampaign(id) {
        navigator(`/edit-campaign/${id}`);
    }

    function removeCampaign(id) {
        console.log(id);

        deleteCampaign(id).then(() => {
            getAllCampaigns();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container'>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className='text-center'>Campaigns</h2>
                <button className='btn btn-info' onClick={addNewCampaign}>
                    <i className="bi bi-calendar-plus-fill me-2"></i> Add Campaign
                </button>
            </div>

            <div className="row">
                {
                    campaigns.map(campaign =>
                        <div className="col-md-4 mb-4" key={campaign.id}>
                            <div className="card shadow">
                                <img
                                    src="/campaign.jpeg"
                                    className="card-img-top"
                                    alt="Campaign Image"
                                    style={{ height: '250px', objectFit: 'contain' }}
                                />
                                <div className="card-body" style={{ backgroundColor: '#f4f0ec' }}>
                                    <h5 className="card-title text-primary">Campaign ID: {campaign.id}</h5>
                                    <div className="row">
                                        <div className="col-5"><strong>Estimated Price:</strong></div>
                                        <div className="col-7">${campaign.estprice}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>Start Date:</strong></div>
                                        <div className="col-7">{campaign.stDate}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>End Date:</strong></div>
                                        <div className="col-7">{campaign.endDate}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>Description:</strong></div>
                                        <div className="col-7">{campaign.description}</div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex">
                                    <div className='btn-group ms-auto'>
                                        <button className="btn btn-primary" onClick={() => updateCampaign(campaign.id)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => removeCampaign(campaign.id)}>
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

export default ListCampaignComponent;
