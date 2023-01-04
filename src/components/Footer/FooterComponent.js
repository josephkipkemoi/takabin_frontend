import './Footer.css'

const FooterComponent = () => {
    const timer = new Date()
    return (
        <footer className="text-center m-2">
            &copy; Cynkem Limited - {timer.getFullYear()}
        </footer>
    )
}

export default FooterComponent