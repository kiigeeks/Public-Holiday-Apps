import React from 'react'
import { Table } from 'react-bootstrap'
import GetDate from '../utilities/getDate'

const DataCountry = ({ country, month, years, holidayList }) => {
    let datasList = holidayList.filter((creature) => {
        const M = new Date(creature.date)
        const filterMonth = M.getMonth()+1
        return filterMonth == month;
    })

    if(!month) datasList = holidayList

    return (
        <div>
            <h4 className='text-center mt-5'>Holiday {country} {years && (years)}</h4>
                <div className='table-responsive'>
                    <Table striped bordered hover>
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