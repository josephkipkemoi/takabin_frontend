import { faDotCircle, faEyeLowVision, faInfoCircle, faMoneyBill } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Toast } from "react-bootstrap"
import { Link } from "react-router-dom"

const ToastElement = ({ service, code }) => {
    return (
     <Toast >
        <Toast.Header className="d-flex justify-content-between">
            <span className="text-dark d-flex align-items-center">
                <FontAwesomeIcon icon={faDotCircle} size="sm" className="text-warning" style={{ marginRight: 4 }}/>
                Active   
            </span>
        </Toast.Header>
        <Toast.Body className="d-flex align-items-center justify-content-between toast-body">
            <div >
                <FontAwesomeIcon className="text-secondary" size="lg" icon={faInfoCircle} style={{ marginRight: 4 }} />
                <span className="text-dark">
                    Service code: {service}-{code}
                </span>
            </div>
            <div className="coll-child-right d-flex align-items-center">
                    <button className="btn btn-success btn-sm m-1 rounded shadow-sm">
                        <FontAwesomeIcon icon={faMoneyBill} style={{ marginRight: 6 }} />
                        Pay
                    </button>
                    <Link to="/collections" className="btn btn-primary btn-sm rounded shadow">
                        <FontAwesomeIcon icon={faEyeLowVision} style={{ marginRight: 6 }}/>
                        View
                    </Link>
            </div>  
        </Toast.Body>
     </Toast>
    )
}

export default ToastElement