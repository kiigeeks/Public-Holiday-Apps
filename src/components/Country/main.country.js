
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Container, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GetAllCountry from '../utilities/getAllCountry'
import GetDetailCountry from '../utilities/getDetailCountry'
import {GetDayHolidays, GetPeriodHoliday} from '../utilities/getHoliday'
import DataCountry from './data.country'

const Country = ({ title }) => {

    const [show, setShow] = useState(false);
    const [msgError, setMsgError] = useState("");
    const [codeCountry, setCodeCountry] = useState ("")
    const [country, setCountry] = useState ("")
    const [month, setMonth] = useState ("")
    const [years, setYears] = useState ("")
    const [holidayList, setHolidayList] = useState ([])
    const [countryList, setCountryList] = useState([])
    const [showList, setShowList] = useState(false)

    useEffect(() => {
        GetAllCountry().then((allCountry) => {
            setCountryList(allCountry);
        })
    }, [])


    const handleFilter = (e) => {
        e.preventDefault()
        GetDetailCountry(codeCountry).then((detailCountry) => {
            setCountry(detailCountry.commonName)
        })

        if (month) {
            GetDayHolidays(years, codeCountry).then((dayHoliday) => {
                setHolidayList(dayHoliday)
                setShowList(true)
            }).catch((error) => {
                setShowList(false)
                setShow(true)
                setMsgError("Data Not Found, Check Your Input")
            })
        }else{
            GetPeriodHoliday(codeCountry).then((periodHoliday) => {
                setHolidayList(periodHoliday)
                setShowList(true)
            }).catch((error) => {
                setShowList(false)
                setShow(true)
                setMsgError("Data Not Found, Check Your Input")
            })
        }
    }

    return (
        <Container>
            <div className='d-flex flex-column justify-content-center'>
                <div className='mt-3 text-center'>
                    <h1>{ title }</h1>
                </div>
                
                <div className='d-inline-flex justify-content-center'>
                    <div className='d-flex flex-column justify-content-center mb-3'>
                        {show && (
                        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
                            <Alert.Heading>{msgError}</Alert.Heading>
                        </Alert>
                        )}
                        <h4 className='mt-3 text-center'>Searching</h4>

                        <form onSubmit={handleFilter}>
                            <div className="row g-2 mb-3">
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" placeholder="12" value={month} onChange={(e) => {
                                    setMonth(e.target.value)
                                    setShowList(false)
                                }} />
                                        <label htmlFor="month">Month (12)</label>
                                    </div>
                                </div>
                                <div className="col-md">
                                    <div className="form-floating">
                                        <input type="number" className="form-control" placeholder="2022" value={years} onChange={(e) => {
                                    setYears(e.target.value)
                                    setShowList(false)
                                }} />
                                        <label htmlFor="years">Years ({new Date().getFullYear()})</label>
                                    </div>
                                </div>
                            </div>
                            <div className="form-floating mb-3">
                                <select className="form-select" onChange={(e) => {
                                    setCodeCountry(e.target.value)
                                    setShowList(false)
                                }} required>
                                    <option value="">Select Country</option>
                                    {countryList.map((listCountry, i) => (
                                            <option key={i} value={listCountry.countryCode}>{listCountry.name}</option>
                                        )
                                    )}
                                </select>
                                <label htmlFor='country'>Country</label>
                            </div>
                            <div className='mt-3 d-flex justify-content-center gap-3'>
                                <Button variant="success" type='submit' >Search</Button>
                                <Link to='/' className="btn btn-danger">Back</Link>
                            </div>
                        </form>


                    </div>
                </div>

                {showList && (
                    <DataCountry country={country} month={month} years={years} holidayList={holidayList}></DataCountry>
                )}
                
                
            </div>
        </Container>
    )
}

export default Country