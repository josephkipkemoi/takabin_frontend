import Collectee from "../../pages/Collectee/Collectee";
import AuthComponent from "../Auth/AuthComponent";
import ServiceComponent from "../ServicesOffered/ServiceComponent";

const LandingComponent = ({ user }) => {
    return (
        <>
            {Boolean(user?.id) === false && <AuthComponent/>}

            {Boolean(user?.id) && <Collectee/>}
            
            <ServiceComponent/> 
        </>
    )
}

export default LandingComponent;