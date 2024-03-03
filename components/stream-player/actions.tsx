"use client";

import { useAuth } from "@clerk/nextjs";
import { useTransition } from "react";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  onFollow,
  onUnfollow,
} from "@/actions/follow";
import { Skeleton } from "../ui/skeleton";

type ActionsProps = {
  isFollowing: boolean;
  hostIdentity: string;
  isHost: boolean;
};

export const Actions = ({
  isFollowing,
  hostIdentity,
  isHost,
}: ActionsProps) => {
  const { userId } = useAuth();
  const router = useRouter();
  const [isPending, startTransition] =
    useTransition();

  const handleFollow = () => {
    startTransition(() => {
      onFollow(hostIdentity)
        .then((data) =>
          toast.success(
            `You are now following ${data.following.username}`
          )
        )
        .catch(() =>
          toast.error("Something went wrong")
        );
    });
  };

  const handleUnfollow = () => {
    startTransition(() => {
      onUnfollow(hostIdentity)
        .then((data) =>
          toast.success(
            `You have unfollowed ${data.following.username}`
          )
        )
        .catch(() =>
          toast.error("Something went wrong")
        );
    });
  };

  const toggleFollow = () => {
    if (!userId) {
      router.push("/sign-in");
    }

    if (isHost) return;

    if (isFollowing) {
      handleUnfollow();
    } else {
      handleFollow();
    }
  };

  return (
    <Button
      disabled={isPending || isHost}
      onClick={toggleFollow}
      variant="primary"
      size="sm"
      className="w-full lg:w-auto"
    >
      <Heart
        className={cn(
          "h-4 w-4 mr-2",
          isFollowing ? "fill-white" : "fill-none"
        )}
      ></Heart>
      {isFollowing ? "Unfollow" : "Follow"}
    </Button>
  );
};

export const ActionsSkeleton = () => {
  return (
    <Skeleton className="h-10 w-full lg:w-24"></Skeleton>
  );
};
