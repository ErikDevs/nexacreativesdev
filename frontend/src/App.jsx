import AboutUs from "./container/AboutUs";
import Blog from "./container/Blog";
import ContactUs from "./container/ContactUs";
import Portfolioa from "./container/dataPortfolio";
import Footer from "./container/Footer";
import Header from "./container/Header";
import Hero from "./container/Hero";
import Introduction from "./container/Introduction";
import Services from "./container/Services";
import Subscription from "./container/Subscription";
import Testimonial from "./container/Testmonial";
import Whyus from "./container/Whyus";

function App() {
  return (
    <>
      <main
        className={` overflow-x-hidden bg-slate-100 w-full font-inter mx-auto`}
      >
        <Header />
        <Hero />

        <AboutUs />
        <Whyus />
        <Services />
        <Portfolioa />
        <Testimonial />
        <Blog />
        <Subscription />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}

export default App;
