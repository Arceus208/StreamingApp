import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

function NotfoundPage() {
  return (
    <div className="h-full flex flex-col sapce-y-4 items-center justify-center text-muted-foreground">
      <h1 className="text-4xl">404</h1>
      <p>
        We couldn&apos;t find the user you were
        looking for.
      </p>
      <Button
        variant="secondary"
        asChild
      >
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}

export default NotfoundPage;
