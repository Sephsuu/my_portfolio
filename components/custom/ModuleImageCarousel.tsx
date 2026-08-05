"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
    type CarouselApi,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type ModuleImageCarouselProps = {
    images: string[];
    moduleTitle: string;
};

export function ModuleImageCarousel({ images, moduleTitle }: ModuleImageCarouselProps) {
    const [api, setApi] = useState<CarouselApi>();
    const [activeSlide, setActiveSlide] = useState(0);

    const updateActiveSlide = useCallback((carouselApi: CarouselApi) => {
        if (!carouselApi) return;
        setActiveSlide(carouselApi.selectedScrollSnap());
    }, []);

    const handleSetApi = useCallback((carouselApi: CarouselApi) => {
        setApi(carouselApi);
        if (carouselApi) setActiveSlide(carouselApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!api) return;

        api.on("select", updateActiveSlide);
        api.on("reInit", updateActiveSlide);

        return () => {
            api.off("select", updateActiveSlide);
            api.off("reInit", updateActiveSlide);
        };
    }, [api, updateActiveSlide]);

    return (
        <Carousel
            setApi={handleSetApi}
            opts={{
                align: "center",
                containScroll: false,
                loop: images.length > 2,
            }}
            aria-label={`${moduleTitle} screenshots`}
            className="mt-8"
        >
            <CarouselContent className="ml-0 py-7">
                {images.map((image, imageIndex) => {
                    const isActive = imageIndex === activeSlide;

                    return (
                        <CarouselItem
                            key={image}
                            aria-label={`${imageIndex + 1} of ${images.length}`}
                            className={cn(
                                "relative pl-0",
                                images.length > 1
                                    ? "basis-[88%] sm:basis-[82%] lg:basis-[76%]"
                                    : "basis-full",
                                isActive ? "z-20" : "z-10"
                            )}
                        >
                            <figure
                                className={cn(
                                    "relative transform-gpu overflow-hidden rounded-2xl border border-roast/10 bg-feather p-1.5 shadow-[0_16px_45px_rgba(88,56,42,0.16)] transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
                                    images.length > 1 && "-mx-3 sm:-mx-5",
                                    isActive
                                        ? "scale-100 opacity-100"
                                        : "scale-[0.92] opacity-45"
                                )}
                            >
                                <Image
                                    src={`/images/projects/${image}`}
                                    alt={`${moduleTitle} interface ${imageIndex + 1}`}
                                    width={2940}
                                    height={1678}
                                    sizes="(max-width: 640px) 88vw, (max-width: 1024px) 82vw, 1030px"
                                    className="h-auto w-full rounded-xl"
                                />
                                {images.length > 1 && isActive && (
                                    <figcaption className="absolute right-4 bottom-4 rounded-full bg-roast/85 px-3 py-1.5 font-mono text-xs text-feather shadow-sm backdrop-blur-sm">
                                        {String(imageIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                                    </figcaption>
                                )}
                            </figure>
                        </CarouselItem>
                    );
                })}
            </CarouselContent>

            {images.length > 1 && (
                <>
                    <CarouselPrevious className="left-3 z-30 size-11 border-white/70 bg-white/95 text-roast shadow-lg hover:bg-white sm:left-6" />
                    <CarouselNext className="right-3 z-30 size-11 border-white/70 bg-white/95 text-roast shadow-lg hover:bg-white sm:right-6" />
                </>
            )}
        </Carousel>
    );
}
