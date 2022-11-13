
export const GetDate = (data) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dateFormat= new Date(data)
    const finalDate = days[dateFormat.getDay()]+", "+
                    ('0'+dateFormat.getDate()).slice(-2)+
                    "-"+('0'+(dateFormat.getMonth()+1)).slice(-2)+
                    "-"+dateFormat.getFullYear()
    return finalDate
}

export const GetMonth = (data) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug", "Sep", "Oct", "Nov", "Dec"];
    const dateFormat = new Date(data)
    const finalMonth = months[dateFormat.getMonth()]
    return finalMonth
}

export const GetMonths = () => {
    const nameMonths = [
        { id: 1, name: "Jan"},
        { id: 2, name: "Feb"},
        { id: 3, name: "Mar"},
        { id: 4, name: "Apr"},
        { id: 5, name: "May"},
        { id: 6, name: "Jun"},
        { id: 7, name: "Jul"},
        { id: 8, name: "Aug"},
        { id: 9, name: "Sep"},
        { id: 10, name: "Oct"},
        { id: 11, name: "Nov"},
        { id: 12, name: "Dec"}
    ]
    return nameMonths
}