"use client";

import { VerifiedMark } from "../verified-mark";
import { BioModal } from "./bio-modal";

type AboutCardProps = {
  hostName: string;
  hostIdentity: string;
  viewerIdentity: string;
  bio: string | null;
  followedByCount: number;
};

export const AboutCard = ({
  hostIdentity,
  hostName,
  viewerIdentity,
  bio,
  followedByCount,
}: AboutCardProps) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  const followedByLabel =
    followedByCount === 1
      ? "follower"
      : "followers";

  return (
    <div className="px-4">
      <div className="group rounded-xl bg-background p-6 lg:p-10 flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2 font-semibold text-lg lg:text-2xl">
            About {hostName}
            <VerifiedMark></VerifiedMark>
          </div>
          {isHost && (
            <BioModal
              initialValue={bio}
            ></BioModal>
          )}
        </div>
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-primary">
            {followedByCount}
          </span>{" "}
          {followedByLabel}
        </div>
        <p className="text-sm">
          {bio || "This user is very mystery..."}
        </p>
      </div>
    </div>
  );
};
