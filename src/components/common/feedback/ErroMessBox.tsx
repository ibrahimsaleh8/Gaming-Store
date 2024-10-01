import { Link } from "react-router-dom";
type Props = {
  errorMessage: string;
};
export default function ErroMessBox({ errorMessage }: Props) {
  return (
    <div className="min-h-[70vh]">
      <div className="text-xl flex flex-col gap-3 w-full items-center justify-center mt-12 p-3 rounded-lg  border border-error text-error ">
        <p className="flex items-center gap-2 font-bold text-3xl">
          Error
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-octagon-x">
            <path d="m15 9-6 6" />
            <path d="M2.586 16.726A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2h6.624a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586z" />
            <path d="m9 9 6 6" />
          </svg>
        </p>
        <p>{errorMessage}</p>
        <Link
          className="bg-white text-black px-4 py-2 rounded-lg w-fit "
          to={"/"}
          replace={true}>
          Go Home Page
        </Link>
      </div>
    </div>
  );
}
