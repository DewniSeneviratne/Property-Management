import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTenant, listTenants } from '../services/MaintatanceService';

const ListMaintenanceComponent = () => {

    const [tenants, setTenants] = useState([])

    const navigator = useNavigate();

    useEffect(()=>{
       getAllTenants();
    }, [])

    function getAllTenants(){
        listTenants().then((response)=>{
            setTenants(response.data);
        }).catch(error=>{
            console.error(error);
        })
    }

    function addNewTenant(){
        navigator('/add-maintenance')
    }

    function updateTenant(id){
        navigator(`/edit-maintenance/${id}`)
    }

    function removeTenant(id){
        console.log(id);

        deleteTenant(id).then((response)=>{
            getAllTenants();
        }).catch(error=>{
            console.errors(error);
        })
    }

  return (
    <div className='container'>
        <div className="d-flex justify-content-between align-items-center my-4">
            <h2 className='text-center'>Maintenance</h2>
            <button className='btn btn-info' onClick={addNewTenant}>
                <i className="bi bi-person-plus-fill me-2"></i> Add Maintenance
            </button>
        </div>

        <div className="row">
            {
                tenants.map(tenant => 
                    <div className="col-md-4 mb-4" key={tenant.id}>
                        <div className="card shadow" >
                        <img 
  src="/maintenance.png" 
  className="card-img-top" 
  alt=" maintenance Image" 
  style={{ height: '250px', objectFit: 'contain' }} 
/>
<div className="card-body" style={{backgroundColor :'#f4f0ec'}}>
    <h5 className="card-title text-primary">{tenant.facilityName}</h5>
    
    <div className="row">
        <div className="col-5"><strong>Description:</strong></div>
        <div className="col-7">{tenant.description}</div>
    </div>
    
    <div className="row">
        <div className="col-5"><strong>Cost:</strong></div>
        <div className="col-7">{tenant.cost}</div>
    </div>
    
    <div className="row">
        <div className="col-5"><strong>Status:</strong></div>
        <div className="col-7">
            <span className={`badge rounded-pill ${tenant.status === 'Completed' ? 'bg-success' : tenant.status === 'In Progress' ? 'bg-warning' : 'bg-secondary'}`}>
                {tenant.status}
            </span>
        </div>
    </div>
    
    <div className="row">
        <div className="col-5"><strong>Request Date:</strong></div>
        <div className="col-7">{tenant.requestDate}</div>
    </div>
    
    <div className="row">
        <div className="col-5"><strong>Completion Date:</strong></div>
        <div className="col-7">{tenant.completionDate}</div>
    </div>
</div>

                            <div className="card-footer d-flex">
    <div className='btn-group ms-auto'>
        <button className="btn btn-primary" onClick={() => updateTenant(tenant.id)}>
            <i className="bi bi-pencil"></i>
        </button>
        <button className="btn btn-danger" onClick={() => removeTenant(tenant.id)}>
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

export default ListMaintenanceComponent;
