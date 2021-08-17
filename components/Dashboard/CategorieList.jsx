import React from "react";
import Link from "next/link";
import NavigateToMapPage from "../shared/navigateToMap";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

const CategorieList = ({ categories }) => {
  return (
    <div className="mb-2">
      <h2 className="text-black mb-2">Zoek locatie op categorie</h2>

      <div className=" md:hidden">

        <Swiper
          spaceBetween={0}
          slidesPerView={'auto'}
          watchSlidesVisibility={true}
        >
          {categories &&
            categories
              .filter((categorie) => categorie.value != "")
              .map((categorie) => (
                <SwiperSlide><CategorieLabel categorie={categorie} key={categorie.value} /></SwiperSlide>
              ))}
        </Swiper>
      </div>

      <div className="hidden md:flex flex-wrap">
        {categories &&
          categories
            .filter((categorie) => categorie.value != "")
            .map((categorie) => (
              <CategorieLabel categorie={categorie} key={categorie.value} />
            ))}
      </div>

    </div>
  );
};

export default CategorieList;

const CategorieLabel = ({ categorie: { label, value } }) => {
  return (
    <NavigateToMapPage href={`/fotolocaties/categorie/${value}`} classnames="inline-block w-auto py-2 px-4 rounded-full mr-2 mb-2 bg-green-100 text-green-400 font-bold hover:bg-green-200 hover:text-green-500">
      {label}
    </NavigateToMapPage>
  );
};
