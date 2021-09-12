import graphQLFetch from "../graphQLFetch";

const allPhotos = ({photos}) => {

    const getUrl = (photo) => {
        let imageUrl = '';
        console.log(photo);
        if(photo.photo[0].formats) {
            if(photo.photo[0].formats.large) {
                imageUrl = photo.photo[0].formats.large.url;
            }
        }
        else {
            imageUrl = photo.photo[0].url;
        }
        return imageUrl;
    }

    return (
        <div className="container max-w-xl px-4 my-4">
            {photos.reverse().map((photo) => {
                return (<div className="mb-4">
                    <img className="mb-2" src={getUrl(photo)} />
                    <p>{photo.location.title} prachtig vastgelegd door {photo.user.insta_page ? '@'+photo.user.insta_page : photo.user.firstname + ' ' + photo.user.lastname} 😍👌🏻📸 Ook een feature op SpotShare? Voeg jouw fotolocatie toe op onze website! #spotsharenl<br/>
                    •<br/>
                    •<br/>
                    •<br/>
                    •<br/>
                    #discover_earth #ourplanetdaily #igholland #instaholland #ig_discover_holland #wonderful_holland #dutch_connextion #igersholland #bestofthenetherlands #thisisholland #holland_photolovers #loves_netherlands #ig_nederland #fotografie #landschapsfotografie #landschap #fotovandedag #netherlands #nederland #dutchlandscape #holland_photos
                    #mooinederland</p>
                </div>);
            })}
        </div>
    );
};

export default allPhotos;

export async function getServerSideProps() {
    // build the graphql query
    const query = `
    query photos {
        photos(limit:225, sort:"createdAt:desc") {
          date
          id
          title
          location {
              title
          }
          user {
            insta_page
            username
            firstname
            lastname
          }
          photo {
            url
            formats
          }
        }
      }`;
  
  
    const result = await graphQLFetch(query, {  }, true);
    // console.log("result", result);
  
    return {
      props: {
        photos: result.photos,
      },
      // Next.js will attempt to re-generate the page:
      // - When a request comes in
      // - At most once every second
      // revalidate: 60, // In seconds
    };
  }