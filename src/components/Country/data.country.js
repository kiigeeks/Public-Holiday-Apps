import React from 'react'
import { Table } from 'react-bootstrap'
import GetDate from '../utilities/getDate'

const DataCountry = ({ country, years, holidayList }) => {
    return (
        <div>
            <h4 className='text-center mt-5'>Hari Libur {country} {years}</h4>
                            <div className='table-responsive'>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>Tanggal</th>
                                            <th>Keterangan</th>
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
                            </div>
    )
}

export default DataCountry