import Link from "next/link";
import { Button } from "~/components/ui/button";
import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (session) {
    redirect("/home");
  }

  return (
    <>
      <main className="p-4">
        <h1 className="text-4xl">Chomp - The food app</h1>
        <p>Take a bite out of diabetes.</p>
        <Link href="/api/auth/signin">
          <Button>Lets Go</Button>
        </Link>
      </main>
    </>
  );
}
