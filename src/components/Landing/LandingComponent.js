import Collectee from "../../pages/Collectee/Collectee";
import AuthComponent from "../Auth/AuthComponent";
import ServiceComponent from "../ServicesOffered/ServiceComponent";

export default function LandingComponent({ user }) {
    return (
        <>
            {Boolean(user?.id) === false && <AuthComponent/>}

            {Boolean(user?.id) === true && <Collectee/>}
            
            <ServiceComponent/> 
        </>
    )
}