import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteMarketingProposal, listMarketingProposals } from '../services/MarketingService';

const ListMarketingComponent = () => {

    const [marketingProposals, setMarketingProposals] = useState([])

    const navigator = useNavigate();

    useEffect(()=>{
       getAllMarketingProposals();
    }, [])

    function getAllMarketingProposals(){
        listMarketingProposals().then((response)=>{
            setMarketingProposals(response.data);
        }).catch(error=>{
            console.error(error);
        })
    }

    function addNewMarketingProposal(){
        navigator('/add-marketing-proposal')
    }

    function updateMarketingProposal(id){
        navigator(`/edit-marketing-proposal/${id}`)
    }

    function removeMarketingProposal(id){
        deleteMarketingProposal(id).then((response)=>{
            getAllMarketingProposals();
        }).catch(error=>{
            console.error(error);
        })
    }

    return (
        <div className='container'>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className='text-center'>Marketing Proposals</h2>
                <button className='btn btn-info' onClick={addNewMarketingProposal}>
                    <i className="bi bi-file-earmark-plus-fill me-2"></i> Add Proposal
                </button>
            </div>

            <div className="row">
            {
  marketingProposals.map(proposal => 
    <div className="col-md-4 mb-4" key={proposal.proposalID}> {/* Add key here */}
      <div className="card shadow">
        <img 
          src="/proposal.jpeg" 
          className="card-img-top" 
          alt="Marketing Proposal Image" 
          style={{ height: '250px', objectFit: 'contain' }} 
        />
        <div className="card-body" style={{backgroundColor :'#f4f0ec'}}>
          <h5 className="card-title text-primary">{proposal.proposalName}</h5>
          <div className="row">
            <div className="col-5"><strong>Description:</strong></div>
            <div className="col-7">{proposal.proposalDescription}</div>
          </div>
          <div className="row">
            <div className="col-5"><strong>Approval Status:</strong></div>
            <div className="col-7">
              <span className={`badge rounded-pill ${proposal.proposalApproval ? 'bg-success' : 'bg-secondary'}`}>
                {proposal.proposalApproval ? 'Approved' : 'Pending'}
              </span>
            </div>
          </div>
        </div>
        <div className="card-footer d-flex">
          <div className='btn-group ms-auto'>
            <button className="btn btn-primary" onClick={() => updateMarketingProposal(proposal.proposalID)}>
              <i className="bi bi-pencil"></i>
            </button>
            <button className="btn btn-danger" onClick={() => removeMarketingProposal(proposal.proposalID)}>
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
    )
}

export default ListMarketingComponent;
