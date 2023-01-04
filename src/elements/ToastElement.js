import { faDotCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Toast } from "react-bootstrap"

const ToastElement = () => {
    return (
     <Toast >
        <Toast.Header className="d-flex justify-content-between">
            <span className="text-dark d-flex align-items-center">
                <FontAwesomeIcon icon={faDotCircle} size="sm" className="text-warning" style={{ marginRight: 4 }}/>
                Active   
            </span>
        </Toast.Header>
        <Toast.Body className="text-dark toast-body">
            Word
        </Toast.Body>
     </Toast>
    )
}

export default ToastElement