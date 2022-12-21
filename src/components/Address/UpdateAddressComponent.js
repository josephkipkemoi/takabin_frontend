import { useEffect, useState } from 'react'
import axios from 'axios'
import './Address.css'

const UpdateAddressComponent = () => {
    const [addressDetails, setAddressDetails] = useState({
        user_id: null,
        county: '',
        sub_county: '',
        estate: '',
        house_number: ''
    })

    const { county, sub_county, estate, house_number } = addressDetails

    const handleChange = (e) => setAddressDetails(prev => ({...prev, [e.target.name]: e.target.value}))

    const submitAddress = async () => {
        try {
            const res = await axios.post("http://localhost:8000/api/v1/address", addressDetails)
        
            if(res.status === 201) {
                localStorage.setItem('user-address', true)
            } 
        } catch (error) {
            console.error(error)
        }      
    }

    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('auth-user')).id
        setAddressDetails(prev => ({...prev, user_id}))
    }, [])
    
    return (
        <div className='address-container'>
            <h2>Address Information</h2>
                <div className='address-container-input'>
                    <input 
                        type="text" 
                        placeholder='County' 
                        name='county'
                        value={county}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder='Sub-County' 
                        name='sub_county'
                        value={sub_county}
                        onChange={handleChange}
                    />
                </div>
                <div className='address-container-input'>
                    <input 
                        type="text" 
                        placeholder='Estate / Apartment' 
                        name='estate'
                        value={estate}
                        onChange={handleChange}
                    />
                    <input 
                        type="text" 
                        placeholder='House Number' 
                        name='house_number'
                        value={house_number}
                        onChange={handleChange}
                    />
                </div>
            
            <button onClick={submitAddress}>Update</button>

        </div>
    )
}

export default UpdateAddressComponent