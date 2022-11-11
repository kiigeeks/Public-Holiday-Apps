import axios from "axios"

const GetDetailCountry = async (code) => {
    const { data } = await axios.get(`https://date.nager.at/api/v3/CountryInfo/${code}`)
    console.log(code);
    return data
}

export default GetDetailCountry