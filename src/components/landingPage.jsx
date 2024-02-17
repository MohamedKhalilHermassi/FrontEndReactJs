import { Outlet } from "react-router-dom"
import Footer from "./footer"
import Front from "./front"
import { NavBar } from "./navbar"
import Acceuil from "./acceuil"
import { Suspense } from "react"

function LandingPage()
{
    return (
        <>
         <NavBar></NavBar>
<header className="header-2 skew-separator">

</header>
      <Suspense fallback={<h1>Loading...</h1>}>
      <Outlet/>
      </Suspense>
  <Footer></Footer>
        </>
    )
} export default LandingPage