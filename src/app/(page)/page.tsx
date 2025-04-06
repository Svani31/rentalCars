import SignIn from "@/app/components/signin/page";
import Landing from "@/app/components/Landing/Landing";
import Search from "@/app/components/search/search";
import Cart from "@/app/components/cart/cart";
import Carousel from "@/app/components/carouse/carousel";

export default function Home() {
  return (
    <div>
      {/*<SignIn />*/}
      <Landing />
      <Carousel />
      <Search />
      <Cart />
    </div>
  );
}
