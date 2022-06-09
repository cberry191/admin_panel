import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Dashboard } from './Dashboard.js'

const headingClassName = "md:col-span-2 mb-5"
const formClassName = "container border-x border-black mx-auto p-4 grid md:grid-cols-2 gap-1"
const inputClassName = "border border-1 border-black rounded-md p-1"
const errorClassName = "md:col-span-2 text-red-500"
const logoutButtonClassName = ""

export const Login = () => {
    const [login, setLogin] = useState({user: ""})
    const [status, setStatus] = useState("")

    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const postLogin = (formData) => {
        fetch("http://localhost:5000/cp", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData),
            credentials: "include"
        })
        .then(response => response.json())
        .then(response => {
            let userDetails = JSON.stringify(response.userName)
            window.localStorage.setItem('user', userDetails)

            setLogin( { "user": formData.username} )   
            setStatus("Logged In")
        })
        .catch((error) => {
            console.log(error)
            setStatus("Login Error")
        })
    }

    const postLogout = () => {
        setLogin( { "user": ""} )
        setStatus("Logged Out")
        
        fetch("http://localhost:5000/logout", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            }, 
            credentials: "include"
        })
        .then(response => {
            if (response.status == 200) {
                window.localStorage.removeItem('user')
                setLogin( { "user": ""} )
                setStatus("Logged Out")
            } else {
                setStatus("Logout Error")
            }
        })
    }

    
    return (
        <>        
            { login.user === "" ? (
            <form 
                className={formClassName} 
                onSubmit={handleSubmit(postLogin)}>
            <h1 className={headingClassName}>Login</h1>
            <label>Email: </label>
            <input 
                type="email" 
                className={inputClassName} 
                {...register("email", { required: true })} />
            <span className={errorClassName}>{errors.email && "Invalid Email"}</span>
        
            <label>Password: </label>
            <input 
                type="password" 
                className={inputClassName} 
                {...register("password", { required: true })}/>
            <span className={errorClassName}>{errors.password && "Invalid Password"}</span>
        
            <input className={inputClassName + " md:col-start-2"} type="submit" />
            <span className="text-blue-500 md:col-start-2">{status}</span>
            </form>
            ) : (
                <>
                    <Dashboard />
                    <input 
                    className={logoutButtonClassName}
                    type="button" 
                    value="Logout" 
                    onClick={postLogout} />
                </>
                 ) }
        </>
    )
}