import { Outlet } from "react-router-dom"
import Header from "../components/common/Header"
import Footer from "../components/common/Footer"

export default function AppLayout () {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Header />

            <main className="flex-1 w-full">
                <div className="max-w-7xl mx-auto p-6">
                    <Outlet />
                </div>
            </main>

            <Footer />
        </div>
    )
}