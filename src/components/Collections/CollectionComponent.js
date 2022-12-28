import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import Header from '../Header/Header';
import NavComponent from '../Navigation/NavComponent';
// import './Collections.css';

const CollectionComponent = () => {
    const [collectionData, setCollectionData] = useState([])

    const fetchCollections = async (userId) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/users/${userId}/collectee/collections/pending`)
            setCollectionData(res.data)
        } catch (error) {
            console.error(error?.message)
        }
    }

    const CollectionElements = (collectionData) => {
        return (
            <React.Fragment>
                <div >
                    <div className='alert alert-danger'>
                        <p className='text-center'>Make payment once collector is within your premises</p>
                    </div>
                    <h6 className='text-dark'>
                        Collection ID: {collectionData?.collectionData.collection_code}
                    </h6>
                    <div className='row'>
                        <div className='col'>
                            <p>
                                Service Cost: Kes. 125/=
                            </p>
                            <p 
                            className='text-dark'
                            >
                                Estimated Collection Time: {Boolean(collectionData?.collectionData.estimate_collection_time) ? 
                                collectionData.collectionData.estimate_collection_time : 
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
                                Collector: {Boolean(collectionData?.collectionData.collector_id) ? 
                                'Confirmed' : 
                                'Pending Confirmation'}
                            </p>
                            <p 
                                className='text-dark'
                            >
                                Collected: {Boolean(collectionData?.collectionData.collected) ? 
                                'Yes': 
                                'Not Yet'}
                            </p>
                            <p 
                                className='text-dark'
                            >
                                Collected At: {Boolean(collectionData?.collectionData.collection_collected_at) ? 
                                collectionData.collectionData.collection_collected_at : 
                                'Pending'}
                            </p>
                        </div>
                    </div>
                
                </div>
            
            </React.Fragment>
        )
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('auth-user')).id
        fetchCollections(userId)
    }, [])

    return (
        <>
            <Header/>
                <Container>
                    <Card className='mt-4 border-0 shadow'>
                        <Card.Header className='bg-primary text-white'>
                            Pending Collections
                        </Card.Header>
                        <Card.Body>
                            {collectionData.id ? 
                            <CollectionElements collectionData={collectionData}/> : 
                            <p>No pending collections</p>}
                        </Card.Body>
                        <Card.Footer>
                            <Button variant='dark'>
                                Cancel Collection
                            </Button>
                            <Button>
                                Make Payment
                            </Button>
                        </Card.Footer>
                    </Card>
                </Container>
            <NavComponent/>
        </>
    )
}

export default CollectionComponent