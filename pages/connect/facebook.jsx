import React, { Component, useEffect } from "react";
import axios from "axios";
import authService from "../../services/authService";
import { useRouter } from "next/router";

const MyClassWithRouter = (props) => {
  const router = useRouter();

  useEffect(() => {
    console.log(router);
    if (Object.keys(router.query).length > 0) {
      const name = Object.keys(router.query)[0];
      const value = router.query.code;
      console.log(name, value);

      const search = `?${name}=${value}`;

      axios
        .get(`http://localhost:1337/auth/facebook/callback${search}`)
        .then((response) => {
          // Handle success.
          console.log(response);
          console.log("Well done!");
          console.log("User profile", response.data.user);
          console.log("User token", response.data.jwt);
          authService.setToken(response.data.jwt);
          window.location = "/";
        });
    }
  }, [router]);

  return <div>Redirecting you...</div>;
};
export default MyClassWithRouter;

// class FBConnect extends Component {
//   componentDidUpdate() {
//     console.log("update", this.props.router);
//     console.log(Object.keys(this.props.router.query).length);

//     if (Object.keys(this.props.router.query).length > 0) {
//       const name = Object.keys(this.props.router.query)[0];
//       const value = this.props.router.query.code;
//       console.log(name, value);
//     }
//   }
//   componentDidMount() {
//     console.log("mount", this.props.router);

// try {
//   console.log(action, action.search);
//   const requestURL = `http://localhost:1337/auth/${action.provider}/callback${action.search}`;
//   const response = yield call(request, requestURL, { method: "GET" });

//   if (response.jwt) {
// 	// Set the user's credentials
// 	yield all([
// 	  call(auth.setToken, response.jwt, true),
// 	  call(auth.setUserInfo, response.user, true),
// 	]);
// 	yield call(forwardTo, "/");
//   }
// } catch (error) {
//   yield call(forwardTo, "/auth/login");
// }

// const search = this.props.location.search; // could be '?foo=bar'
// const params = new URLSearchParams(search);
// const accessToken = params.get("access_token"); // bar
// console.log(accessToken);

// console.log(
// 	`http://localhost:1337/auth/facebook/callback${location.search}`
// );

// axios
//   .get(`http://localhost:1337/auth/facebook/callback${location.search}`)
//   .then((response) => {
//     // Handle success.
//     console.log(response);
//     console.log("Well done!");
//     console.log("User profile", response.data.user);
//     console.log("User token", response.data.jwt);
//     authService.setToken(response.data.jwt);
//     window.location = "/";
//   });
//   }
//   render() {
//     return <div>Redirecting you... (nog stylen in FBConnect)</div>;
//   }
// }
