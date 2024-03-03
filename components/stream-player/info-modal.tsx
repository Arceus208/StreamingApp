"use client";

import {
  ElementRef,
  useRef,
  useState,
  useTransition,
} from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import Image from "next/image";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { UploadDropzone } from "@/lib/uploadthing";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { updateStream } from "@/actions/stream";
import { Hint } from "../hint";

type InfoModalProps = {
  initialName: string;
  initialThumbnailUrl: string | null;
};

export const InfoModal = ({
  initialName,
  initialThumbnailUrl,
}: InfoModalProps) => {
  const [name, setName] = useState(initialName);
  const [thumbnailUrl, setThumbnailUrl] =
    useState(initialThumbnailUrl);

  const router = useRouter();

  const [isPending, startTransition] =
    useTransition();
  const closeRef =
    useRef<ElementRef<"button">>(null);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setName(e.target.value);
  };

  const onRemove = () => {
    startTransition(() => {
      updateStream({ thumbnailUrl: null })
        .then(() => {
          toast.success("Thumbnail removed");
          setThumbnailUrl("");
          closeRef?.current?.click();
        })
        .catch(() =>
          toast.error("Something went wrong")
        );
    });
  };

  const onSubmit = (
    E: React.FormEvent<HTMLFormElement>
  ) => {
    E.preventDefault();

    startTransition(() => {
      updateStream({ name })
        .then(() => {
          toast.success("Stream updated");
          closeRef?.current?.click();
        })
        .catch(() =>
          toast.error("Something went wrong")
        );
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="sm"
          className="ml-auto"
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Edit stream info
          </DialogTitle>
        </DialogHeader>
        <form
          className="space-y-14"
          onSubmit={onSubmit}
        >
          <div className="space-y-2">
            <Label>Name</Label>
            <Input
              placeholder="Stream name"
              onChange={onChange}
              value={name}
              disabled={isPending}
            ></Input>
          </div>
          <div className="space-y-2">
            <Label>Thumbnail</Label>
            {thumbnailUrl ? (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10">
                <div className="absolute top-2 right-2 z-[10]">
                  <Hint
                    label="Remove thumbnail"
                    asChild
                    side="left"
                  >
                    <Button
                      type="button"
                      disabled={isPending}
                      onClick={onRemove}
                      className="h-auto w-auto p-1.5"
                    >
                      <Trash className="h-4 w-4"></Trash>
                    </Button>
                  </Hint>
                </div>
                <Image
                  src={thumbnailUrl}
                  alt="Thumbnail"
                  fill
                  className="object-cover"
                ></Image>
              </div>
            ) : (
              <div className="rounded-xl border outline-dashed outline-muted">
                <UploadDropzone
                  endpoint="thumbnailUploader"
                  appearance={{
                    label: {
                      color: "#FFFFFF",
                    },
                    allowedContent: {
                      color: "#FFFFFF",
                    },
                  }}
                  onClientUploadComplete={(
                    res
                  ) => {
                    setThumbnailUrl(
                      res?.[0]?.url
                    );
                    router.refresh();
                    closeRef?.current?.click();
                  }}
                ></UploadDropzone>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <DialogClose
              ref={closeRef}
              asChild
            >
              <Button
                type="button"
                variant="ghost"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isPending}
              variant="primary"
            >
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
