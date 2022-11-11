import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Container, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GetDate from '../utilities/getDate'
import GetDayHolidays from '../utilities/getHoliday'
import GetIP from '../utilities/getIP'

const Home = ({ title }) => {
    const [ip, setIp] = useState ("")
    const [codeCountry, setCodeCountry] = useState ("")
    const [country, setCountry] = useState ("")
    const [years, setYears] = useState (new Date().getFullYear())
    const [holidayList, setHolidayList] = useState ([])

    useEffect(() => {
        GetIP().then((res) => {
            setCodeCountry(res.country_code)
            setCountry(res.country_name)
            setIp(res.IPv4)
        })

        if (codeCountry){
            GetDayHolidays(years, codeCountry).then((hasil) => {
                setHolidayList(hasil)
            })
        }
    }, [codeCountry])

    return (
        <Container>
            <div className='d-flex flex-column justify-content-center'>
                <div className='mt-3 text-center'>
                    <h1>{ title }</h1>
                    <p>IP {ip}, Country {country}</p>
                </div>
                <h4 className='text-center'>Holiday {country} {years}</h4>
                <div className='table-responsive'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {holidayList.map((holiday, i) => {
                                const { date, localName, name} = holiday
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

                <div className='d-flex justify-content-center'>
                    <Link to='country' className='btn btn-primary'>Country</Link>
                </div>

            </div>
        </Container>
    )
}

export default Home