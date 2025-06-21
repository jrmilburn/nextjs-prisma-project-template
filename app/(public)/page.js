import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {

  const pages = [
    {name: "Landing Page", link: "/landing"},
    {name: "Login Page", link: "/login"},
    {name: "Register Page", link: "/register"},
    {name: "Dashboard", link: "/dashboard"},
  ]

  return (
    <div className="grid items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <h1>Hello</h1>
        <h3>This is the base page for the start template. Find below page setups</h3>
        <p className="opacity-50">Dashboard requires to create an account and authenticate</p>
        <ul className="flex flex-col gap-2 items-center">
          {pages.map((page,index) => (
            <Link 
              key={index} 
              href={page.link}
              className="flex relative group">
                {page.name}
                <div className="bg-black w-[0px] h-[1px] absolute bottom-0 group-hover:w-full transition-all duration-300">
                </div>
                <ChevronRight 
                  className="group-hover:translate-x-[10px] transition-all duration-300"
                />
            </Link>
          ))}
        </ul>
    </div>
  );
}
