import { User } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { formatDistanceToNow } from "date-fns";

import {
  Thumbnail,
  ThumbnailSkeleton,
} from "@/components/thumbnail";
import { VerifiedMark } from "@/components/verified-mark";
import { Skeleton } from "@/components/ui/skeleton";

type ResultCardProps = {
  data: {
    id: string;
    name: string;
    thumbnailUrl: string | null;
    isLive: boolean;
    updatedAt: Date;
    user: User;
  };
};

export const ResultCard = ({
  data,
}: ResultCardProps) => {
  return (
    <Link href={`/${data.user.username}`}>
      <div className="w-full flex gap-x-4">
        <div className="relative h-[9rem] w-[16rem]">
          <Thumbnail
            src={data.thumbnailUrl}
            fallback={data.user.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
          ></Thumbnail>
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <p className="font-bold text-lg cursor-pointer hover:text-blue-500">
              {data.user.username}
            </p>
            <VerifiedMark></VerifiedMark>
          </div>
          <p className="text-sm text-muted-foreground">
            {data.name}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDistanceToNow(
              new Date(data.updatedAt),
              { addSuffix: true }
            )}
          </p>
        </div>
      </div>
    </Link>
  );
};

export const ResultCardSkeleton = () => {
  return (
    <div className="w-full flex gap-x-4">
      <div className="relative h-[9rem] w-[16rem]">
        <ThumbnailSkeleton></ThumbnailSkeleton>
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-32"></Skeleton>
        <Skeleton className="h-3 w-24"></Skeleton>
        <Skeleton className="h-3 w-12"></Skeleton>
      </div>
    </div>
  );
};
