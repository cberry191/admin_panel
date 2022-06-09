import { LogList } from "./LogList.js"
import { NoteList } from './Notelist.js'
import { UserList } from "./UserList.js"

const inputClassName = "border border-1 border-black rounded-md p-1"
const dashboardClassName = "flex flex-col justify-center grid grid-cols-1 gap-4  p-8"
const containerClassName = "h-96  overflow-auto"
const noteClassName = " h-36 overflow-auto"

export const Dashboard = () => {
    return <div className={dashboardClassName}>
        <UserList className={containerClassName}/>
        <LogList className={containerClassName}/>
        <NoteList className={noteClassName}/>
    </div>
}