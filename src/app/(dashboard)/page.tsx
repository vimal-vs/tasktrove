import { Alert, AlertTitle } from "@/src/components/ui/alert";
import { Skeleton } from "@/src/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/src/lib/prisma";
import { Suspense } from "react";
import CreateButton from "@/src/components/CreateButton";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeFallback />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Collections />
      </Suspense>
    </>
  );
}


async function WelcomeMessage() {
  const user = await currentUser();

  if (!user) {
    return <div>nope</div>;
  }
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        Welcome, {user.firstName}! 👋
      </h1>
    </div>
  )
}

function WelcomeFallback() {
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[200px] bg-slate-600" />
      </h1>
    </div>
  )
}

async function Collections() {
  const user = await currentUser();
  const collection = await prisma?.collection.findMany({
    where: {
      userId: user?.id,
    },
  })
  if (collection?.length === 0) {
    return (
      <div>
        <Alert>
          <AlertTitle>Empty👀</AlertTitle>
        </Alert>
        <CreateButton />
      </div>
    )
  }
}