
import TopBar from "@/components/topbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export default async function PublicLayout({ children }) {

  const session = await getServerSession(authOptions);
  let user;

  if(session){
    user = await prisma.user.findUnique({ where: { email: session.user.email }})
  } else {
    user = null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar 
        user={user}
      />
      <main className="grid-public overflow-y-auto h-[calc(100vh-var(--topbar-h))] pt-[var(--topbar-h)]">
        {children}
      </main>
    </div>
  );
}
