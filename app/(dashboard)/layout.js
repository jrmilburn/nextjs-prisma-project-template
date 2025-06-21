
import Sidebar from "../../components/sidebar/index"
import TopBar from "../../components/topbar"
import { prisma } from "../../lib/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function Layout({ children }) {

    const session = await getServerSession();

    if(!session) {
        redirect('/login')
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        user={user}
      />
      <div className="flex h-[calc(100vh-0px)] pt-[var(--topbar-h)]">
        <Sidebar 
            user={user}
        />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
