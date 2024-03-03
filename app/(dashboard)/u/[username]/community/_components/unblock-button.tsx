"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { onUnblock } from "@/actions/block";
import { Button } from "@/components/ui/button";

type UnblockButtonProps = {
  userId: string;
};

export const UnblockButton = ({
  userId,
}: UnblockButtonProps) => {
  const [isPending, startTransition] =
    useTransition();

  const onClick = () => {
    startTransition(() => {
      onUnblock(userId)
        .then((data) =>
          toast.success(
            `User ${data.blocked.username} unblocked`
          )
        )
        .catch(() =>
          toast.error("Something went wrong")
        );
    });
  };

  return (
    <Button
      disabled={isPending}
      onClick={onClick}
      variant="link"
      size="sm"
      className="text-blue-500 w-full"
    >
      Unblock
    </Button>
  );
};
