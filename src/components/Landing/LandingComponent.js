import Collectee from "../../pages/Collectee/Collectee";
import AuthComponent from "../Auth/AuthComponent";
import ServiceComponent from "../ServicesOffered/ServiceComponent";

const LandingComponent = () => {
    return (
        <>
            <AuthComponent/>

            <Collectee/>
            
            <ServiceComponent/> 
        </>
    )
}

export default LandingComponent;