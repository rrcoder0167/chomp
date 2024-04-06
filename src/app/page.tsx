"use client"

import Link from "next/link";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink } from "~/components/ui/navigation-menu";

export default function Home() {
  return (<>
    <NavigationMenu className="space-x-4 p-2">
      <NavigationMenuLink className=""><Image src="/logo.png" alt="Pacman" width="500" height="500"/></NavigationMenuLink>
      <NavigationMenuList>
        <Link href="/api/auth/signin"><NavigationMenuItem>
            Sign In
        </NavigationMenuItem></Link>
      </NavigationMenuList>
    </NavigationMenu>
    <main className="p-4">
      <h1 className="text-4xl">Chomp - The food app</h1>
      <p>Take a bite out of diabetes.</p>
      <Button>Lets Go</Button>
    </main>
  </>
  );
}
