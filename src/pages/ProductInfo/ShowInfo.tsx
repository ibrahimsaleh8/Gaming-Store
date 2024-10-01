import { platformType } from "@/components/common/Types";
import RequiremnetsTable from "@/components/Product-info/RequiremnetsTable";
import EmblaCarousel from "@/components/Slider/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import AnotherProducts from "./AnotherProducts";

type PropsType = {
  title: string;
  description: string;
  trailer?: string;
  imges: string[];
  platform: platformType;
  requirements?: {
    min: {
      os_version: string;
      cpu: string;
      memory: number;
      gpu: string;
      storage: number;
    };
    recommend: {
      os_version: string;
      cpu: string;
      memory: number;
      gpu: string;
      storage: number;
    };
  };
};
export default function ShowInfo({
  description,
  imges,
  platform,
  title,
  requirements,
  trailer,
}: PropsType) {
  const OPTIONS: EmblaOptionsType = { align: "start", loop: true };
  const SLIDES = imges;

  return (
    <div className="xl:w-[80%] w-full p-2 flex justify-start flex-col gap-y-5 items-start ">
      <EmblaCarousel height="50rem" slides={SLIDES} options={OPTIONS} />
      <p className="md:w-[90%] w-full leading-7	">{description}</p>

      {requirements && (
        <RequiremnetsTable
          min={requirements.min}
          recommend={requirements.recommend}
          title={title}
        />
      )}

      <div className="trailer w-full p-1">
        <h1 className="text-xl font-bold mb-2 tracking-wide flex items-center  gap-3">
          Trailer
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill="currentColor"
            className="bi bi-youtube"
            viewBox="0 0 16 16">
            <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
          </svg>
        </h1>
        <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
          <iframe
            src={trailer}
            className="absolute top-0 left-0 w-full h-full"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
      <AnotherProducts title={title} category={platform} />
    </div>
  );
}
