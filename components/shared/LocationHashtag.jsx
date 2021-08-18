const LocationHashtag = ({ category }) => {
  return (
    <span className=" text-left text-gray-300 mr-2 text-xs leading-tight  inline-block">
      #{category.label.toLowerCase()}
    </span>
  );
};

export default LocationHashtag;
