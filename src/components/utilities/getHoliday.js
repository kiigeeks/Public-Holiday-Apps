import axios from 'axios'

const GetDayHolidays = async (years, code) => {
    const { data } = await axios.get(`https://date.nager.at/api/v2/publicholidays/${years}/${code}`)
    return data
}

export default GetDayHolidays