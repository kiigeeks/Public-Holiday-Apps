const GetDate = (data) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateFormat= new Date(data)
    const finalDate = days[dateFormat.getDay()]+", "+
                    ('0'+dateFormat.getDate()).slice(-2)+
                    "-"+('0'+(dateFormat.getMonth()+1)).slice(-2)+
                    "-"+dateFormat.getFullYear()
    return finalDate
}

export default GetDate