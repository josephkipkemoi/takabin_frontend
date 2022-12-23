import CollecteeComponent from "../../components/Collectee/CollecteeComponent"
const Collectee = ({ isAuth, mainState }) => {
    return (
        <div className="d-flex justify-content-center">
          {(isAuth === true && mainState === 'request') &&
            <CollecteeComponent/>
          }
        </div>
    )
}

export default Collectee