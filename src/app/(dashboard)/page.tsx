import { Alert, AlertTitle } from "@/src/components/ui/alert";
import { Skeleton } from "@/src/components/ui/skeleton";
import { currentUser } from "@clerk/nextjs";
import prisma from "@/src/lib/prisma";
import { Suspense } from "react";
import CreateButton from "@/src/components/CreateButton";
import CollectionCard from "@/src/components/CollectionCard";
import LandingPage from "../../components/LandingPage";
import moment from "moment-timezone";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeFallback />}>
        <WelcomeMessage />
      </Suspense>
      <Suspense fallback={<CollectionsFallback />}>
        <Collections />
      </Suspense>
    </>
  );
}

function getGreetMessage() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  // const currentHour = moment().tz(timezone).hour();
  const currentHour = 0;
  console.log(timezone);

  if (currentHour < 12) {
    return ('Good Morning')
  } else if (currentHour < 18) {
    return ('Pleasant Afternoon')
  } else {
    return ('Lovely Evening')
  }
}

async function WelcomeMessage() {
  const user = await currentUser();

  if (!user) {
    return <LandingPage />;
  }

  return (
    <div className="flex w-full mb-8">
      <h1 className="text-3xl md:text-4xl font-bold">
        {getGreetMessage()}, {user.firstName}! 👋
      </h1>
    </div>
  )
}

function WelcomeFallback() {
  return (
    <div className="flex w-full">
      <h1 className="text-4xl font-bold">
        <Skeleton className="w-[350px] h-12 bg-slate-400/10" />
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

function CollectionsFallback() {
  return (
    <div className="flex flex-col gap-4 mt-4">
      <Skeleton className="w-full h-12 bg-slate-400/10" />
      <Skeleton className="w-full h-10 bg-slate-400/10" />
    </div>
  )
}
