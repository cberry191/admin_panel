import { Login } from "./components/Login"

import { useState, useEffect } from "react"

const className = "flex flex-col justify-center p-10 bg-slate-300"

export const App = () => {
    return <div className={className}>
            <h1 className="text-red-500">Publishing House Admin</h1>
            <Login />
        </div>
}