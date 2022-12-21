const validateNumber = (number, setError) => {
    const numArray = number.split('')

    if(numArray.length > 10 || numArray.length < 10) {
        setError('Invalid phone number, should be 10 digits')
        return false
    }
    setError('')
    return true
}

export default validateNumber