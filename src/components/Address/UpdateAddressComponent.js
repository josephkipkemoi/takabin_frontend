import { useEffect, useState } from 'react'
import axios from 'axios'
// import './Address.css'
import { Card, Modal } from 'react-bootstrap'

const UpdateAddressComponent = ({ modalShow,setModalShow }) => {
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
                setModalShow(false)
            } 
        } catch (error) {
            console.error(error)
        }      
    }

    useEffect(() => {
        const user_id = JSON.parse(localStorage.getItem('user'))?.user?.id
        setAddressDetails(prev => ({...prev, user_id}))
    }, [])
    
    return (
        <Modal show={modalShow}>
           <Modal.Header className='bg-primary text-white'>
           <h3>Address Information</h3>

           </Modal.Header>
           <Modal.Body>
                <div className='row mb-3'>
                <div className='col'>
                    <input 
                        type="text" 
                        placeholder='County' 
                        className='form-control'
                        name='county'
                        value={county}
                        onChange={handleChange}
                    />
                </div>
                <div className='col'>
                        <input 
                            type="text" 
                            placeholder='Sub-County' 
                            className='form-control'
                            name='sub_county'
                            value={sub_county}
                            onChange={handleChange}
                        />
                </div>
                 
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <input 
                            type="text" 
                            placeholder='Estate / Apartment' 
                            name='estate'
                            className='form-control'
                            value={estate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col'>
                        <input 
                            type="text" 
                            placeholder='House Number' 
                            name='house_number'
                            className='form-control'
                            value={house_number}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            
            <button className='btn btn-primary w-100' onClick={submitAddress}>Update</button>
           </Modal.Body>
             

        </Modal>
       
     
    )
}

export default UpdateAddressComponent