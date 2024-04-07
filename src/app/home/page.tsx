import { getServerAuthSession } from "~/server/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession()

  return (
    <>
      <main className="p-4">
        <h1 className="text-4xl">Welcome Back {session?.user.full_name}</h1>
        <p>You've been doing great. Your blood sugar has shown a 36% decrease since the last check in.</p>
        <Image src="/sugar-charts.png" alt="Chart of progress for sugar." width="500" height="250"/>
      </main>
    </>
  );
}
