"use client"
import { usePathname } from 'next/navigation'
import Btn from './Btn'

const AuthNav = () => {
    const pathname=usePathname()
  return (
    <nav className={`flex   gap-5 text-xl border-b dark:border-white/50  border-black/30 py-2 ${pathname=="/auth/signup"?"":"flex-row-reverse justify-end"}`}>
          <Btn title={"Signup"} style={pathname=="/auth/signup"?"text-orange-500":""} path="/auth/signup" />
          <span>/</span>
          <Btn title={"Login"} style={pathname=="/auth/login"?"text-orange-500":""} path={"/auth/login"} />
    </nav>
  )
}

export default AuthNav