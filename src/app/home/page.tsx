import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession()

  return (
    <>
      <main className="p-4">
        <h1 className="flex text-5xl font-bold justify-center">
          Welcome Back,&nbsp;<span className="bg-gradient-to-r from-ctp-blue to-ctp-red text-transparent bg-clip-text">Riddhiman</span>
        </h1>
        <p>You've been doing great. Your blood sugar has shown a 36% decrease since the last check in.</p>
        <Image src="/sugar-charts.png" alt="Chart of progress for sugar." width="500" height="250"/>
      </main>
    </>
  );
}
