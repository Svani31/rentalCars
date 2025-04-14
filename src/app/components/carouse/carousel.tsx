"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface User {
  id: number;
  name: string;
  city: string;
  status: string;
  image: string;
  rating: number;
}

const users: User[] = [
  {
    id: 1,
    name: "Giorgi",
    city: "Tbilisi",
    status: "Online",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.8,
  },
  {
    id: 2,
    name: "Mariam",
    city: "Batumi",
    status: "2 min ago",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.5,
  },
  {
    id: 3,
    name: "Nika",
    city: "Kutaisi",
    status: "5 min ago",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.9,
  },
  {
    id: 4,
    name: "Giorgi",
    city: "Tbilisi",
    status: "Online",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Mariam",
    city: "Batumi",
    status: "2 min ago",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.5,
  },
  {
    id: 6,
    name: "Nika",
    city: "Kutaisi",
    status: "5 min ago",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.9,
  },
  {
    id: 7,
    name: "Giorgi",
    city: "Tbilisi",
    status: "Online",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Mariam",
    city: "Batumi",
    status: "2 min ago",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.5,
  },
  {
    id: 9,
    name: "Nika",
    city: "Kutaisi",
    status: "5 min ago",
    image:
      "https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg",
    rating: 4.9,
  },
  // ... (other user objects remain the same)
];

export default function UserCarousel() {
  return (
    <div className=" px-4 py-8 md:px-6 md:py-12 lg:max-w-7xl lg:mx-auto">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          375: {
            slidesPerView: 1.2,
            spaceBetween: 15,
          },
          480: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 25,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          1536: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
        }}
        className="relative"
      >
        {users.map((user) => (
          <SwiperSlide key={user.id} className="pb-12">
            <div className="relative h-full bg-gradient-to-br from-pink-dark to-pink-dark2 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-dark/50 mx-auto max-w-xs">
              {/* Page Image */}
              <div className="relative h-48 w-full">
                <img
                  src={user.image}
                  alt={user.name}
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Online Status */}
                <div
                  className={`absolute top-3 right-3 w-3 h-3 rounded-full ${
                    user.status === "Online" ? "bg-green-400" : "bg-gray-400"
                  } ring-2 ring-white`}
                />
              </div>

              {/* Page Info */}
              <div className="p-6 text-center">
                <div className="flex justify-center items-center space-x-2 mb-2">
                  <h2 className="text-xl font-bold text-white">{user.name}</h2>
                  <span className="text-yellow-300 text-sm">
                    ★ {user.rating}
                  </span>
                </div>

                <div className="flex justify-center items-center space-x-2 mb-4">
                  <svg
                    className="w-4 h-4 text-pink-light2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-pink-light2">{user.city}</span>
                </div>

                <div className="text-sm text-pink-light2">
                  {user.status === "Online" ? (
                    <span className="flex items-center justify-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2" />
                      Online now
                    </span>
                  ) : (
                    `Last seen ${user.status}`
                  )}
                </div>

                <button className="mt-6 w-full py-2 bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300">
                  View Profile
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev hidden md:flex after:text-pink-dark2 after:text-2xl"></div>
        <div className="swiper-button-next hidden md:flex after:text-pink-dark2 after:text-2xl"></div>
      </Swiper>

      {/* Custom styles */}
      <style jsx global>{`
        .swiper {
          padding: 0 10px 40px !important;
        }
        .swiper-pagination {
          bottom: 10px !important;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.5;
          width: 10px;
          height: 10px;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #ec7fa9;
          opacity: 1;
          transform: scale(1.2);
        }
        .swiper-button-next,
        .swiper-button-prev {
          background: rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(5px);
          width: 44px;
          height: 44px;
          border-radius: 50%;
          transition: all 0.3s;
        }
        .swiper-button-next:hover,
        .swiper-button-prev:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 1.5rem;
          font-weight: bold;
        }
        @media (max-width: 768px) {
          .swiper-button-next,
          .swiper-button-prev {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
