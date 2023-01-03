import { useEffect, useState } from 'react'
import axios from 'axios'
// import './Address.css'
import {  Modal } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faLocation, faLocationArrow } from '@fortawesome/free-solid-svg-icons'
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
           <Modal.Header className='bg-primary text-white fw-bold'>
                <span>
                    <FontAwesomeIcon icon={faLocationArrow} style={{ marginRight: 4 }} />
                    Address
                </span>
           </Modal.Header>
           <Modal.Body>
            <form onSubmit={e => e.preventDefault()}>
            <div className='row mb-3'>
                <div className='col'>
                    <input 
                        type="text" 
                        placeholder='County' 
                        className='form-control p-2'
                        name='county'
                        value={county}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className='col'>
                    <input 
                        type="text" 
                        placeholder='Sub-County' 
                        className='form-control p-2'
                        name='sub_county'
                        value={sub_county}
                        onChange={handleChange}
                        required
                    />
                </div>                 
                </div>
                <div className='row mb-3'>
                    <div className='col'>
                        <input 
                            type="text" 
                            placeholder='Estate / Apartment' 
                            name='estate'
                            className='form-control p-2'
                            value={estate}
                            required
                            onChange={handleChange}
                        />
                    </div>
                    <div className='col'>
                        <input 
                            type="text" 
                            placeholder='House Number' 
                            name='house_number'
                            className='form-control p-2'
                            value={house_number}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>   
                <div className='d-flex'>
                    <button 
                        className='btn w-100 m-1' 
                        onClick={() => setModalShow(false)}
                    >
                        Cancel
                    </button>
                    <button 
                        className='btn btn-primary w-100 m-1 shadow-sm rounded-0 p-2' 
                        onClick={submitAddress}
                        type="submit"
                    >
                        <FontAwesomeIcon icon={faSave} style={{ marginRight: 4 }}/>
                        Save
                    </button>
                </div>         
             
            </form>               
           </Modal.Body>            
        </Modal>
    )
}

export default UpdateAddressComponent