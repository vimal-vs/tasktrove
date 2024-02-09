import { Alert, AlertTitle } from "@/src/components/ui/alert";
import { Skeleton } from "@/src/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/src/lib/prisma";
import { Suspense } from "react";
import CreateButton from "@/src/components/CreateButton";
import CollectionCard from "@/src/components/CollectionCard";

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
    <div className="flex w-full mb-6">
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

  if (!user) return;

  const collection = await prisma?.collection.findMany({
    include: {
      tasks: true
    },
    where: {
      userId: user?.id,
    },
  })
  if (collection?.length === 0) {
    return (
      <div>
        <Alert className="border my-4">
          <AlertTitle className="text-base">Create a collection to get started.</AlertTitle>
        </Alert>
        <CreateButton />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {collection?.map((item) => (
        <CollectionCard key={item.id} collection={item} />
      ))}
      <CreateButton />
    </div>
  )
}