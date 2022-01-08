import React from "react";
import { PokemonQueryResult } from "@/pages/results";
import Image from "next/image";

const PokemonDetailsModal: React.FC<{
  open: boolean;
  onClose: () => void;
  pokemon?: PokemonQueryResult[number];
}> = ({ open, onClose, pokemon }) => {
  if (!open || !pokemon) return null;
  return (
    <>
      <div
        className="opacity-25 fixed inset-0 z-40 bg-black opacity-70"
        onClick={() => onClose()}
      />
      <div className="fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%]  bg-gray-700 w-1/6 max-w-lg rounded-l-md p-4 z-40 text-gray-400">
        <span className="float-right rotate-45" onClick={() => onClose()}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="hover:animate-spin h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </span>
        <div className="flex flex-col items-center">
          <Image
            width={128}
            height={128}
            layout={"fixed"}
            src={pokemon.spriteUrl}
            alt={pokemon.name}
          />

          <div className="capitalize">{pokemon.name}</div>
          <div className="p-4" />
          <div className="flex justify-between w-1/2 items-center">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              <div className="p-1.5"> {pokemon._count.votedFor}</div>
            </div>
            <div className="m-2 text-sm text-gray-600">Vs</div>
            <div>
              <div className="flex items-center">
                <div className="p-1.5 text-lg">
                  {pokemon._count.votedAgainst}
                </div>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonDetailsModal;
