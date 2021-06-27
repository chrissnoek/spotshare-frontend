import graphQLFetch from "../graphQLFetch";
import jwtDecode from "jwt-decode";
import axios from "axios";

const tokenKey = "token";

export async function register(input) {
  if (typeof window === "undefined") {
    return;
  }
  const query = `mutation register($input: UsersPermissionsRegisterInput!) {
            register(input: $input) {
                jwt
                user {
                  id
                  email
                  username
                  slug
                }
            }
          } `;

  const result = await graphQLFetch(query, input, true, true);
  console.log(result);
  if (!result.errors) {
    // user registered and getting JWT token!
    const {
      register: { jwt },
    } = result;
    localStorage.setItem(tokenKey, jwt);
    return true;
  } else {
    return result.errors[0];
  }
}

export function setToken(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export async function login(input) {
  if (typeof window === "undefined") {
    return;
  }

  console.log(input);

  // const query = `mutation login($input: UsersPermissionsLoginInput!) {
  //           login(input: $input) {
  //             jwt
  //             user {
  //               id
  //               email
  // 			username
  //             }
  //           }
  //         } `;

  //const result = await graphQLFetch(query, { input }, true, true);
  //console.log(result);

  try {
    const response = await axios.post("http://localhost:1337/auth/local", {
      identifier: input.identifier,
      password: input.password,
    });
    console.log("Well done!");
    console.log("User profile", response.data.user);
    console.log("User token", response.data.jwt);

    localStorage.setItem(tokenKey, response.data.jwt);
    return true;
  } catch (err) {
    // Handle Error Here
    console.log("An error occurred:", err);
    return err;
  }

  // console.log(result);
  // if (!result.errors) {
  //   // user registered and getting JWT token!
  //   const {
  //     login: { jwt },
  //   } = result;
  //   localStorage.setItem(tokenKey, jwt);
  //   return true;
  // } else {
  //   return result.errors[0];
  // }
}

export function logout() {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.removeItem(tokenKey);
}

export async function checkAvailability(type, value) {
  const query = `query checkAvailability($${type}:String!){
    users( where: { ${type}: $${type} }) {
      ${type}
    }
  } `;

  console.log(query, type, value);

  if (!value) return;

  const result = await graphQLFetch(query, value, true, true);
  console.log(result);
  console.log(result.users.length);
  if (result.users.length > 0) {
    return false;
  } else {
    return true;
  }
}

export async function getCurrentUser() {
  if (typeof window === "undefined") {
    return;
  }
  try {
    const jwt = localStorage.getItem(tokenKey);
    if (!jwt) return null;
    console.log("jwt", jwt);
    const userId = jwtDecode(jwt).id;

    const query = `query getUser($id:ID!) {
            user(id: $id) {
                id
                email
                username
                slug
                firstname
                lastname
                location
                profilePicture {
                  url
                }
                city
                fb_page
                website
                insta_page
                receivedNotifications {
                  id
                  photo {
                    title
                    id
                    slug
                  }
                  action
                  giver {
                    id
                    firstname
                    lastname
                    slug
                    username
                    profilePicture {
                      url
                    }
                  }
                }
                followings {
                  id
                }
                favouriteLocations {
                  id
                }
                likedPhotos {
                  id
                }
                photos {
                id
                }
            }
            } `;

    const result = await graphQLFetch(query, { id: userId }, true, true);
    console.log(result);
    if (result) {
      return result.user;
    }
  } catch (ex) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
  register,
  setToken,
  checkAvailability,
};
