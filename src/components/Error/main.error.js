import React from 'react'

const ErrorNotFound = () => {
    return (
        <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="text-center">
            <h1 className="display-1 fw-bold">404</h1>
            <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
            <p className="lead">
            Halaman yang anda kunjungi tidak tersedia
            </p>
            
                <a href="/" className="btn btn-dark text-white">
                <div className="d-flex justify-content-center align-items-center">
                    
                    Home
                </div>
                </a>
        </div>
        </div>
    )
}

export default ErrorNotFound