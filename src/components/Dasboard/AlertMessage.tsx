import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertMessage({ desc }: { desc: string }) {
  return (
    <Alert className="bg-main-Background text-yellow-text border-yellow-text ">
      <AlertTitle className="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={20}
          height={20}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-triangle-alert">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
        Attention Please!
      </AlertTitle>
      <AlertDescription className="font-bold">{desc}</AlertDescription>
    </Alert>
  );
}
