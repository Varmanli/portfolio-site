"use client";

import { Header } from "@/components/shared/Header";
import Image from "next/image";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRef, useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import LoadingOverlay from "@/components/shared/LoadingOverlay";

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

export default function ProjectDetailPage() {
  const { slug } = useParams();
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `https://personal-tarsier-varmanli-69caf64d.koyeb.app/portfolios/${slug}`
        );
        if (!res.ok) return notFound();
        const data = await res.json();
        setPortfolio(data);
      } catch (error) {
        console.error(error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading || !portfolio)
    return (
      <div className="p-10">
        <LoadingOverlay />
      </div>
    );

  const slides = portfolio.gallery.map((item) => ({ src: item.imageUrl }));

  return (
    <>
      <Header />
      <section className="px-4 py-10 max-w-[1440px] mx-auto relative z-10">
        <div className="flex justify-center mx-auto items-center gap-5 mb-10 w-[700px]">
          <button
            ref={nextRef}
            className="bg-accent rounded-full border-4 cursor-pointer"
          >
            <IoIosArrowForward className="text-4xl" />
          </button>

          <Swiper
            spaceBetween={20}
            loop={true}
            modules={[Navigation]}
            autoHeight={true}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            onBeforeInit={(swiper) => {
              if (typeof swiper.params.navigation === "object") {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }
            }}
            className="w-full"
          >
            {portfolio.gallery.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="relative group inline-block">
                  {/* خود تصویر */}
                  <Image
                    src={item.imageUrl}
                    alt={`portfolio-${index}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto w-auto max-w-full border-4 border-black shadow-xl cursor-pointer"
                    onClick={() => {
                      setLightboxIndex(index);
                      setLightboxOpen(true);
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button
            ref={prevRef}
            className="bg-accent rounded-full border-4 cursor-pointer"
          >
            <IoIosArrowBack className="text-4xl" />
          </button>
        </div>

        <div className="flex flex-col gap-5 bg-white border-4 rounded-md p-10 text-xl">
          <div className="flex items-center gap-3">
            <svg
              width="38"
              height="38"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 44C23.4348 44 24.6106 42.9449 24.8098 41.4516C26.7825 28.152 28.5959 26.3005 41.3896 24.8471C42.8641 24.6679 44 23.4336 44 22.0001C44 20.5466 42.8841 19.3521 41.4094 19.1331C28.6956 17.3611 27.1215 15.8082 24.8098 2.52862C24.5507 1.05529 23.4148 0 22 0C20.5454 0 19.3894 1.05529 19.1504 2.54842C17.2175 15.8282 15.4041 17.6797 2.63041 19.1331C1.11591 19.3323 0 20.5268 0 22.0001C0 23.4336 1.07607 24.6281 2.59057 24.8471C15.3242 26.6589 16.8785 28.1918 19.1504 41.4716C19.4493 42.9647 20.605 44 22 44Z"
                fill="#0C0C0C"
              />
            </svg>
            <h1 className="text-4xl font-bold ">{portfolio.title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <svg
              width="32"
              height="32"
              viewBox="0 0 44 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 44C23.4348 44 24.6106 42.9449 24.8098 41.4516C26.7825 28.152 28.5959 26.3005 41.3896 24.8471C42.8641 24.6679 44 23.4336 44 22.0001C44 20.5466 42.8841 19.3521 41.4094 19.1331C28.6956 17.3611 27.1215 15.8082 24.8098 2.52862C24.5507 1.05529 23.4148 0 22 0C20.5454 0 19.3894 1.05529 19.1504 2.54842C17.2175 15.8282 15.4041 17.6797 2.63041 19.1331C1.11591 19.3323 0 20.5268 0 22.0001C0 23.4336 1.07607 24.6281 2.59057 24.8471C15.3242 26.6589 16.8785 28.1918 19.1504 41.4716C19.4493 42.9647 20.605 44 22 44Z"
                fill="#0C0C0C"
              />
            </svg>
            <div dangerouslySetInnerHTML={{ __html: portfolio.content }} />
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
    </>
  );
}
