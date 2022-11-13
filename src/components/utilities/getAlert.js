import React from 'react'
import { Alert } from 'react-bootstrap'

const AlertToast = ({ msgError, setShowError }) => {
    //hidden alert after 5 second
    setTimeout(() => {
        setShowError(false)
    }, 5000)
    return (
        <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
            <Alert.Heading className="text-center">Opps! Something Wrong</Alert.Heading>
            <p className="text-center">{msgError}</p>
        </Alert>
    )
}

export default AlertToast