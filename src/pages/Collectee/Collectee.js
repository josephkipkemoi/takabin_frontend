import CollectionComponent from "../../components/Collections/CollectionComponent"
const Collectee = ({ user }) => {
    return (
        <div className="d-flex justify-content-center">
            <CollectionComponent user={user}/>          
        </div>
    )
}

export default Collectee