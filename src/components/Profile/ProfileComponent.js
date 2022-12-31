import { withProtected } from "../../hooks/routeProtection"

const ProfileComponent = () => {
    return (
        <div>

            <h1>Profile</h1>

        </div>
    )
}

export default withProtected(ProfileComponent) 