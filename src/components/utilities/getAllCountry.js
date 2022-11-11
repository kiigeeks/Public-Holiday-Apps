import axios from 'axios'

const GetAllCountry = async () => {
    const { data } = await axios.get('https://date.nager.at/api/v3/AvailableCountries')
    return data
}

export default GetAllCountry