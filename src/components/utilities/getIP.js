import axios from 'axios'

const GetIP = async () => {
    const { data } = await axios.get('https://geolocation-db.com/json/')
    return data
}

export default GetIP
