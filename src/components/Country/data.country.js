import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { GetDate, GetMonth } from '../utilities/getDate'

const DataCountry = ({ country, month, years, holidayDataList }) => {
    const [datasList, setDatasList] = useState(holidayDataList)
    const [nameMonth, setNameMonth] = useState("")

    useEffect(() => {
        if(month && years) GetDatas()
    }, [])

    const GetDatas = () => {
        const filterDataList = holidayDataList.filter((data) => {
            const M = new Date(data.date)
            const filterMonth = M.getMonth()+1
            return filterMonth == month;
        })
        setDatasList(filterDataList)
        setNameMonth(GetMonth(month))
    }

    return (
        <div>
            <h4 className='text-center mt-5'>Holiday at <i>{country}</i>, Period {years ? (<i>{nameMonth+" "+years}</i>) : (<i>Next 365 days</i>)}</h4>
            <div className="table-responsive mt-3 d-flex justify-content-center">
                <Table striped bordered hover className="w-auto">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datasList.map((data, i) => {
                            const { date, localName, name} = data
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
        </div>
    )
}

export default DataCountry