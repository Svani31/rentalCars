"use client";
import React from "react";

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

const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="w-full xs:w-40 sm:w-36 md:w-44 lg:64 bg-gradient-to-br from-pink-dark to-pink-dark2 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-pink-dark/30 mx-1 my-3">
      {/* User Image */}
      <div className="relative aspect-square w-full">
        <img
          src={user.image}
          alt={user.name}
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {/* Online Status */}
        <div
          className={`absolute top-2 right-2 w-2 h-2 rounded-full ${
            user.status === "Online" ? "bg-green-400" : "bg-gray-400"
          } ring-1 ring-white`}
        />
      </div>

      {/* User Info */}
      <div className="p-3 text-center">
        <div className="flex justify-center items-center space-x-1 mb-1">
          <h2 className="text-sm font-bold text-white truncate max-w-[80%]">
            {user.name}
          </h2>
          <span className="text-yellow-300 text-xs">★{user.rating}</span>
        </div>

        <div className="flex justify-center items-center space-x-1 mb-2">
          <svg
            className="w-3 h-3 text-pink-light2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-pink-light2 text-xs truncate max-w-[80%]">
            {user.city}
          </span>
        </div>

        {/* Status */}
        <div className="text-[10px] xs:text-xs text-pink-light2 mb-2">
          {user.status === "Online" ? (
            <span className="flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1" />
              Online
            </span>
          ) : (
            `Seen ${user.status}`
          )}
        </div>

        <button className="w-full py-1 text-xs bg-white/10 backdrop-blur-sm text-white rounded-full border border-white/20 hover:bg-white/20 transition-all duration-200 active:scale-95">
          Profile
        </button>
      </div>
    </div>
  );
};

const UserCardsGrid = () => {
  return (
    <div className="container mx-auto px-3 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 xs:gap-3">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UserCardsGrid;
