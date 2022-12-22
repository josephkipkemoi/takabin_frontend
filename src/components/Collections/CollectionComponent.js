import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Collections.css';

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

    const CollectionElements = (n, i) => {
       
        return (
            <React.Fragment key={i}>
                <div className='collection-flex'>
                    <span>{i+1}.</span>
                    <h3>
                        Collection ID: {n?.collection_id}
                    </h3>
                    <p>Estimated Collection Time :{Boolean(n?.estimate_collection_time) ? n.estimate_collection_time : 'Pending'}</p>
                    <p>Collected: {Boolean(n?.collected)? 'Yes': 'Not Yet'}</p>
                    <p>Collector: {Boolean(n?.collector_id) ? 'Confirmed' : 'Pending Confirmation'}</p>
                    <p>Collected At: {Boolean(n?.collection_collected_at) ? n.collection_collected_at : 'Pending'}</p>
                </div>
              
            </React.Fragment>
        )
    }

    useEffect(() => {
        const userId = JSON.parse(localStorage.getItem('auth-user')).id
        fetchCollections(userId)
    }, [])

    return (
        <div className='collection-container'>
            <h1>Collections</h1>
            <h4>View pending collections</h4>
            {collectionData.length > 0 ? 
            collectionData.map(CollectionElements) : 
            <p>No pending collections</p>}
        </div>
    )
}

export default CollectionComponent