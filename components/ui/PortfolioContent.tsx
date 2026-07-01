"use client";

import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

import { useCallback, useEffect, useMemo, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { MdImage, MdOpenInFull, MdPhotoLibrary } from "react-icons/md";
import { sanitizeHtml } from "@/lib/sanitize-html";

interface GalleryImage {
  id: number;
  imageUrl: string;
  portfolioId: number;
}

interface PortfolioData {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  content: string;
  createdAt: string;
  shortDesc: string;
  gallery: GalleryImage[];
}

export default function PortfolioContent({
  portfolio,
}: {
  portfolio: PortfolioData;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryItems = useMemo(() => {
    const items: GalleryImage[] = [];

    if (portfolio.thumbnail) {
      items.push({
        id: portfolio.id,
        imageUrl: portfolio.thumbnail,
        portfolioId: portfolio.id,
      });
    }

    if (portfolio.gallery?.length) {
      const galleryWithoutDuplicateCover = portfolio.gallery.filter(
        (item) => item.imageUrl !== portfolio.thumbnail,
      );

      items.push(...galleryWithoutDuplicateCover);
    }

    return items;
  }, [portfolio.gallery, portfolio.id, portfolio.thumbnail]);

  const hasMultipleImages = galleryItems.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: hasMultipleImages,
    direction: "rtl",
  });

  const slides = useMemo(
    () => galleryItems.map((item) => ({ src: item.imageUrl })),
    [galleryItems],
  );

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      dir="rtl"
      className="relative z-10 mx-auto w-full max-w-[1440px] overflow-hidden px-4 py-8 lg:px-20 lg:py-12"
    >
      <div className="absolute right-6 top-16 -z-10 h-44 w-44 rounded-full bg-[#F196E5]/25 blur-3xl" />
      <div className="absolute bottom-24 left-8 -z-10 h-56 w-56 rounded-full bg-[#CAF3AB]/55 blur-3xl" />
      <div className="absolute left-1/2 top-24 -z-10 h-40 w-40 rounded-full bg-sky-200/40 blur-3xl" />

      <div className="grid gap-8 lg:grid-cols-[1.20fr_0.80fr] lg:items-start">
        {/* Right: Title + Description */}
        <div className="order-1 lg:order-1">
          <article className="rounded-[2rem] border-2 border-black bg-white p-5 shadow-[10px_10px_0_#F196E5] sm:p-8">
            <div className="mb-5 inline-flex rounded-full border-2 border-black bg-[#F196E5] px-5 py-2 text-sm font-black text-white shadow-[4px_4px_0_#111]">
              نمونه‌کار
            </div>

            <div className="mb-7">
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 44C23.4348 44 24.6106 42.9449 24.8098 41.4516C26.7825 28.152 28.5959 26.3005 41.3896 24.8471C42.8641 24.6679 44 23.4336 44 22.0001C44 20.5466 42.8841 19.3521 41.4094 19.1331C28.6956 17.3611 27.1215 15.8082 24.8098 2.52862C24.5507 1.05529 23.4148 0 22 0C20.5454 0 19.3894 1.05529 19.1504 2.54842C17.2175 15.8282 15.4041 17.6797 2.63041 19.1331C1.11591 19.3323 0 20.5268 0 22.0001C0 23.4336 1.07607 24.6281 2.59057 24.8471C15.3242 26.6589 16.8785 28.1918 19.1504 41.4716C19.4493 42.9647 20.605 44 22 44Z"
                      fill="#0C0C0C"
                    />
                  </svg>
                </span>

                <div>
                  <h1 className="text-3xl font-black leading-[1.7] text-black sm:text-4xl">
                    {portfolio.title}
                  </h1>

                  {portfolio.shortDesc && (
                    <p className="mt-3 text-sm font-bold leading-8 text-black/60 sm:text-base">
                      {portfolio.shortDesc}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-[1.75rem] border-2 border-black bg-[#FFF7D8] p-5 shadow-[6px_6px_0_#111] sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl border-2 border-black bg-white text-black shadow-[3px_3px_0_#111]">
                  <svg
                    width="21"
                    height="21"
                    viewBox="0 0 44 44"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22 44C23.4348 44 24.6106 42.9449 24.8098 41.4516C26.7825 28.152 28.5959 26.3005 41.3896 24.8471C42.8641 24.6679 44 23.4336 44 22.0001C44 20.5466 42.8841 19.3521 41.4094 19.1331C28.6956 17.3611 27.1215 15.8082 24.8098 2.52862C24.5507 1.05529 23.4148 0 22 0C20.5454 0 19.3894 1.05529 19.1504 2.54842C17.2175 15.8282 15.4041 17.6797 2.63041 19.1331C1.11591 19.3323 0 20.5268 0 22.0001C0 23.4336 1.07607 24.6281 2.59057 24.8471C15.3242 26.6589 16.8785 28.1918 19.1504 41.4716C19.4493 42.9647 20.605 44 22 44Z"
                      fill="#0C0C0C"
                    />
                  </svg>
                </span>

                <div>
                  <h2 className="text-xl font-black text-black">
                    درباره پروژه
                  </h2>
                  <p className="mt-1 text-xs font-bold text-black/45">
                    توضیحات، روند طراحی و جزئیات این نمونه‌کار
                  </p>
                </div>
              </div>

              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(portfolio.content),
                }}
                className="max-w-none text-right text-base font-bold leading-9 text-gray-800 sm:text-lg [&_h1]:text-3xl [&_h1]:font-black [&_h2]:text-2xl [&_h2]:font-black [&_p]:leading-9 [&_strong]:font-black [&_ul]:list-disc [&_ul]:pr-6"
              />
            </div>
          </article>
        </div>

        {/* Left: Gallery */}
        <div className="order-2 lg:order-2">
          <div className="rounded-[2rem] border-2 border-black bg-[#CAF3AB] p-4 shadow-[10px_10px_0_#111] sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-black bg-white text-black shadow-[4px_4px_0_#111]">
                  <MdPhotoLibrary size={25} />
                </span>

                <div>
                  <h2 className="text-lg font-black text-black">گالری پروژه</h2>
                  <p className="mt-1 text-xs font-bold text-black/50">
                    برای مشاهده بزرگ‌تر روی تصویر کلیک کنید.
                  </p>
                </div>
              </div>

              <span className="rounded-full border-2 border-black bg-white px-4 py-2 text-xs font-black text-black shadow-[3px_3px_0_#111]">
                {galleryItems.length.toLocaleString("fa-IR")} تصویر
              </span>
            </div>

            {galleryItems.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={scrollNext}
                    disabled={!hasMultipleImages}
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111] sm:flex"
                    aria-label="تصویر بعدی"
                  >
                    <IoIosArrowForward className="text-3xl" />
                  </button>

                  <div
                    className="relative min-w-0 flex-1 overflow-hidden rounded-[1.75rem]"
                    ref={emblaRef}
                  >
                    <div className="flex">
                      {galleryItems.map((item, index) => (
                        <div
                          key={`${item.id}-${index}`}
                          className="relative min-w-0 flex-[0_0_100%]"
                        >
                          <button
                            type="button"
                            onClick={() => openLightbox(index)}
                            className="group relative block w-full overflow-hidden rounded-[1.75rem] border-2 border-black bg-white p-2 shadow-[6px_6px_0_#111]"
                          >
                            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.25rem] bg-gray-100">
                              <Image
                                src={item.imageUrl}
                                alt={`${portfolio.title} - تصویر ${index + 1}`}
                                fill
                                priority={index === 0}
                                sizes="(max-width: 768px) 100vw, 760px"
                                className="object-contain transition duration-500 group-hover:scale-[1.03]"
                              />

                              <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/20" />

                              <span className="absolute left-4 top-4 flex h-11 w-11 translate-y-2 items-center justify-center rounded-2xl border-2 border-black bg-white text-black opacity-0 shadow-[3px_3px_0_#111] transition group-hover:translate-y-0 group-hover:opacity-100">
                                <MdOpenInFull size={22} />
                              </span>

                              <span className="absolute bottom-4 right-4 rounded-full border-2 border-black bg-[#F196E5] px-4 py-2 text-xs font-black text-white opacity-0 shadow-[3px_3px_0_#111] transition group-hover:opacity-100">
                                مشاهده تصویر
                              </span>
                            </div>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={scrollPrev}
                    disabled={!hasMultipleImages}
                    className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#111] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0_#111] sm:flex"
                    aria-label="تصویر قبلی"
                  >
                    <IoIosArrowBack className="text-3xl" />
                  </button>
                </div>

                {hasMultipleImages && (
                  <div className="flex justify-center gap-2 overflow-x-auto pb-1">
                    {galleryItems.map((item, index) => (
                      <button
                        key={`${item.id}-${index}-thumb`}
                        type="button"
                        onClick={() => scrollTo(index)}
                        aria-label={`تصویر ${index + 1}`}
                        className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-white transition ${
                          selectedIndex === index
                            ? "border-black shadow-[3px_3px_0_#F196E5]"
                            : "border-black/25 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={item.imageUrl}
                          alt={`${portfolio.title} - بند انگشتی ${index + 1}`}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center rounded-[1.75rem] border-2 border-dashed border-black/30 bg-white/60 p-8 text-center">
                <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-3xl border-2 border-black bg-[#FFE066] text-black shadow-[4px_4px_0_#111]">
                  <MdImage size={32} />
                </span>

                <h2 className="text-lg font-black text-black">
                  تصویری برای این پروژه ثبت نشده است
                </h2>

                <p className="mt-2 text-sm font-bold leading-7 text-black/55">
                  بعد از اضافه شدن تصاویر، گالری پروژه اینجا نمایش داده می‌شود.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={lightboxIndex}
        plugins={[Zoom, Thumbnails]}
      />
    </section>
  );
}
