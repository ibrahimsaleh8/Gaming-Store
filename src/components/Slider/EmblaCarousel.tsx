import { EmblaOptionsType } from "embla-carousel";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";
import "../../components/Slider/embla.css";

type PropType = {
  slides: string[];
  options?: EmblaOptionsType;
  autoplayDelay?: number;
  height?: string;
  customClass?: string;
};

const EmblaCarousel: React.FC<PropType> = ({
  slides,
  options,
  autoplayDelay = 4000,
  height,
  customClass,
}) => {
  const autoplay = Autoplay({ delay: autoplayDelay, stopOnInteraction: false });
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [autoplay]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => autoplay.reset());
  }, [emblaApi, autoplay]);
  const classNames = height
    ? `embla__slide__number w-full h-[${height}]`
    : "embla__slide__number w-full h-[19rem]";

  const custom_Class = customClass
    ? `embla w-full ${customClass}`
    : "embla w-full";
  return (
    <section className={custom_Class}>
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index, i) => (
            <div className="embla__slide w-full" key={index}>
              <div className={classNames}>
                <img
                  src={index}
                  className="w-full object-cover object-center"
                  alt={`img-${i}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
