const LocationHashtag = ({ category }) => {
  return (
    <span className="text-white text-left md:text-gray-400 mr-2 text-xs leading-tight  inline-block">
      #{category.label.toLowerCase()}
    </span>
  );
};

export default LocationHashtag;
