import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Modal, Spinner } from 'react-bootstrap';

import UseRandomString from '../../hooks/useRandomString';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { useGetCollectionsQuery } from '../../hooks/api/collections';
import ErrorElement from '../../elements/ErrorElement';
// import './Collections.css';

const CollectionComponent = ({ user }) => {
 
    const [paymentModalShow, setPaymentModalShow] = useState(false)
    const [payment, setPayment] = useState(125)

    const { data, isLoading, error } = useGetCollectionsQuery({user_id: user?.id, collected: false}) // user id and false = uncollected resources

    if(isLoading) {
        return <Spinner animation='grow' />
    }

    if(error) {
        return <ErrorElement/>
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
                        user={user}
                    />
                    }
                </div>
            </React.Fragment>
        )
    }

    return (
        <>
            <Container>
                <Card className='mt-4 border-0 shadow'>    
                    <Card.Header className='bg-primary text-white'>
                        Pending Collections
                    </Card.Header>
                    <Card.Body>
                        {data?.data.length > 0 ? 
                        data?.data.map(CollectionElements)
                             : 
                        <p>No pending collections</p>}
                    </Card.Body>
                </Card> 
                <Card className='mt-4 border-0 shadow mb-5'>    
                    <Card.Header className='bg-primary text-white'>
                        Collected
                    </Card.Header>
                    <Card.Body>
                        <CollectedComponent
                            user={user}
                        />
                    </Card.Body>
                </Card> 
            </Container>
        </>
    )
}

export const PaymentModal = ({ paymentModalShow, payment, setPaymentModalShow, serviceId, collectionId, user }) => {
    const referenceCode = UseRandomString()
    const [errors, setErrors] = useState('')

    const [userDetails, setUserDetails] = useState({
        phone_number: user.phone_number,
        amount: payment,
        collection_id: collectionId,
        service_id: serviceId,
        user_id: user.id,
        payment_reference_code: referenceCode
    })

    const {phone_number, amount, service_id, collection_id, user_id} = userDetails

    const handleChange = (e) => setUserDetails(prev => ({...prev, [e.target.name]: e.target.value}))

    const handleCheckout = async () => {
        try {
            const res = await axios.
            post(`http://localhost:8000/api/v1/users/${user_id}/collections/${collection_id}/services/${service_id}`, userDetails)
   
            if(res.status === 201) {
               setPaymentModalShow(false)
           }
        } catch (error) {
            setErrors(error.response.data.message)
        }
   
    }

    return (
        <Modal show={paymentModalShow}>
            <Modal.Header className='bg-success text-white'>
                MPESA 
            </Modal.Header>
            <Modal.Body>
                {errors && <span className='d-block w-100 alert alert-danger'>{errors}</span>}
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
                {errors && 
                   <p className='alert alert-warning'>
                    Wait for Mpesa pop-up and enter Mpesa pin to checkout.
                   </p>
                }
             
                <button className='btn m-1' onClick={() => setPaymentModalShow(false)}>
                    Cancel
                </button>
                {Boolean(errors) === false && 
                   <button className='btn btn-primary m-1' onClick={handleCheckout}>
                        Checkout
                   </button>
                }
             
                {errors && 
                    <button className='btn btn-success m-1'>
                        Use Mpesa Checkout
                    </button>
                }
            
            </Modal.Body>
        </Modal>
    )
}

const CollectedComponent = ({ user }) => {
    const { data, isLoading, error } = useGetCollectionsQuery({user_id: user?.id, collected: 1}) // user id and false = uncollected resources

    if(isLoading) {
        return <Spinner animation='grow' />
    }

    if(error) {
        return <ErrorElement/>
    }

    const CollectionElements = (collectionData, i) => {

        return (
            <React.Fragment key={i} >
                <div className="m-2 p-3 bg-info mb-4 rounded shadow">
                 
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
                                    Service Cost: Kes. 125/=
                                </p>
                                <p 
                                className='text-dark'
                                >
                                    Estimated Collection Time: {Boolean(collectionData?.estimate_collection_time) ? 
                                    collectionData.estimate_collection_time : 
                                    'Pending'}
                                </p>
                                <p>
                                    Payment Complete: Yes
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
                         
                        </div>
                    </div>
                   
           
                </div>
            </React.Fragment>
        )
    }
    return (
        <>
          {data?.data.length > 0 ? 
          data?.data.map(CollectionElements) : 
         <p>No pending collections</p>}
        </>
    )
}

export default CollectionComponent