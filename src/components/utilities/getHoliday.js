import axios from 'axios'

export const GetDayHolidays = async (years, code) => {
    const { data } = await axios.get(`https://date.nager.at/api/v2/publicholidays/${years}/${code}`)
    return data
}

export const GetPeriodHoliday = async (code) => {
    const { data } = await axios.get(`https://date.nager.at/api/v3/NextPublicHolidays/${code}`)
    return data
}
