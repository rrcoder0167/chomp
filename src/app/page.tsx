"use client"

import Link from "next/link";
import { Button } from "~/components/ui/button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList, NavigationMenuContent, NavigationMenuTrigger, NavigationMenuLink } from "~/components/ui/navigation-menu";

export default async function Home() {
  return (<>
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Link</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
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
