import { useEffect, useState } from "react";
import Collectee from "../../pages/Collectee/Collectee";
import AuthComponent from "../Auth/AuthComponent";
import ServiceComponent from "../ServicesOffered/ServiceComponent";
import config from '../../config.json';
import CollectionComponent from "../Collections/CollectionComponent";
import CollecteeComponent from "../Collectee/CollecteeComponent";
import { useGetServicesQuery } from "../../hooks/api/services";

const LandingComponent = ({ user }) => {
    const [role, setRole] = useState(null)

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('user'))?.role
        setRole(role)
        
    }, [user?.id])
    return (
        <>
            {Boolean(user?.id) === false && <AuthComponent/>}

            {(Boolean(user?.id) && role === config.COLLECTEE_USER_ROLE) && <CollecteeComponent user={user}/>}
            
            {Boolean(user?.id) === false && <ServiceComponent/> } 
        </>
    )
}

export default LandingComponent;