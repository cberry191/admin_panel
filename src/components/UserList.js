import { 
    useEffect,
    useState
} from "react"
import Axios from "axios";

const userCard = "m-5"

export const UserList = ({className}) => {
    const [userList, setUserList] = useState([])
    const [newUserType, setNewUserType] = useState("user")

    const [isLoading, setLoading] = useState(false)
    
    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = () => {
        setLoading(true)
        try { 
            Axios({
                method: 'get',
                url: 'http://localhost:5000/users', 
                withCredentials: true
            })
            .then((response) => {
                setUserList(response.data)
                setLoading(false)
                // console.log(userList)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = (userId) => {
        console.log(userId)
        
        console.log(newUserType)

        Axios({
            method: "PUT",
            url: 'http://localhost:5000/user',
            withCredentials: "include",
            data : {
                userId: userId,
                userType: newUserType
            }   
        })
        .then(getUsers)
    }

    if(isLoading === true) {
        return (
            <h1>Loading...</h1>
        )

    } else {
        return (
        <div>
            <h3>User List</h3>
            <div className={className}>
                {userList.map(user => (
                    <div key={user._id} className={userCard}>
                        <h1>ID: {user._id}</h1>
                        <h1>USERTYPE: {user.userType} </h1>
                        <h1>USERNAME: {user.userName}</h1>
                        <h1>EMAIL: {user.email}</h1>
                        <h1>JOINED: {user.dateJoined}</h1>
                        <div>
                            <h1>Set User Type: </h1>                
                            <select name="userType" onChange={(event) => {
                                setNewUserType(event.target.value)
                                console.log(newUserType)
                            }}>
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                                <option value="deleted">Deleted</option>
                            </select>
                            <button onClick={() => {
                                updateUser(user._id)
                            }}>Update User</button>
                        </div>
                    </div>
                ))}
            </div>  
        </div>
        )
    }
}