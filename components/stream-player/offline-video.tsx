import { WifiOff } from "lucide-react";

type OfflineVideoProps = {
  username: string;
};

export const OfflineVideo = ({
  username,
}: OfflineVideoProps) => {
  return (
    <div className="h-full flex flex-col space-y-4 justify-center items-center">
      <WifiOff className="h-10 w-10 text-muted-foreground"></WifiOff>
      <p className="text-muted-foreground">
        {username} is offline
      </p>
    </div>
  );
};
