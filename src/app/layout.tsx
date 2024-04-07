import "~/styles/globals.css";

import { Inter } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "~/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { getServerAuthSession } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ url: "/logo.png" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  function AppAvatar() {
    if (!session) return null;
    return <Avatar>
      <AvatarImage src={String(session.user.image)} />
      <AvatarFallback>69</AvatarFallback>
    </Avatar>
  }

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <NavigationMenu className="space-x-4 p-2">
            <NavigationMenuLink>
              <Image src="/logo.png" alt="Pacman" width="25" height="25" />
            </NavigationMenuLink>
            <NavigationMenuList>
              <Link
                className="transition-all duration-100 hover:text-primary"
                href="/home/bmi"
              >
                <NavigationMenuItem>BMI Calculator</NavigationMenuItem>
              </Link>
            </NavigationMenuList>
            <NavigationMenuList>
              <Link
                className="transition-all duration-100 hover:text-primary"
                href="/home/sugar"
              >
                <NavigationMenuItem>Blood Sugar</NavigationMenuItem>
              </Link>
            </NavigationMenuList>
            <NavigationMenuList>
              <Link
                className="transition-all duration-100 hover:text-primary"
                href="/home/scanner"
              >
                <NavigationMenuItem>Food Scanner</NavigationMenuItem>
              </Link>
            </NavigationMenuList>
            <NavigationMenuList>
              <Link
                className="transition-all duration-100 hover:text-primary"
                href={session ? "/api/auth/signout" : "/api/auth/signin"}
              >
                <NavigationMenuItem>
                  {session ? "Sign Out" : "Sign In"}
                </NavigationMenuItem>
              </Link>
            </NavigationMenuList>
            <NavigationMenuList>
              <NavigationMenuItem>
                  <AppAvatar/>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
