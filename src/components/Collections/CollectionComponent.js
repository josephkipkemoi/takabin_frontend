import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
                    <h3 className='text-dark'>
                        Collection ID: {collectionData?.collectionData.collection_id}
                    </h3>
                    <p className='text-dark'>Estimated Collection Time :{Boolean(collectionData?.collectionData.estimate_collection_time) ? collectionData.collectionData.estimate_collection_time : 'Pending'}</p>
                    <p className='text-dark'>Collected: {Boolean(collectionData?.collectionData.collected) ? 'Yes': 'Not Yet'}</p>
                    <p className='text-dark'>Collector: {Boolean(collectionData?.collectionData.collector_id) ? 'Confirmed' : 'Pending Confirmation'}</p>
                    <p className='text-dark'>Collected At: {Boolean(collectionData?.collectionData.collection_collected_at) ? collectionData.collectionData.collection_collected_at : 'Pending'}</p>
                </div>
              
            </React.Fragment>
        )
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('auth-user')).id
        fetchCollections(userId)
    }, [])

    return (
        <div className='container'>
            <div className='card'>
                <div className='card-header'>
                    <h1>Collections</h1>
                </div>
                <div className='card-body'>
                    <h4>Pending collection</h4>
                    {collectionData.id ? 
                    <CollectionElements collectionData={collectionData}/> : 
                    <p>No pending collections</p>}
                </div>
            </div>
          
        </div>
    )
}

export default CollectionComponent