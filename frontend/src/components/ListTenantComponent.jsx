import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteTenant, listTenants } from '../services/TenantService';

const ListTenantComponent = () => {

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
        navigator('/add-tenant')
    }

    function updateTenant(id){
        navigator(`/edit-tenant/${id}`)
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
            <h2 className='text-center'>Tenants</h2>
            <button className='btn btn-info' onClick={addNewTenant}>
                <i className="bi bi-person-plus-fill me-2"></i> Add Tenant
            </button>
        </div>

        <div className="row">
            {
                tenants.map(tenant => 
                    <div className="col-md-4 mb-4" key={tenant.id}>
                        <div className="card shadow" >
                        <img 
  src="/tenant-front.png" 
  className="card-img-top" 
  alt="Tenant Image" 
  style={{ height: '250px', objectFit: 'contain' }} 
/>
                            
<div className="card-body" style={{backgroundColor :'#f4f0ec'}}>
                                <h5 className="card-title text-primary">{tenant.firstName} {tenant.lastName}</h5>
                                <div className="row">
                                    <div className="col-5"><strong>Email:</strong></div>
                                    <div className="col-7">{tenant.email}</div>
                                </div>
                                <div className="row">
                                    <div className="col-5"><strong>Phone:</strong></div>
                                    <div className="col-7">{tenant.phone}</div>
                                </div>
                                <div className="row">
                                    <div className="col-5"><strong>Address:</strong></div>
                                    <div className="col-7">{tenant.address}</div>
                                </div>
                                <div className="row">
                                    <div className="col-5"><strong>Move-in Date:</strong></div>
                                    <div className="col-7">{tenant.moveInDate}</div>
                                </div>
                                <div className="row">
                                    <div className="col-5"><strong>Move-out Date:</strong></div>
                                    <div className="col-7">{tenant.moveOutDate}</div>
                                </div>
                                <div className="row">
                                    <div className="col-5"><strong>Status:</strong></div>
                                    <div className="col-7">
                                        <span className={`badge rounded-pill ${tenant.status === 'Active' ? 'bg-success' : 'bg-secondary'}`}>
                                            {tenant.status}
                                        </span>
                                    </div>
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

export default ListTenantComponent;
