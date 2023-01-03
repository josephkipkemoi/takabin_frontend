import React, { useEffect, useState } from "react"
import { Card, Carousel } from "react-bootstrap"
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
        console.log(n)
        return (
            <Carousel.Item
                interval={1000}
                key={i}
            >
                <Card className="border-primary">
                    <Card.Header className="bg-primary text-white">
                        
                        <h6 className="text-center p-2 service-card">{n.service}</h6>
                    </Card.Header>
                    <Card.Body className="bg-white p-4 service-body">
                        <img src={n.service_img_url} className="img-fluid"/>
                        <p>{n.service_description}</p>
                    </Card.Body>
                </Card>
            </Carousel.Item>
        )
    }
    useEffect(() => {
        fetchServices()
    }, [])
    return (
        <Carousel 
            className="p-4" 
            controls={false} 
            indicators={false}
        >
            
            {services.map(ServiceElements)}
        </Carousel>
        // <div className="d-flex justify-content-center text-white m-5">
        //     <div className="text-center">
        //         <h5 className="text-white">Our services</h5>
        //         <div className="d-flex mt-2">
        //             {services.map(ServiceElements)}
        //         </div>
        //     </div>          
        // </div>
    )
}

export default ServiceComponent