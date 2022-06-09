import { useState } from 'react'
import { useForm } from "react-hook-form"

const headingClassName = "md:col-span-2 mb-5"
const formClassName = "container border-x border-black mx-auto p-4 grid md:grid-cols-2 gap-1"
const inputClassName = "border border-1 border-black rounded-md p-1"
const errorClassName = "md:col-span-2 text-red-500"

export const Register = () => {
    const [status, setStatus] = useState("")
    const {register, handleSubmit, watch, formState: {errors}} = useForm()

    const watchPasswords = watch(["password", "password_confirmation"])
    const passwordsMatch = watchPasswords[0] == watchPasswords[1]
    console.log(passwordsMatch)

    const registerAccount = (formData) => {
        if (!passwordsMatch) return
        
        setStatus('Loading...')

        fetch("/api/user", {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.status == 200) {
                setStatus("Saved!")
            } else {
                setStatus("API Error!")
            }
        })

        console.log(formData)
    }

    return <form className={formClassName} onSubmit={handleSubmit(registerAccount)}>
        <h1 className={headingClassName}>Register Your Account</h1>

        <label>Email: </label>
        <input type="email" className={inputClassName} {...register("email", { required: true })} />
        <span className={errorClassName}>{errors.email && "Invalid Email"}</span>
        
        <label>Username: </label>
        <input className={inputClassName} {...register("username", {required: true, maxLength: 20, pattern: /^[a-zA-Z]*$/ })}/>
        <span className={errorClassName}>{errors.username && "Invalid username"}</span>
       
       <label>Password: </label>
        <input type="password" className={inputClassName} {...register("password", { required: true })}/>
        <span className={errorClassName}>{errors.password && "Invalid Password"}</span>
       
        <label>Confirm Password: </label>
        <input type="password" className={inputClassName} {...register("password_confirmation", { required: true })}/>
        <span className={errorClassName}>
            {errors.password_confirmation && "Invalid Password Confirmation "}
            {!passwordsMatch ? "Passwords do not match!" : ""}
        </span>
        
        <input className={inputClassName + " md:col-start-2"} type="submit" />
        <span className="text-blue-500 md:col-start-2">{status}</span>
    </form>
}