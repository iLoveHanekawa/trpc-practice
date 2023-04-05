import { GetStaticProps } from "next"

interface UserType {
    id: number
    name: string
    email: string
}

export default function UserList({ users }: { users: UserType[] }) {
    return <ul>
        {users.map((val, i) => {
            return <li key = {i}>
                <div>{val.id}</div>
                <div>{val.name}</div>
                <div>{val.email}</div>
                <br/>
            </li>
        })}
    </ul>
}

export const getStaticProps: GetStaticProps =async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    const data = await response.json()
    return {
        props: {
            users: data
        }
    }
}