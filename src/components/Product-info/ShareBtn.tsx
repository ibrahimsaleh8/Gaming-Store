import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ToastSweeat } from "../common/feedback/Toast";
export default function ShareBtn() {
  const HandleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    ToastSweeat(1000).fire({
      title: "Copied",
      position: "bottom-right",
      icon: "success",
      timer: 1000,
    });
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-second-black hover:bg-second-low-white duration-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={16}
            height={16}
            fill="currentColor"
            className="bi bi-share"
            viewBox="0 0 16 16">
            <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.5 2.5 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5m-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3m11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3" />
          </svg>
          Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md md:bg-[#0c0c0c24] bg-main-Background border-black backdrop-filter  md:backdrop-blur-lg">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <label htmlFor="link" className="sr-only">
              Link
            </label>
            <Input
              className="bg-main-Background text-white"
              id="link"
              defaultValue={window.location.href}
              readOnly
            />
          </div>
          <Button
            onClick={HandleCopy}
            type="submit"
            size="sm"
            className="px-3 bg-white text-black border border-white hover:bg-black hover:text-white">
            <span className="sr-only">Copy</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={16}
              height={16}
              fill="currentColor"
              className="bi bi-copy"
              viewBox="0 0 16 16">
              <path
                fillRule="evenodd"
                d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"
              />
            </svg>
          </Button>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
