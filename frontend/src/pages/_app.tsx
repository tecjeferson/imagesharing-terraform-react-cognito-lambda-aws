import { SessionProvider } from "next-auth/react"
import Header from "../components/header"
import 'bootstrap/dist/css/bootstrap.min.css';


export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
  )
}

