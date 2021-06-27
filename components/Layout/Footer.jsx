import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="bg-gray-900 py-12">
          <div className="container px-6 m-auto text-gray-800 block sm:flex justify-center">
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Fotolocaties op provincie
              </div>
              <Link href="/fotolocaties/noord-holland">
                <a className="my-3 block text-white">
                  Noord-Holland{" "}
                  <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/zuid-holland">
                <a className="my-3 block text-white">
                  Zuid-Holland{" "}
                  <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/utrecht">
                <a className="my-3 block text-white">
                  Utrecht <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/zeeland">
                <a className="my-3 block text-white">
                  Zeeland <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/flevoland">
                <a className="my-3 block text-white">
                  Flevoland <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/noord-brabant">
                <a className="my-3 block text-white">
                  Noord-Brabant{" "}
                  <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
            </div>
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Fotolocaties op provincie
              </div>
              <Link href="/fotolocaties/limburg">
                <a className="my-3 block text-white">
                  Limburg <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/overijssel">
                <a className="my-3 block text-white">
                  Overijssel <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/gelderland">
                <a className="my-3 block text-white">
                  Gelderland <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/drenthe">
                <a className="my-3 block text-white">
                  Drenthe <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/groningen">
                <a className="my-3 block text-white">
                  Groningen <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/fotolocaties/friesland">
                <a className="my-3 block text-white">
                  Friesland <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
            </div>
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Gebruiker
              </div>
              <Link href="/inloggen">
                <a className="my-3 block text-white">
                  Inloggen
                  <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
              <Link href="/aanmelden">
                <a className="my-3 block text-white">
                  Aanmelden
                  <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
            </div>
            <div className="w-full ">
              <div className="text-xs uppercase text-gray-500 font-medium">
                Spotshare
              </div>
              <a
                className="my-3 block text-white"
                href="https://www.spotshare.nl/blog/"
              >
                Blog <span className="text-teal-600 text-xs p-1"></span>
              </a>
              <Link href="/gebruikersvoorwaarden">
                <a className="my-3 block text-white">
                  Gebruikers voorwaarden{" "}
                  <span className="text-teal-600 text-xs p-1"></span>
                </a>
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 pt-2 ">
          <div
            className="flex pb-5 px-6 m-auto pt-5 border-t text-white text-sm flex-col
      md:flex-row container"
          >
            <div className="mt-2">© Copyright 2020. All Rights Reserved.</div>
            <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
              <div className="w-full ml-auto">
                <p>Volg de laatste locaties en trends op onze social media!</p>

                <a
                  className="my-3 block text-white"
                  href="https://www.spotshare.nl/blog/"
                >
                  <svg
                    className="fill-current cursor-pointer text-gray-500 hover:text-gray-400"
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                  >
                    <path
                      id="Facebook"
                      d="M24,12c0,6.627 -5.373,12 -12,12c-6.627,0 -12,-5.373 -12,-12c0,-6.627
                  5.373,-12 12,-12c6.627,0 12,5.373
                  12,12Zm-11.278,0l1.294,0l0.172,-1.617l-1.466,0l0.002,-0.808c0,-0.422
                  0.04,-0.648 0.646,-0.648l0.809,0l0,-1.616l-1.295,0c-1.555,0 -2.103,0.784
                  -2.103,2.102l0,0.97l-0.969,0l0,1.617l0.969,0l0,4.689l1.941,0l0,-4.689Z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
