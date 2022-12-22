import CollecteeComponent from "../../components/Collectee/CollecteeComponent"
const Collectee = ({ isAuth, mainState }) => {
    return (
        <>
          {(isAuth === true && mainState === 'request') &&
            <CollecteeComponent/>
          }
        </>
    )
}

export default Collectee