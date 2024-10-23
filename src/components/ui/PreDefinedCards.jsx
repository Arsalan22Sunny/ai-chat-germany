/* eslint-disable react/prop-types */
import cn from "../../utils/cn";
import iconClock from "../../assets/images/icons/clock.png";
import iconChat from "../../assets/images/icons/chat.png";
import iconSearch from "../../assets/images/icons/search.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const data = [
  {
    title: "Sparen Sie wertvolle Zeit bei der Rechtsrecherche",
    description:
      "Die Suche nach relevanter Rechtsprechung kann für Juristen eine zeitraubende Herausforderung darstellen. Mit herkömmlichen Methoden dauert die Recherche oft mehrere Stunden oder sogar Tage, was wertvolle Arbeitszeit bindet und den Fokus von wichtigeren Aufgaben ablenkt",
    src: iconClock,
  },
  {
    title: "Optimieren Sie Ihre Rechtsrecherchen mit SANB",
    description:
      "Mit SANB wird der gesamte Rechercheprozess effizienter. Durch den Einsatz moderner KI-Technologien und fortschrittlicher Suchalgorithmen können Juristen ihre Recherchezeit um bis zu 90% reduzieren. SANB automatisiert die Suche nach relevanten Informationen und erleichtert so die Fallbearbeitung erheblich.",
    src: iconChat,
  },
  {
    title: "Schluss mit veralteten Recherchetools",
    description:
      "Viele der etablierten Werkzeuge sind umständlich und fehleranfällig, was den gesamten Rechercheprozess unnötig kompliziert macht. Die Komplexität der Fälle und die eingeschränkte Verfügbarkeit von Informationen machen es schwer, schnell die richtigen Urteile zu finden.",
    src: iconSearch,
  },
];

export const PreDefinedCardMobile = ({ className }) => {
  return (
    <div className={cn("space-y-14 py-14 h-full", className)}>
      {data.map((item, i) =>
        <div key={i}>
          <Link to="/auth/einloggen">
            <div
              className={cn(
                "bg-gray-100 ring-1 ring-gray-900/5 w-full flex-grow rounded-xl sm:rounded-2xl p-4 sm:p-5",
                "relative flex flex-col items-center max-w-sm"
              )}
            >
              <div className="absolute top-0 p-3 bg-gray-100 rounded-full flex justify-center items-center -translate-y-1/2">
                <img
                  src={item.src}
                  alt={item.src}
                  className="size-8 sm:size-12"
                />
              </div>
              <div className="relative">
                <div className="space-y-4 text-base leading-7 text-gray-700">
                  <h2 className="font-bold text-gray-900 text-[1.25rem]">
                    {item.title}
                  </h2>
                  <p className="text-justify">{item.description}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
      <div className="py-1"></div>
    </div>
  );
};

const PreDefinedCard = ({ className }) => {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={12}
      pagination={{
        clickable: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[Pagination, Autoplay]}
      className={cn("preDefinedCards p-3 hidden lg:block", className)}
      breakpoints={{
        640: {
          slidesPerView: 1,
        },
        // 768: {
        //   slidesPerView: 2,
        // },
        1024: {
          slidesPerView: 3,
        },
      }}
    >
      {data.map((item, index) => {
        return (
          <Link to="/auth/einloggen" key={index}>
            <SwiperSlide key={index} className="w-full flex justify-center">
              <div
                className={cn(
                  "bg-gray-100 ring-1 ring-gray-900/5 w-full flex-grow rounded-xl sm:rounded-2xl py-4 px-3 lg:px-4",
                  "relative flex flex-col items-center max-w-sm"
                )}
              >
                <div className="absolute top-0 p-2 xl:p-3 bg-gray-100 rounded-full flex justify-center items-center -translate-y-1/2">
                  <img src={item.src} alt={item.src} className="size-8 sm:size-10" />
                </div>
                <div className="space-y-1 text-base leading-7 text-gray-700 relative">
                  <h2 className="font-bold text-gray-900 text-base">{item.title}</h2>
                  <p className="text-justify">{item.description}</p>
                </div>
              </div>
            </SwiperSlide>
          </Link>
        );
      })}
    </Swiper>
  );
};

export default PreDefinedCard;
