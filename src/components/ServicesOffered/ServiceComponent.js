import React, { useEffect, useState } from "react"
import { Card } from "react-bootstrap"
import axios from "../../lib/Axios"
import './Services.css'

const ServiceComponent = () => {
    const [services, setServices] = useState([])

    const fetchServices = async () => {
        try {
            const res = await axios.get('api/v1/services')
            setServices(res.data)
        } catch (error) {
            console.error(error)
        }
       
    }

    const ServiceElements = (n, i) => {
        return (
            <Card key={i} className="m-1 bg-light shadow rounded-pill">
                <h6 className="text-dark text-center p-2 service-card">{n.service}</h6>
            </Card>
        )
    }
    useEffect(() => {
        fetchServices()
    }, [])
    return (
        <div className="d-flex justify-content-center text-white m-5">
            <div className="text-center">
                <h5 className="text-white">Our services</h5>
                <div className="d-flex mt-2">
                    {services.map(ServiceElements)}
                </div>
            </div>          
        </div>
    )
}

export default ServiceComponent