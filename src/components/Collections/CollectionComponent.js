import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import { WithProtected } from '../../hooks/routeProtection';
import UseRandomString from '../../hooks/useRandomString';
import Header from '../Header/Header';
import NavComponent from '../Navigation/NavComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
// import './Collections.css';

const CollectionComponent = ({ user }) => {
 
    const [collectionData, setCollectionData] = useState([])
    const [paymentModalShow, setPaymentModalShow] = useState(false)
    const [payment, setPayment] = useState(125)

    const fetchCollections = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/users/${userId}/collectee/collections/pending`)
            setCollectionData(res.data)
        } catch (error) {
            console.error(error?.message)
        }
    }

    const CollectionElements = (collectionData, i) => {

        return (
            <React.Fragment key={i} >
                <div className="m-2 p-3 bg-info mb-4 rounded shadow">
                    <p className='d-flex align-items-center justify-content-center alert alert-info shadow-sm text-center'>
                        <FontAwesomeIcon icon={faInfoCircle} size="lg"/>
                        Make payment once collector is within your premises
                    </p>
                    <div className='card border-0 shadow'>
                        <div className='card-header bg-primary'>
                            <h6 className='text-white'>
                                Collection ID: {collectionData?.collection_code}
                            </h6>
                        </div>
                        <div className='card-body'>
                        <div className='row'>
                            <div className='col'>
                                <p>
                                    Service Cost: Kes. {Number(payment).toLocaleString()}/=
                                </p>
                                <p 
                                className='text-dark'
                                >
                                    Estimated Collection Time: {Boolean(collectionData?.estimate_collection_time) ? 
                                    collectionData.estimate_collection_time : 
                                    'Pending'}
                                </p>
                                <p>
                                    Payment Complete: No
                                </p>
                            
                            </div>
                            <div className='col'>
                                <p 
                                    className='text-dark'
                                >
                                    Collector: {Boolean(collectionData?.collector_id) ? 
                                    'Confirmed' : 
                                    'Pending Confirmation'}
                                </p>
                                <p 
                                    className='text-dark'
                                >
                                    Collected: {Boolean(collectionData?.collected) ? 
                                    'Yes': 
                                    'Not Yet'}
                                </p>
                                <p 
                                    className='text-dark'
                                >
                                    Collected At: {Boolean(collectionData?.collection_collected_at) ? 
                                    collectionData.collection_collected_at : 
                                    'Pending'}
                                </p>
                            </div>
                        </div>
                        </div>
                        <div className='d-flex card-footer bg-light'>
                            <Button variant='light' className='w-100 m-1'>
                                Cancel Collection
                            </Button>
                            <Button onClick={() => setPaymentModalShow(true)} className='w-100 m-1'>
                                Make Payment
                            </Button>   
                        </div>
                    </div>
                   
                  
          
             

                   {paymentModalShow &&
                    <PaymentModal 
                        serviceId={collectionData?.service_id}
                        collectionId={collectionData?.id}
                        payment={payment}
                        paymentModalShow={paymentModalShow}
                        setPaymentModalShow={setPaymentModalShow}
                    />
                    }
                </div>
            </React.Fragment>
        )
    }

    useEffect(() => {
      
    fetchCollections(user?.id)

    }, [])

    return (
        <>
       
                <Container>
                    <Card className='mt-4 border-0 shadow mb-5'>
                        <Card.Header className='bg-primary text-white'>
                            Pending Collections
                        </Card.Header>
                        <Card.Body>
                            {collectionData.length > 0 ? 
                            collectionData.map(CollectionElements)
                             : 
                            <p>No pending collections</p>}
                        </Card.Body>
                      
                    </Card>
                 
                </Container>
        </>
    )
}

export const PaymentModal = ({ paymentModalShow, payment, setPaymentModalShow, serviceId, collectionId }) => {
    const [userDetails, setUserDetails] = useState({
        phone_number: null,
        amount: null,
        collection_id: null,
        service_id: null,
        user_id: null,
        payment_reference_code: null
    })

    const referenceCode = UseRandomString()
    const {phone_number, amount, service_id, collection_id, user_id} = userDetails

    const handleChange = (e) => setUserDetails(prev => ({...prev, [e.target.name]: e.target.value}))

    const handleCheckout = async () => {
        const res = await axios.
         post(`http://localhost:8000/api/v1/users/${user_id}/collections/${collection_id}/services/${service_id}`, userDetails)
        
         if(res.status === 201) {
            setPaymentModalShow(false)
        }
    }

    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('auth-user')).id
        const phone_number = JSON.parse(localStorage.getItem('auth-user')).phone_number
        setUserDetails(prev => (
            {
                ...prev, 
                user_id,
                phone_number, 
                amount: payment, 
                service_id: serviceId, 
                collection_id: collectionId,
                payment_reference_code: referenceCode                
            }
        ))

    }, [paymentModalShow])
    return (
        <Modal show={paymentModalShow}>
            <Modal.Header className='bg-success text-white'>
                MPESA 
            </Modal.Header>
            <Modal.Body>
                <input 
                    type="number" 
                    name="phone_number"
                    className='form-control p-3 mb-3' 
                    value={phone_number} 
                    placeholder={phone_number}
                    onChange={handleChange}
                />
                <input 
                    type="number" 
                    name="amount"
                    className='form-control p-3 mb-3' 
                    value={amount}
                    placeholder={amount}
                    onChange={handleChange}
                />
                <p className='alert alert-danger'>
                    Wait for Mpesa pop-up and enter Mpesa pin to checkout.
                </p>
                <button className='btn btn-danger m-1' onClick={() => setPaymentModalShow(false)}>
                    Cancel
                </button>
                <button className='btn btn-primary m-1' onClick={handleCheckout}>
                    Checkout
                </button>
            </Modal.Body>
        </Modal>
    )
}

export default CollectionComponent