import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GetAllCountry from '../utilities/getAllCountry'
import GetDetailCountry from '../utilities/getDetailCountry'
import { GetDayHolidays, GetPeriodHoliday } from '../utilities/getHoliday'
import DataCountry from './data.country'
import AlertToast from '../utilities/getAlert'
import { GetMonths } from '../utilities/getDate'

const Country = ({ title }) => {
    const [countryList, setCountryList] = useState([])
    const [monthList, setMonthList] = useState([])
    const [codeCountry, setCodeCountry] = useState ("")
    const [country, setCountry] = useState ("")
    const [month, setMonth] = useState ("")
    const [years, setYears] = useState ("")
    const [showTableList, setShowTableList] = useState(false)
    const [holidayDataList, setHolidayDataList] = useState ([])
    const [showError, setShowError] = useState(false)
    const [msgError, setMsgError] = useState("")
    

    useEffect(() => {
        //get avaible country & set to select box
        GetAllCountry().then((allCountry) => {
            setCountryList(allCountry);
        })
        setMonthList(GetMonths())
    }, [])

    const handleFilter = (e) => {
        e.preventDefault()
        //get name country
        GetDetailCountry(codeCountry).then((detailCountry) => {
            setCountry(detailCountry.commonName)
        })
        //validation
        if(month && !years){
            setShowError(true)
            setMsgError("Years can't be empty")
            return
        }
        //get period holiday with years and country code
        if (years) {
            GetDayHolidays(years, codeCountry).then((dayHoliday) => {
                setHolidayDataList(dayHoliday)
                setShowTableList(true)
            }).catch((error) => {
                setShowTableList(false)
                setShowError(true)
                setMsgError("Data Not Found, Check Your Input")
            })
            return
        }
        //get next period holiday with country code
        GetPeriodHoliday(codeCountry).then((periodHoliday) => {
            setHolidayDataList(periodHoliday)
            setShowTableList(true)
        }).catch((error) => {
            setShowTableList(false)
            setShowError(true)
            setMsgError("Data Not Found, Check Your Input")
        })
    }

    return (
        <Container>
            <div className="d-flex flex-column justify-content-center">
                <div className="mt-3 text-center">
                    <h1>{title}</h1>
                    <p>Created by <a href="https://github.com/kiigeeks" className="fw-bold text-black">Marzuki</a></p>
                </div>
                <div className="d-inline-flex justify-content-center mt-4">
                    <div className="d-flex flex-column justify-content-center mb-3">
                        {/* show alert */}
                        {showError && ( 
                            <AlertToast msgError={msgError} setShowError={setShowError} />
                        )}
                        <div className="p-3 rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                            <h4 className="mt-2 mb-3 text-center">Searching</h4>
                            <form onSubmit={handleFilter}>
                                <div className="row g-2 mb-3">
                                    <div className="col-md">
                                        <div className="form-floating">
                                            {/* month by input */}
                                            {/* <input type="number" className="form-control" placeholder="12" value={month} onChange={(e) => {
                                                setMonth(e.target.value)
                                                setShowTableList(false)
                                            }} /> */}
                                            {/* month by select  */}
                                            <select className="form-select" onChange={(e) => {
                                                setMonth(e.target.value)
                                                setShowTableList(false)
                                            }}>
                                                <option value="">Select Month</option>
                                                {monthList.map((dataMonth, i) => (
                                                        <option key={i} value={dataMonth.id}>{dataMonth.name}</option>
                                                    )
                                                )}
                                            </select>
                                            <label htmlFor="month">Month</label>
                                        </div>
                                    </div>
                                    <div className="col-md">
                                        <div className="form-floating">
                                            <input type="number" className="form-control" placeholder="2022" value={years} onChange={(e) => {
                                                setYears(e.target.value)
                                                setShowTableList(false)
                                            }}  />
                                            <label htmlFor="years">Years ({new Date().getFullYear()})</label>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-floating mb-3">
                                    <select className="form-select" onChange={(e) => {
                                        setCodeCountry(e.target.value)
                                        setShowTableList(false)
                                    }} required>
                                        <option value="">Select Country</option>
                                        {countryList.map((listCountry, i) => (
                                                <option key={i} value={listCountry.countryCode}>{listCountry.name}</option>
                                            )
                                        )}
                                    </select>
                                    <label htmlFor="country">Country</label>
                                </div>
                                <div className="my-3 d-flex justify-content-center gap-3">
                                    <Button variant="success" type="submit">Search</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                {/* show list data result searching */}
                {showTableList && (
                    <DataCountry country={country} month={month} years={years} holidayDataList={holidayDataList} />
                )}
                <div className="d-flex justify-content-center gap-3 mt-3">
                    <Link to="/" className="btn btn-primary">Home</Link>
                    <a href="https://github.com/kiigeeks/Public-Holiday-Apps" className="btn btn-dark">Source Code</a>
                </div>
            </div>
        </Container>
    )
}

export default Country