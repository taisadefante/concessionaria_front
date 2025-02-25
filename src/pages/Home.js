import React from "react";
import Banner from "../components/Banner";
import FeaturedVehicles from "../components/FeaturedVehicles";
import Services from "../components/Services";
import Testimonials from "../components/Testimonials";
import ContactForm from "../components/ContactForm";
import MapaLocalizacao from "../components/MapaLocalizacao";
import Banner2 from "../components/Banner2";
import Sobre from "../pages/Sobre";

function Home() {
  return (
    <div>
      <Banner />
      <FeaturedVehicles />
      <Services />
      <Testimonials />
      <Sobre />
      <Banner2 />
      <ContactForm />
      <MapaLocalizacao />
    </div>
  );
}

export default Home;
