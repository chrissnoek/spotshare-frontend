/* globals React */
/* eslint "react/jsx-no-undef":"off" */

import React from "react";
import graphQLFetch from "../../graphQLFetch";
import { Map, TileLayer, Marker, Popup } from "react-leaflet-universal";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { BsPencil } from "react-icons/bs";
import FavButton from "../../components/shared/favButton.jsx";
import { userContext } from "../../services/userContext.js";
import PhotoView from "../../components/shared/PhotoView.jsx";
import { useRouter } from "next/router";
import Head from "next/head"
import UserProfilePicture from "../../components/shared/UserProfilePicture";

const LocationDetailStrapi = (props) => {
	// console.log(props);
	const router = useRouter();

	return (
		<userContext.Consumer>
			{(value) => {
				if (value.user) {
					return (
						<LocationDetailComponentRouter
							curUser={value.user}
							{...props}
							router={router}
						/>
					);
				} else {
					return (
						<LocationDetailComponentRouter
							curUser={null}
							{...props}
							router={router}
						/>
					);
				}
			}}
		</userContext.Consumer>
	);
};

export default LocationDetailStrapi;

class LocationDetailComponent extends React.Component {
	constructor(props) {
		super(props);

		const locationBySlug = props.locationBySlug;

		this.state = {
			isServer: true,
			userLikedLocation: false,
			locationBySlug,
			redirect: false,
			zoom: 13,
			userLocationKnown: false,
			userMarker: null,
			userLocation: {
				longitude: null,
				latitude: null,
			},
		};
	}

	componentDidUpdate(prevProps) {
		if (this.state.locationBySlug !== this.props.locationBySlug) {
			this.setState({ locationBySlug: this.props.locationBySlug });
		}

		const { curUser: prevCurUser } = prevProps;
		const { curUser } = this.props;
		const { locationBySlug, isServer } = this.state;

		if (!isServer && curUser != null && prevCurUser !== curUser) {

			if (
				locationBySlug.usersFavourites.filter(
					(favourites) => favourites.id === curUser.id
				).length > 0
			) {
				// check if user alreay liked the location
				this.setState({ userLikedLocation: true });
			}
		}
	}

	componentDidMount() {
		// loading leaflet in componentDidMount because it doenst support SSR
		const L = require("leaflet");

		const userMarker = new L.Icon({
			iconUrl: "/images/userMarker.svg",
			iconRetinaUrl: "/images/userMarker.svg",

			iconAnchor: [16, 40],
			popupAnchor: [0, -40],
			shadowUrl: "/images/marker-shadow.png",
			shadowAnchor: [13, 40],
			iconSize: new L.Point(32, 40),
		});

		delete L.Icon.Default.prototype._getIconUrl;

		L.Icon.Default.mergeOptions({
			iconUrl: "/images/locationMarker.svg",
			iconRetinaUrl: "/images/locationMarker.svg",
			iconAnchor: [16, 40],
			popupAnchor: [0, -40],
			shadowUrl: "/images/marker-shadow.png",
			shadowAnchor: [13, 40],
			iconSize: new L.Point(32, 40),
		});

		// get users position
		var options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0,
		};

		const success = (pos) => {
			var crd = pos.coords;

			this.setState((prevState) => ({
				...prevState,
				userMarker,
				userLocationKnown: true,
				userLocation: { longitude: crd.longitude, latitude: crd.latitude },
			}));
		};

		const error = (err) => {
			console.warn(`ERROR(${err.code}): ${err.message}`);

			fetch("https://ipapi.co/json")
				.then((res) => res.json())
				.then((location) => {
					this.setState((prevState) => ({
						...prevState,
						userMarker,
						userLocationKnown: true,
						userLocation: {
							longitude: location.longitude,
							latitude: location.latitude,
						},
					}));
				});
		};

		navigator.geolocation.getCurrentPosition(success, error, options);
	}

	async loadData() {
		// get the search query string form url
		const { match } = this.props;
		// provide the query with the variables
		const data = await LocationDetailComponent.fetchData(match);
		// console.log(data);
		if (data.locationBySlug != null) {
			this.setState({ locationBySlug: data.locationBySlug, isServer: false });
		} else {
			// console.log("return not found");
			this.setState({ redirect: true });
			// console.log(this.state);
		}
	}

	updateFav = async (user, likedId, action) => {
		const query = `
			mutation updateUser($input:updateUserInput) {
				updateUser(input: $input) {
					user {
						favouriteLocations {
							id
						}
					}
				}
			}`;

		let favArray = user.favouriteLocations.map((fav) => fav.id);

		if (action === "add") {
			if (!favArray.includes(likedId)) {
				favArray.push(likedId);
			} else {
				// already in favourites
				return;
			}
		} else if (action === "remove") {
			if (favArray.includes(likedId)) {
				// likedId is in array, so remove it from array
				const index = favArray.indexOf(likedId);
				if (index > -1) {
					favArray.splice(index, 1);
				}
				// console.log(favArray);
			} else {
				// not in favourites
				return;
			}
		}

		const variables = {
			input: {
				where: {
					id: user.id,
				},
				data: {
					favouriteLocations: favArray,
				},
			},
		};

		const data = await graphQLFetch(query, variables, true);

		let status = this.state.userLikedLocation;
		this.setState({ userLikedLocation: !status });
	};

	render() {
		const { locationBySlug, redirect, isServer } = this.state;
		if (redirect) {
			// console.log("redirect", redirect);
			this.props.router.push("/niet-gevonden");
		}
		if (locationBySlug === null) return null;

		const { userLocation, userLocationKnown, userMarker } = this.state;
		const { photos } = locationBySlug;

		const position = [locationBySlug.latitude, locationBySlug.longitude];
		const calculatedUserLocation = userLocation.latitude
			? [userLocation.latitude, userLocation.longitude]
			: null;

		let featuredPhoto = photos
			.sort((a, b) => b.likes - a.likes)[0];
		let featuredPhotoOne = photos
			.sort((a, b) => b.likes - a.likes)[1];
		let featuredPhotoTwo = photos
			.sort((a, b) => b.likes - a.likes)[2];
		let featuredPhotoThree = photos
			.sort((a, b) => b.likes - a.likes)[3];

		const featuredPhotos = [];
		if(featuredPhoto) featuredPhotos.push(featuredPhoto);
		if(featuredPhotoOne) featuredPhotos.push(featuredPhotoOne);
		if(featuredPhotoTwo) featuredPhotos.push(featuredPhotoTwo);
		if(featuredPhotoThree) featuredPhotos.push(featuredPhotoThree);

		const imageUrl = (photo) => {
			let url = '';

			if (photo.photo[0].formats) {
				if (photo.photo[0].formats.large) {
					url = photo.photo[0].formats.large.url;
				} else {
					url = photo.photo[0].url;
				}
			} else {
				url = photo.photo[0].url;
			}
			return url;
		}

		let photographers = locationBySlug.photos.map((photo) => photo.user);
		photographers = photographers.filter((thing, index, self) =>
		index === self.findIndex((t) => (
			t.id === thing.id
		))
	)

	let rowHeight = '';
	if(featuredPhotos.length === 2) {
		rowHeight = 'h-full'
	} else if(featuredPhotos.length === 3) {
		rowHeight = 'h-1/2'
	} else if(featuredPhotos.length === 4) {
		rowHeight = 'h-1/3'
	}
		

	if (photos.length > 0) {

		return (
			<>
			<div id="page" className="p-6">
				<Head>

					{/* <!-- Primary Meta Tags --> */}
					<title key="title">Fotolocatie {locationBySlug.title} | Spotshare</title>
					<meta
						name="title"
						key="meta_title"
						content={`Fotolocatie ${locationBySlug.title} | Spotshare`}
					/>
					<meta
						name="description"
						key="meta_desc"
						content={`Leer hoe, wanneer en waar je de beste foto's van ${locationBySlug.title} maakt bij Spotshare.`}
					/>
					{/* <!-- Open Graph / Facebook --> */}
					<meta
						property="og:title"
						key="og_title"
						content={`Fotolocatie ${locationBySlug.title} | Spotshare`}
					/>
					<meta
						property="og:description"
						key="og_desc"
						content={`Leer hoe, wanneer en waar je de beste foto's van ${locationBySlug.title} maakt bij Spotshare.`}
					/>

					{photos.length > 0 &&
						<meta property="og:image"
							key="og_img" content={imageUrl} />}

					{/* <!-- Twitter --> */}
					<meta
						property="twitter:title"
						key="twitter_title"
						content={`Fotolocatie ${locationBySlug.title} | Spotshare`}
					/>
					<meta
						property="twitter:description"
						key="twitter_desc"
						content={`Leer hoe, wanneer en waar je de beste foto's van ${locationBySlug.title} maakt bij Spotshare.`}
					/>
					{photos.length > 0 &&
						<meta property="twitter:image"
							key="twitter_img" content={imageUrl} />}
				</Head>

				<Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}>
					<a className="revealTooltip pencil fixed bottom-4 right-4 p-4 rounded-full bg-green-500 hover:bg-green-600 text-white flex justify-center items-center">
						<div className="hidden mr-2">
							Informatie verbeteren
						</div>
						<div className="inline-block text-3xl">
							<BsPencil />
						</div>
					</a>
				</Link>

				<div className="md:flex md:items-center mb-6 md:mb-0">
					<div className="mb-8 mt-16">
			<h1 className=" text-5xl font-bold text-gray-900 block">
				{locationBySlug.title}
			</h1>

			{locationBySlug.location_categories.length > 0 &&
				<span className="flex items-center">
					{locationBySlug.location_categories.map((location) => (
						<Link href={`/fotolocaties/categorie/${location.value}`}>
							<a className="text-green-500  mr-2  hover:bg-text-600 cursor-pointer">
							#{location.label}
							</a>
						</Link>
					))}
				</span>
				}

				<div className="flex items-center mt-3">
					<div className="mr-3">
					Bezoekers:
					</div>
					<div className="flex items-center">
						{photographers.map((visitor) => {
							return (
							<div className="-ml-2">
								<UserProfilePicture size={6} profile={visitor} classNames={'mx-auto border-2 border-white'} />
							</div>
							)}
						)}
					</div>
				</div>
			</div>
			<div className="ml-auto flex items-center">
				<div className="mr-2">
					<userContext.Consumer>
						{(value) => {
							// console.log(value);
							if (value.user) {
							let favourite;
							if (
								value.user &&
								locationBySlug.usersFavourites.filter(
								(favourites) => favourites.id === value.user.id
								).length > 0
							) {
								favourite = true;
							} else {
								favourite = false;
							}
							return (
								<FavButton
								favourite={favourite}
								updateFav={this.updateFav}
								user={value.user}
								likedId={locationBySlug.id}
								addTitle="Deze locatie opslaan"
								removeTitle="Verwijderen uit opgeslagen locaties"
								/>
							);
							}
						}}
						</userContext.Consumer>
					</div>
					<div>
						<Link href={`/foto/toevoegen/${locationBySlug.id}`}>
							<a className="text-sm py-2 px-3 mr-2 rounded-full flex pointer bg-green-500 hover:bg-green-600 text-white justify-end items-center relative">
								<div className="mr-2">
									<FaPlus />
								</div>
								<span>Foto toevoegen</span>
							</a>
						</Link>
					</div>
					<a className="text-sm py-2 px-3 rounded-full flex pointer bg-blue-500 hover:bg-blue-600 text-white justify-end items-center relative" href={`https://www.google.com/maps/search/?api=1&query=${locationBySlug.latitude},${locationBySlug.longitude}`} target="_blank">Openen in Google Maps</a>
				</div>
			</div>

			<div id="photoInfo">

				<div className="flex max-h-screen-80vh ">
					<div className={` mr-4  ${featuredPhotos.length === 1 ? 'w-full' : 'w-2/3'}`}>
						<img className={`rounded object-cover  w-full h-full ` } src={imageUrl(featuredPhoto)} />
					</div>
					{featuredPhotos.length > 1 &&
						<div className="flex flex-col w-1/3 max-h-screen">
							{featuredPhotoOne && <div className={`${rowHeight} ${featuredPhotos.length >= 3 &&  'pb-4'}`}>
								<img className="rounded object-cover  w-full h-full" src={imageUrl(featuredPhotoOne)} />
							</div>}
							{featuredPhotoTwo && 
							<div className={`${rowHeight} ${featuredPhotos.length === 4 &&  'pb-4'}`}>
								<img className="rounded object-cover  w-full h-full" src={imageUrl(featuredPhotoTwo)} />
							</div>}
							{featuredPhotoThree && 
							<div className={rowHeight}>
								<img className="rounded object-cover w-full h-full " src={imageUrl(featuredPhotoThree)} />
							</div>}
						</div>
					}
				</div>

				<div className="  py-6 ">
					<section className="container">
						<div className="sm:py-10">
							<div className="block sm:flex">
								<div className="pb-4 mr-4 w-full">
									<h2 className="h1">
										Over fotolocatie {locationBySlug.title}
									</h2>
									<p className="">{locationBySlug.desc ? <div> {locationBySlug.desc} <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link></div> : <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}>
										<a className=" flex  items-center">
											<div className=" mr-2">
												Informatie aanvullen
											</div>
											<div className="">
												<BsPencil />
											</div>
										</a>
									</Link>}</p>
								</div>
								<div className="pb-4 w-full">
									<h3>Hoe kom ik bij {locationBySlug.title}</h3>
									<p className="">{locationBySlug.directions ? <div> {locationBySlug.directions} <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link></div> : <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}>
										<a className=" flex  items-center">
											<div className=" mr-2">
												Informatie aanvullen
											</div>
											<div className="">
												<BsPencil />
											</div>
										</a>
									</Link>}</p>
								</div>
							</div>
							<div className="block sm:flex">
								<div className="pb-4 mr-4 w-full">
									<h3>Wat kan ik fotograferen?</h3>
									<p className="">{locationBySlug.whattoshoot ? <div> {locationBySlug.whattoshoot} <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link></div> : <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}>
										<a className=" flex  items-center">
											<div className=" mr-2">
												Informatie aanvullen
											</div>
											<div className="">
												<BsPencil />
											</div>
										</a>
									</Link>}</p>
								</div>
								<div className="pb-4 w-full">
									<h3>Beste tijd om te fotograferen?</h3>
									{locationBySlug.months.length > 0 ? <div> {locationBySlug.months.map((month) => (
										<p className="mr-1 inline-block">{month.label}</p>
									))} <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}><a className="inline-block"><BsPencil /></a></Link></div> : <Link href={`/fotolocatie/bewerken/${locationBySlug.slug}`}>
										<a className=" flex  items-center">
											<div className=" mr-2">
												Informatie aanvullen
											</div>
											<div className="">
												<BsPencil />
											</div>
										</a>
									</Link>}
								</div>
							</div>
						</div>

						<div className="w-full">
							<Map
								className="map"
								id="photoLocation"
								center={position}
								zoom={this.state.zoom}
							>
								<TileLayer
									attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
									url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
								/>
								<Marker position={position}>
									<Popup>Foto locatie</Popup>
								</Marker>
								{userLocationKnown && (
									<Marker position={calculatedUserLocation} icon={userMarker}>
										<Popup>Jouw locatie</Popup>
									</Marker>
								)}
							</Map>
						</div>

						<div className="w-full mt-4">
							<h2 className="text-xl font-bold mb-1 text-gray-800 block">
								Foto's gemaakt op fotolocatie {locationBySlug.title}
							</h2>
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
								{photos.map((photoItem, index) => {
									return (
										<PhotoView
											key={photoItem.id}
											index={index}
											photo={photoItem}
											deletePhoto={null}
										/>
									);
								})}
							</div>
						</div>
					</section>
				</div>
			</div>
		</div>
		</>
		);

		} else {
			return null;
		}
	}
}

function LocationPhotoItem(props) {
	const itemPhoto = props.item.photo[0];
		const selectedLocation = `/foto/${props.item.slug}`;
		return (
			<React.Fragment>
				<div className="w-full inline-block md:w-1/2 lg:w-1/3 p-2">
					<div className="photoCard rounded relative shadow-xs">
						<div className="relative rounded overflow-hidden">
							<NavLink
								to={selectedLocation}
								className="absolute w-full h-full z-10"
								title="Bekijk foto nu"
							></NavLink>
							<img
								src={itemPhoto.url.replace("-original", "-thumbnail")}
								className="object-cover  w-full h-48  block"
								alt="Foto"
							/>

							<div className="photoContent p-4 absolute bottom-0 left-0">
								<div className="photoInfo">
									<h3 className="text-white">{props.item.title}</h3>
								</div>
								<div className="clear"></div>
							</div>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
}

const LocationDetailComponentRouter = LocationDetailComponent;

// export async function getStaticPaths() {
//   // build the graphql query
//   const query = `
//         query {
//             locations {
//                 slug
//             }
//         }
//     `;

//   const vars = {};
//   const result = await graphQLFetch(query, vars, true);
//   // console.log("urls", result);

//   const paths = result.locations.map((location) => ({
//     params: { slug: location.slug },
//   }));

//   return { paths, fallback: false };
// }

export async function getServerSideProps({ params }) {
	// build the graphql query
	const query = `query locationBySlug($slug: String!){
		locationBySlug(slug: $slug) {
				title
				location_categories {
					id
					label
					value
				}
				photos(where:{user_null:false}) {
						likes
						id
						location {
							longitude
							latitude
							id
							title
							slug
						}
						title
						slug
						user {
							id
							firstname
							lastname
				profilePicture {
				url
				formats
				}

						}
						photo {
								id
								formats
								url
						}
				}
				desc
				slug
				id
				longitude
				latitude
				directions
				whattoshoot
				months {
					label
					value
				}
				usersFavourites {
					id
				}
		}
}`;

	const { slug } = params;

	const result = await graphQLFetch(query, { slug }, true);
	// console.log("result", result);

	return {
		props: {
			locationBySlug: result.locationBySlug,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every second
		// revalidate: 60, // In seconds
	};
}
