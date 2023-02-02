import { signIn, signOut, useSession } from 'next-auth/react'
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {
  const { data: session } = useSession()
  return (
    <div>

    </div>
  )
}