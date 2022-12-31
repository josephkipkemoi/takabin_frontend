import { useEffect, useState } from "react";
import Collectee from "../../pages/Collectee/Collectee";
import AuthComponent from "../Auth/AuthComponent";
import ServiceComponent from "../ServicesOffered/ServiceComponent";
import config from '../../config.json';

const LandingComponent = ({ user }) => {
    const [role, setRole] = useState(null)

    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('user'))?.role
        setRole(role)
    }, [user?.id])
    return (
        <>
            {Boolean(user?.id) === false && <AuthComponent/>}

            {(Boolean(user?.id) && role === config.COLLECTEE_USER_ROLE) && <Collectee/>}
            
            <ServiceComponent/> 
        </>
    )
}

export default LandingComponent;