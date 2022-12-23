import axios from "axios"
import React, { useEffect, useState } from "react"
import Header from "../../components/Header/Header"
import NavComponent from "../../components/Navigation/NavComponent"
import { withProtected } from "../../hooks/routeProtection"

const Collector = () => {
    const [collectionCount, setCollectionCount] = useState(0)
    const [collections, setCollections] = useState({})
    const [addressDetails, setAddressDetails] = useState({})

    const fetchCollections = async () => {
        try {
            const res = await axios.get('http://localhost:8000/api/v1/collections/view')
            setCollections(res.data.collections.data)
            setCollectionCount(res.data.collections_count)
         } catch (error) {
            console.error(error)
        }
    }

    const handleViewDetails = async (user_id) => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/addresses/users/${user_id}`)
            setAddressDetails(res.data)   
        } catch (error) {
            console.error(error)
        }
      
    }

    const handleCollection =  async (user_id) => {
        const collector_id = JSON.parse(localStorage.getItem('auth-user')).id
        try {
            const res = await axios.patch(`http://localhost:8000/api/v1/collections/${user_id}/patch`, {
                collector_id,
                estimate_collection_time: '2022-12-20 17:28:29'
            })
         } catch (error) {
            console.error(error)
        }
    
    }

    const CollectionElements = (n, i) => {

        return (
            <React.Fragment key={i}>
                <p>Contact Number: {n.phone_number}</p>
                <button onClick={() => handleCollection(n.id)}>
                    Book for collection
                </button>
                <button onClick={() => handleViewDetails(n.id)}>
                    View Details
                </button>
                {(Boolean(addressDetails.id) && addressDetails.user_id === n.id) &&
                    <AddressDetailsComponent
                    addressDetails={addressDetails}
                    />
                }
      
            </React.Fragment>
        )
    }

    useEffect(() => {
        fetchCollections()
    }, [])

    return (
        <>
            <Header/>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <h3>Collections</h3>
                    </div>
                </div>
                <p>{collectionCount} collections available for pickup</p>
                <hr/>
                {Boolean(collections.users) &&
                collections?.users?.map(CollectionElements)
                }
            </div>
            <NavComponent/>
        </>
     
    )
}

const AddressDetailsComponent = ({ addressDetails }) => {

    return (
        <div>
         <h3>Pickup Location</h3>
         <span>County: {addressDetails.county}</span>
         <span>Sub County/Constituency: {addressDetails.sub_county}</span>
         <span>Estate/Apartment: {addressDetails.estate}</span>
         <span>House Number: {addressDetails.house_number}</span>
        </div>
    )
}

export default withProtected(Collector) 