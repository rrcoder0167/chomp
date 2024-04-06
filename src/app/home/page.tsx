import { redirect } from "next/navigation";
import { getServerAuthSession } from "~/server/auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/")
  }

  return (<>
    <main className="p-4">
      <h1 className="text-4xl">Food Scanner</h1>
    </main>
  </>
  );
}
