import {
    useEffect,
    useState
} from "react"

export const LogList = () => {
    const [logList, setLogList] = useState([])
    const [error, setError] = useState();
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('http://localhost:5000/logs')
        .then((response) => {
            if (response.status === 200) {
                response.json()
            } else {
                console.log('error')
            }
        })
        .then((json) => {
            console.log(json)
            setLogList(json)
        })
        .catch(error => {
            setError(error)
            console.log(error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])
    
    if (isLoading === true) {
        return (
            <h1>Loading...</h1>
        )
    }
    
    if (error || !Array.isArray(logList)) {
        return <p>There was an error loading your data!</p>;
    }

    return (
        <div>
            <h1>Logs</h1>
            {logList.map((log) => (
                <div key={log._id}>
                    <h1>IP: {log.ip} Session: {log.session}</h1>
                    <h1>{log.usertype} : {log.username} : {log.action}</h1>
                </div>
            ))}
        </div>
    )
    }
