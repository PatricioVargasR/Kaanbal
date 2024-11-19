'use client'
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import Link from "next/link"
import { Home, Library, Bell, MessageSquare, User, MoreHorizontal } from 'lucide-react'

export default function NavLinks() {

    return(
        <nav className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 text-[#0f4c81] font-bold">
                <span>Kaanbal</span>
            </Link>
            <Link href="/principal" className="flex items-center space-x-2">
                <Home size={20} />
                <span>Inicio</span>
            </Link>
            <Link href="/biblioteca" className="flex items-center space-x-2">
                <Library size={20} />
                <span>Tu biblioteca</span>
            </Link>
            <Link href="/notificaciones" className="flex items-center space-x-2">
                <Bell size={20} />
                <span>Notificaciones</span>
            </Link>
            <Link href="/chat-pdf" className="flex items-center space-x-2">
            <   MessageSquare size={20} />
                <span>Chat PDF</span>
            </Link>
            <Link href="/perfil" className="flex items-center space-x-2">
            <   User size={20} />
                <span>Perfil</span>
            </Link>
            <button
                onClick={() => {
                    signOut({
                        callbackUrl: "/",
                    })
                }}
                className="flex items-center space-x-2 w-full text-left hover:text-[#0f4c81] transition-colors focus:outline-none"
            >
                <LogOut size={20}/>
                <span>
                    Cerrar sesión
                </span>
            </button>
        </nav>
    )
}
