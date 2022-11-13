import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { GetDate } from '../utilities/getDate'
import { GetDayHolidays } from '../utilities/getHoliday'
import GetIP from '../utilities/getIP'

const Home = ({ title }) => {
    const [ip, setIp] = useState ("")
    const [codeCountry, setCodeCountry] = useState ("")
    const [country, setCountry] = useState ("")
    const [holidayDataList, setHolidayDataList] = useState ([])
    const years = new Date().getFullYear()

    useEffect(() => {
        //get ip, set code & name country
        GetIP().then((res) => {
            setCodeCountry(res.country_code)
            setCountry(res.country_name)
            setIp(res.IPv4)
        })
        //get holiday api from code country
        if (codeCountry){
            GetDayHolidays(years, codeCountry).then((hasil) => {
                setHolidayDataList(hasil)
            })
        }
    }, [codeCountry, years])

    return (
        <Container className="mb-5">
            <div className="d-flex flex-column justify-content-center">
                <div className="mt-3 text-center">
                    <h1>{title}</h1>
                    <p>IP {ip}, Country {country}</p>
                </div>
                <h4 className="text-center mt-3">Holiday at <i>{country}</i>, Period <i>{years}</i></h4>
                <div className="table-responsive mt-2 d-flex justify-content-center">
                    <Table striped bordered hover className="w-auto">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holidayDataList.map((holidayList, i) => {
                                const { date, localName, name } = holidayList
                                return (
                                    <tr key={i}>
                                        <td>{GetDate(date)}</td>
                                        <td>{localName} ({name})</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </div>
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <Link to="country" className="btn btn-primary">Set Country</Link>
                    <a href="https://github.com/kiigeeks/Public-Holiday-Apps" className="btn btn-dark">Source Code</a>
                </div>
            </div>
        </Container>
    )
}

export default Home