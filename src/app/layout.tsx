import "~/styles/globals.css";
import { Inter } from "next/font/google";
import NextTopLoader from 'nextjs-toploader';
import { TRPCReactProvider } from "~/trpc/react";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "~/components/ui/navigation-menu";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar";
import { getServerAuthSession } from "~/server/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Chomp",
  description: "Go through Diabetes one bite at a time.",
  icons: [{ url: "/logo.png" }],
};

const NavigationLink = ({ href, children }) => (
  <Link className="transition-all duration-100 hover:text-primary" href={href}>
    <NavigationMenuItem>{children}</NavigationMenuItem>
  </Link>
);

const navigationItems = [
  { href: "/home/bmi", label: "BMI Calculator" },
  { href: "/home/foods", label: "Past Foods" },
  { href: "/home/camera", label: "Food Scanner" },
  { href: "/home/setup", label: "Setup" },
];

export default async function RootLayout({ children }: { children: React.ReactNode; }) {
  const session = await getServerAuthSession();

  function AppAvatar() {
    if (!session) return null;
    return (
      <Avatar>
        <AvatarImage src={String(session.user.image)} />
        <AvatarFallback>69</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>
        <NextTopLoader color="#cba6f7"/>
          <div className="flex justify-center space-x-4 p-2 mt-4"> {/* Added mt-4 for top margin */}
            <Link href="/home">
              <img src="/logo.png" alt="Pacman" className="w-6 h-6" />
            </Link>
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-ctp-text hover:text-ctp-blue hover:font-bold transition-all duration-300"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="text-ctp-red hover:font-bold transition-all duration-300"
            >
              {session ? "Sign Out" : "Sign In"}
            </Link>
            <div>
              <AppAvatar />
            </div>
          </div>
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}
