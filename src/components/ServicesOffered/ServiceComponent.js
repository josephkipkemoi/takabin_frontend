import React from "react"
import { Card, Carousel, Spinner } from "react-bootstrap"
import { useGetServicesQuery } from "../../hooks/api/services"
import './Services.css'

const ServiceComponent = () => {

    const { data, isLoading, error } = useGetServicesQuery()

    if(error) {
        return <span className="alert alert-danger">Error!</span>
    }

    if(isLoading) {
        return (
            <div className="d-flex justify-content-center m-5"> 
                <Spinner  animation="grow"/>
            </div> 
        )    
    }

    const ServiceElements = (n, i) => {
        return (
            <Carousel.Item
                interval={1000}
                key={i}
            >
                <Card className="border-info shadow rounded">
                    <Card.Header className="bg-info">
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

    return (
        <Carousel 
            className="p-4 custom-carousel mx-auto" 
            controls={false} 
            indicators={false}
        >            
            {data.map(ServiceElements)}
        </Carousel>
    )
}

export default ServiceComponent