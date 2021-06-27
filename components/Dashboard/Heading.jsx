import React, { useState, useEffect } from "react";
import { userContext } from "../../services/userContext";
import SearchBox from "./SearchBox.jsx";

const Heading = (props) => {
  const [greeting, setGreeting] = useState();

  useEffect(() => {
    var myDate = new Date();
    var hrs = myDate.getHours();

    if (hrs < 12) setGreeting("Goedemorgen");
    else if (hrs >= 12 && hrs <= 17) setGreeting("Goedemiddag");
    else if (hrs >= 17 && hrs <= 24) setGreeting("Goedenavond");
  }, []);

  const personalHeading = (name) => (
    <h1 className="mb-4 text-white">
      <div className="text-3xl mb-4">
        {greeting} {name}!
      </div>
      <div>
        Zoek je volgende <span className="text-green-500">fotolocatie</span>.
      </div>
    </h1>
  );

  return (
    <div className="">
      <div className="pb-8 pt-6  text-center rounded bg-gray-900 mb-6">
        <userContext.Consumer>
          {(value) =>
            !value.user ? (
              <h1 className="mb-4 text-white">
                De mooiste fotolocaties, gewoon bij jou in de buurt.
              </h1>
            ) : (
              personalHeading(
                value.user.firstname
                  ? value.user.firstname
                  : value.user.username
              )
            )
          }
        </userContext.Consumer>

        <SearchBox redirect={props.redirect} />
      </div>
    </div>
  );
};

export default Heading;
