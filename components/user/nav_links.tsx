'use client'
import { signOut } from "next-auth/react"
import { Loader2, LogOut } from "lucide-react"
import Link from "next/link"
import { Home, Library, Bell, MessageSquare, User, MoreHorizontal } from 'lucide-react'
import { useState } from "react"

export default function NavLinks() {

    const [isSignOut, setIsSignOut] = useState(false)

    const hadnleSignOut = async () => {
        if (isSignOut) return // Previene multiples clicks

        setIsSignOut(true)

        try {
            await signOut({
                callbackUrl: '/',
            })
        } catch(error){
            console.error("Error signing out: ", error)
        } finally {
            setIsSignOut(false)
        }
    }

    return(
        <nav className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-[#0f4c81] font-bold">
                <span>Kaanbal</span>
            </Link>
            <Link href="/dashboard" className="flex items-center space-x-2">
                <Home size={20} />
                <span>Inicio</span>
            </Link>
            <Link href="/dashboard/biblioteca" className="flex items-center space-x-2">
                <Library size={20} />
                <span>Tu biblioteca</span>
            </Link>
            <Link href="/dashboard/notificaciones" className="flex items-center space-x-2">
                <Bell size={20} />
                <span>Notificaciones</span>
            </Link>
            <Link href="/dashboard/chat-pdf" className="flex items-center space-x-2">
            <   MessageSquare size={20} />
                <span>Chat PDF</span>
            </Link>
            <Link href="/dashboard/perfil" className="flex items-center space-x-2">
            <   User size={20} />
                <span>Perfil</span>
            </Link>
            <button
                onClick={hadnleSignOut}
                disabled={isSignOut}
                className="flex items-center space-x-2 w-full text-left hover:text-[#0f4c81] transition-colors focus:outline-none"
                aria-label={isSignOut ? "Cerrando sesión..." : "Cerrar sesión"}
            >
                {isSignOut ? (
                    <Loader2 size={20} className="animate-spin" />
                ): (
                    <LogOut size={20}/>
                )}
                <span>
                    {isSignOut ? "Cerrando sesión..." : "Cerrar sesión" }
                </span>
            </button>
        </nav>
    )
}
