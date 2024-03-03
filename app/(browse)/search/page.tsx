import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import {
  Results,
  ResultsSkeleton,
} from "./_components/results";

type SearchPageProps = {
  searchParams: {
    term?: string;
  };
};

function SearchPage({
  searchParams,
}: SearchPageProps) {
  if (!searchParams.term) {
    redirect("/");
  }

  return (
    <div className="h-full p-8 max-w-screen-2xl mx-auto">
      <Suspense
        fallback={
          <ResultsSkeleton></ResultsSkeleton>
        }
      >
        <Results
          term={searchParams.term}
        ></Results>
      </Suspense>
    </div>
  );
}

export default SearchPage;
