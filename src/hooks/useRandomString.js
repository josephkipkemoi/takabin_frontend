const UseRandomString = () => {
    let r = (Math.random() + 1).toString(36).substring(7);
    return r
}

export default UseRandomString;