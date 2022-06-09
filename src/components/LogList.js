import {
    useEffect,
    useState
} from 'react'
import axios from 'axios'

const logCard = "m-5"

export const LogList = ({className}) => {
    const [logList, setLogList] = useState([])

    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        try {
            axios({
                method: 'get',
                url: 'http://localhost:5000/logs',
                withCredentials: true
            })
            .then((response) => {
                setLogList(response.data)
                setLoading(false)
                // console.log(logList)
            })
        } catch (error) {
            console.log(error)
        }
    }, [])

    if(isLoading === true) {
        return (
            <h1>Loading...</h1>
        )

    } else {
        return (
            <div>
                <h3>Logs</h3>
                <div className={className}>
                    {logList.map((log) => (
                        <div key={log._id} className={logCard}>
                            <h1>IP: {log.ip} Session: {log.session}</h1>
                            <h1>{log.usertype} : {log.username}</h1>
                            <h1> {log.action}</h1>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}