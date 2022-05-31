import React from "react"

export default function UseHandleError() {
    const [errorState, setError] = React.useState(false);

    function checkStatus (err) {
        if ( err.status === 403 && !err.data.message) {
            setError('Invalid login attempt')
            setTimeout(() => {
                setError(false)
            },3000)
        } else if ( err.data.message ) {
            setError(err.data.message)
            setTimeout(() => {
                setError(false)
            },3000)
        } else {
            setError('Must have username and password')
            setTimeout(() => {
                setError(false)
            },3000)
        }
    }
    return [errorState, checkStatus]
}
