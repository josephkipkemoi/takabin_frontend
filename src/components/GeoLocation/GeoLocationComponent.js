import { useEffect } from "react"

const GeolocationComponent = () => {
    // const    res =  new window.GeolocationCoordinates()
    useEffect(() => {
        try {
            console.log(fetch('', ''))

        } catch (error) {
            console.log(error)
        }   
    }, [])
    return  (    
        <div>

        </div>
    )
}

export default GeolocationComponent