import { useRouter } from "next/router";

function NavigateToMapPage({ children, href, classnames }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    sessionStorage.removeItem("prevsettings");
    router.push(href);
  }

  return (
    <a className={classnames} onClick={handleClick}>
      {children}
    </a>
  )
}

export default NavigateToMapPage;