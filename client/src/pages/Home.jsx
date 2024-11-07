import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/api/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListings(data);
        fetchRentListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListings = async () => {
      try {
        const res = await fetch("/api/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="bg-blue-50 py-24 px-4">
        <div className="flex flex-col gap-8 p-10 md:p-20 lg:p-28 max-w-6xl mx-auto text-center lg:text-left">
          <h1 className="text-blue-900 font-extrabold text-4xl lg:text-5xl xl:text-6xl leading-tight">
          Discover Your Dream Home with <span className="text-blue-700">FourHorseMen</span> <br />
          </h1>

          <p className="text-blue-700 text-sm lg:text-lg">
            From cozy apartments to luxurious estates, find the perfect place that fits your lifestyle. Start exploring a world of possibilities today!
          </p>

          <Link
            to="/search"
            className="mt-4 inline-block bg-blue-700 text-white text-sm lg:text-base font-semibold px-6 py-3 rounded-md shadow-md hover:bg-blue-800 hover:shadow-lg transition-all duration-200"
          >
            Start Your Search
          </Link>
        </div>
      </div>
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((listing, index) => (
            <SwiperSlide key={listing._id || index}>
              <div
                style={{
                  background: `url(${listing.imageUrls[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[500px]"
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}