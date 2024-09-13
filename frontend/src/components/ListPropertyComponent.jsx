import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteProperty, listProperties } from '../services/PropertyService';

const ListPropertyComponent = () => {

    const [properties, setProperties] = useState([]);

    const navigator = useNavigate();

    useEffect(() => {
        getAllProperties();
    }, []);

    function getAllProperties() {
        listProperties().then((response) => {
            setProperties(response.data);
        }).catch(error => {
            console.error(error);
        });
    }

    function addNewProperty() {
        navigator('/add-property');
    }

    function updateProperty(id) {
        navigator(`/edit-property/${id}`);
    }

    function removeProperty(id) {
        deleteProperty(id).then(() => {
            getAllProperties();
        }).catch(error => {
            console.error(error);
        });
    }

    return (
        <div className='container'>
            <div className="d-flex justify-content-between align-items-center my-4">
                <h2 className='text-center'>Property List</h2>
                <button className='btn btn-info' onClick={addNewProperty}>
                    <i className="bi bi-file-earmark-plus-fill me-2"></i> Add Property
                </button>
            </div>

            <div className="row">
                {
                    properties.map(property => 
                        <div className="col-md-4 mb-4" key={property.propertyID}>
                            <div className="card shadow">
                                <img 
                                    src={property.propertyImg || "/property-placeholder.jpeg"} 
                                    className="card-img-top" 
                                    alt="Property Image" 
                                    style={{ height: '250px', objectFit: 'contain' }} 
                                />
                                <div className="card-body" style={{ backgroundColor: '#f4f0ec' }}>
                                    <h5 className="card-title text-primary">{property.propertyName}</h5>
                                    <div className="row">
                                        <div className="col-5"><strong>Location:</strong></div>
                                        <div className="col-7">{property.propertyLocation}</div>
                                    </div>
                                    <div className="row">
                                        <div className="col-5"><strong>Owner:</strong></div>
                                        <div className="col-7">{property.propertyOwner}</div>
                                    </div>
                                </div>
                                <div className="card-footer d-flex">
                                    <div className='btn-group ms-auto'>
                                        <button className="btn btn-primary" onClick={() => updateProperty(property.propertyID)}>
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button className="btn btn-danger" onClick={() => removeProperty(property.propertyID)}>
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
};

export default ListPropertyComponent;
