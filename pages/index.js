import React from "react";
import Head from "next/head";
import Link from "next/link";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import graphQLFetch from "../graphQLFetch.js";
import UserProfilePicture from "../components/shared/UserProfilePicture";
import Image from "next/image";
import { userContext } from "../services/userContext";
import { useRouter } from "next/router";

export default function Home(props) {
  const router = useRouter();

  const redirect = (slug) => {
    router.push(slug);
  };
  return (
    <userContext.Consumer>
      {(value) => {
        console.log(value);
        return value.user ? redirect("/dashboard") : <HomeScreen {...props} />;
      }}
    </userContext.Consumer>
  );
}

function HomeScreen({ featuredPhoto, randomPhotos }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="py-12 sm:py-24 bg-gray-900">
        <div className="container mx-auto block sm:flex px-6 items-center">
          <div className="mr-16 w-full mb-4 sm:mb-8">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl mb-4 sm:mb-8 leading-tight">
              De beste fotografie locaties vind je bij SpotShare.
            </h1>
            <Link href="/inloggen">
              <a className="text-white rounded-full border-2 inline-block border-blue-500 transition duration-100 hover:border-blue-700 mr-4 px-4 py-3 sm:px-6 sm:py-4">
                Inloggen
              </a>
            </Link>
            <Link href="/aanmelden">
              <a className="text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block">
                Aanmelden
              </a>
            </Link>
          </div>
          <div className="w-full">
            <div
              className="rounded w-full h-64"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)), url(${featuredPhoto.photo[0].url})`,
                backgroundSize: `cover`,
                backgroundPosition: `center center`,
              }}
            ></div>
            <div className="rounded-full shadow-lg px-1 py-1 sm:px-2 sm:py-2  -mt-6 ml-1 sm:ml-2 lg:ml-6 bg-white text-black inline-block justify-center">
              <div className="flex justify-center items-center">
                <UserProfilePicture profile={featuredPhoto.user} size={8} />
                <span className="text-black mr-2 text-xs">
                  📸 {featuredPhoto.title} door {featuredPhoto.user.firstname}{" "}
                  {featuredPhoto.user.lastname}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12">
        <div className="flex flex-col sm:flex-row items-center ">
          <div className="flex">
            {/* <!-- eerste rij --> */}
            <div className="flex flex-col mr-4 mt-10">
              <div className="w-40 h-80 relative mb-4">
                <Image
                  className="w-full h-full rounded oveflow-hidden"
                  src={randomPhotos[0].photo[0].url.replace(
                    /-original|-watermark/g,
                    "-thumbnail"
                  )}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-40 h-80 relative">
                <Image
                  className="w-full h-full rounded oveflow-hidden"
                  src={randomPhotos[1].photo[0].url.replace(
                    /-original|-watermark/g,
                    "-thumbnail"
                  )}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            {/* <!-- tweede rij --> */}
            <div className="flex flex-col mr-4">
              <div className="w-40 h-80 relative mb-4">
                <Image
                  className=" w-full h-full rounded oveflow-hidden"
                  src={randomPhotos[2].photo[0].url.replace(
                    /-original|-watermark/g,
                    "-thumbnail"
                  )}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="w-40 h-80 relative">
                <Image
                  className="mb-4 w-full h-full rounded oveflow-hidden"
                  src={randomPhotos[3].photo[0].url.replace(
                    /-original|-watermark/g,
                    "-thumbnail"
                  )}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
            {/* <!-- derde rij --> */}
            <div className="flex flex-col mr-4 mt-32">
              <div className="w-40 h-80 relative">
                <Image
                  className="mb-4 w-full h-full rounded oveflow-hidden"
                  src={randomPhotos[5].photo[0].url.replace(
                    /-original|-watermark/g,
                    "-thumbnail"
                  )}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
          <div className="px-6 lg:px-32 ml-auto mb-6 sm:mb-0 order-first sm:order-last">
            <h2 className="text-4xl leading-tight tracking-tight mb-2">
              Vind locaties in de buurt, of juist aan de andere kant van de
              wereld.
            </h2>
            <p className="mb-4">
              Vind gemakkelijk fotografie locaties dichtbij, of verken locaties
              die je op de planning hebt staan.
            </p>
            <Link href="/aanmelden">
              <a className="text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block">
                Locaties zoeken
              </a>
            </Link>
          </div>
        </div>
      </section>

      <section id="instagram" className="py-8 container px-6">
        <div className="block sm:flex items-center">
          <div className="px-6 lg:px-32 mb-6 sm:mb-0 w-full">
            <h2 className="text-4xl leading-tight tracking-tight mb-2">
              Fotografie locatie inspiratie op Instagram
            </h2>
            <p className="mb-4">
              Volg ons op instagram, en maak kans op een feature!
            </p>
            <a
              target="_blank"
              rel="noopener"
              href="https://www.instagram.com/spotsharenl/"
              className="text-white rounded-full bg-blue-500 hover:bg-blue-700 transition duration-100 px-4 py-3 sm:px-6 sm:py-4 inline-block"
            >
              Naar instagram
            </a>
          </div>
          <div className="w-full relative">
            <div className="rounded bg-white border shadow-lg">
              <div className="flex items-center p-3">
                <Image
                  className="rounded-full w-10 h-10 mr-4 border shadow-md"
                  src="/images/spotshare-ig.jpg"
                  alt="Volg spotshare op instagram"
                  width={30}
                  height={30}
                />
                <span className="inline-block font-bold text-black text-sm">
                  Spotshare
                </span>
              </div>
              <Image
                src="/images/spotshare-ig-foto.jpg"
                width={600}
                height={400}
              />
              <div className="items-center p-3">
                <p className="inline-block text-black text-sm">
                  Hofvijver prachtig vastgelegd door Adelheid smitt 😍👌🏻📸 Ook
                  een feature op SpotShare? Voeg jouw fotolocatie toe op onze
                  website! #spotsharenl
                </p>
                <div className="flex items-center mt-3">
                  <div className="flex items-center justify-center mr-2">
                    <FaRegHeart className="mr-1" />
                    150
                  </div>
                  <div className="flex items-center justify-center">
                    <FaRegComment className="mr-1" />
                    20
                  </div>
                </div>
              </div>
            </div>
            <div className="top-0 right-0 -mt-6 sm:-mr-12 absolute rounded bg-white px-4 text-center shadow-2xl py-6">
              <Image
                className="rounded-full w-20 h-20 sm:w-32 sm:h-32 border border-gray-100  m-1 mb-3"
                src="/images/spotshare-ig.jpg"
                alt="Volg spotshare op instagram"
                width={100}
                height={100}
              />
              <h3 className="text-black text-sm">Spotshare</h3>
              <span className="block text-gray-500 text-xs">@spotsharenl</span>
              <a
                target="_blank"
                rel="noopener"
                href="https://www.instagram.com/spotsharenl/"
                className="mt-4 text-white rounded-full bg-blue-500 hover:bg-blue-700 text-xs transition duration-100 px-3 py-2 inline-block"
              >
                Volgen
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="bg-gray-100">
        <div className="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
            Klaar om je vetste locaties te delen?
            <br />
            <span className="text-blue-600">Meld je vandaag nog aan.</span>
          </h2>
          <div className="mt-8 flex lg:flex-shrink-0 lg:mt-0">
            <div className="inline-flex rounded-md shadow">
              <Link href="/aanmelden">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                  Aanmelden
                </a>
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link href="/inloggen">
                <a className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-blue-600 bg-white hover:text-blue-500 focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                  Inloggen
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  const firstID = getRandomInt(15);
  const secondID = getRandomInt(15);
  const thirdID = getRandomInt(15);
  const fourthID = getRandomInt(15);
  const fifthID = getRandomInt(15);
  const sixtID = getRandomInt(15);
  console.log(firstID, secondID, thirdID, fourthID, fifthID, sixtID);

  // build the graphql query
  const query = `query {
    featuredPhoto: photos(where:{featured:1}){
      id
      slug
      title
      photo {
        url
      }
      user {
        id
        username
      firstname
      lastname
        profilePicture {
          url
        }
      }
    }
    randomPhotos: photos(limit:6) {
      id
      slug
      title
      photo {
        url
      }
    }
  }`;

  const result = await graphQLFetch(query, {}, true);
  console.log("result", result);

  return {
    props: {
      featuredPhoto: result.featuredPhoto[0],
      randomPhotos: result.randomPhotos,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 86400, // In seconds
  };
}
