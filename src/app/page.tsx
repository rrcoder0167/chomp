import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuLink } from "~/components/ui/navigation-menu";
import { redirect } from 'next/navigation'
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  console.log(session)

  if (session) {
    redirect("/home")
  }

  return (<>
    <NavigationMenu className="space-x-4 p-2">
      <NavigationMenuLink><Image src="/logo.png" alt="Pacman" width="25" height="25"/></NavigationMenuLink>
      <NavigationMenuList className="float-end">
        <Link className="hover:text-primary transition-all duration-100" href="/api/auth/signin"><NavigationMenuItem>
            Sign In
        </NavigationMenuItem></Link>
      </NavigationMenuList>
    </NavigationMenu>
    <main className="p-4">
      <h1 className="text-4xl">Chomp - The food app</h1>
      <p>Take a bite out of diabetes.</p>
      <Link href="/api/auth/signin"><Button>Lets Go</Button></Link>
    </main>
  </>
  );
}
