import { useState } from 'react'
import './Address.css'

const UpdateAddressComponent = () => {
    const [addressDetails, setAddressDetails] = useState({
        county: '',
        sub_county: '',
        estate: '',
        house_number: ''
    })

    const { county, sub_county, estate, house_number } = addressDetails

    const handleChange = (e) => setAddressDetails(prev => ({...prev, [e.target.name]: e.target.value}))

    const submitAddress = () => {
        if(addressDetails) {
            localStorage.setItem('user-address', true)
        }
    }
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