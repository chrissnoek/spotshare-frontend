import React, { useState, useEffect } from "react";

const CategorieFilter = ({ categories, active, onFilterChange }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    if (active) console.log(active) && setValue(active);

    const _filteredCategories = categories.reduce((newCats, categoryArr) => {
      categoryArr.map((category) => {
        const duplicateArr = newCats.filter((index) => {
          return index.label === category.label;
        });

        if (duplicateArr.length === 0) {
          newCats.push(category);
        }

        return newCats;
      });
      return newCats;
    }, []);

    setFilteredCategories(_filteredCategories);
  }, []);

  const onChange = (e) => {
    setValue(e.target.value);
    if (e.target.value === "alle") {
      onFilterChange(e, true);
    } else {
      onFilterChange(e, false);
    }
  };

  return (
    <div>
      <select
        value={value}
        onChange={onChange}
        name="category"
        id="category"
        className="border p-1"
      >
        <option value="alle">Alle</option>
        {filteredCategories.map((category) => {
          return (
            <option key={category.id} value={category.value}>
              {category.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CategorieFilter;
