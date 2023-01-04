import { faDotCircle, faEyeLowVision } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Toast } from "react-bootstrap"
import { Link } from "react-router-dom"

const ToastElement = ({ service }) => {
    return (
     <Toast >
        <Toast.Header className="d-flex justify-content-between">
            <span className="text-dark d-flex align-items-center">
                <FontAwesomeIcon icon={faDotCircle} size="sm" className="text-warning" style={{ marginRight: 4 }}/>
                Active   
            </span>
        </Toast.Header>
        <Toast.Body className="d-flex align-items-center justify-content-between toast-body">
            <div>
                <span className="text-dark">
                    Service: {service}
                </span>
            </div>
            <div className="coll-child-right d-flex align-items-center">
                <button className="btn btn-sm m-1 rounded shadow-sm text-secondary">Cancel</button>
                    <Link to="/collections" className="btn btn-primary btn-sm m-1 rounded shadow">
                        <FontAwesomeIcon icon={faEyeLowVision} style={{ marginRight: 8 }}/>
                        View
                    </Link>
            </div>  
        </Toast.Body>
     </Toast>
    )
}

export default ToastElement