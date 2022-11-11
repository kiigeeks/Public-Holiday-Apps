import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GetAllCountry from '../utilities/getAllCountry'
import GetDetailCountry from '../utilities/getDetailCountry'
import GetDayHolidays from '../utilities/getHoliday'
import DataCountry from './data.country'

const Country = ({ title }) => {
    const [codeCountry, setCodeCountry] = useState ("")
    const [country, setCountry] = useState ("")
    const [years, setYears] = useState (new Date().getFullYear())
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
        setShowList(true)
        GetDetailCountry(codeCountry).then((detailCountry) => {
            setCountry(detailCountry.commonName)
        })
        GetDayHolidays(years, codeCountry).then((hasil) => {
            setHolidayList(hasil)
        })
    }

    return (
        <Container>
            <div className='d-flex flex-column justify-content-center'>
                <div className='mt-3 text-center'>
                    <h1>{ title }</h1>
                </div>
                <div className='d-inline-flex justify-content-center'>
                    <div className='d-flex flex-column justify-content-center w-50'>
                        <h4 className='mt-5 text-center'>Searching</h4>
                        <Form className="d-flex flex-column gap-2" onSubmit={handleFilter}>
                            <Form.Group>
                                <Form.Label className="fw-bold">Years</Form.Label>
                                <Form.Control type="text" placeholder="2022" value={years} onChange={(e) => {
                                    setYears(e.target.value)
                                    setShowList(false)
                                }} required />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="fw-bold">Country</Form.Label>
                                <Form.Select value={codeCountry} onChange={(e) => {
                                    setCodeCountry(e.target.value)
                                    setShowList(false)
                                }}>
                                    {countryList.map((listCountry, i) => (
                                            <option key={i} value={listCountry.countryCode}>{listCountry.name}</option>
                                        )
                                    )}
                                </Form.Select>
                            </Form.Group>
                            <div className='mt-3 d-flex justify-content-center gap-3'>
                                <Button variant="success" type='submit' >Seacrh</Button>
                                <Link to='/' className="btn btn-danger">Back</Link>
                            </div>
                        </Form>
                    </div>
                </div>

                {showList && (
                    <DataCountry country={country} years={years} holidayList={holidayList}></DataCountry>
                )}
            </div>
        </Container>
    )
}

export default Country