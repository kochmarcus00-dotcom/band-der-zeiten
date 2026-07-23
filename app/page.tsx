import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ChapterImage from "../components/ChapterImage";
import World from "../components/World";
import Story from "../components/Story";
import Characters from "../components/Characters";
import Quote from "../components/Quote";
import Book from "../components/Book";
import Footer from "../components/Footer";
import ScrollTop from "../components/ScrollTop";

export default function Home() {
  return (
    <main className="bg-[#090909] text-white overflow-x-hidden">

      <Navbar />

      <Hero />

      <World />

      <ChapterImage
        src="/kap1.png"
        alt="Norwegen"
      />

      <Story />

      <ChapterImage
        src="/kap2.png"
        alt="Die Geschichte"
      />

      <Characters />

      <ChapterImage
        src="/kap3.png"
        alt="Alva"
      />

      <Quote />

      <ChapterImage
        src="/kap4.png"
        alt="Maya"
      />

      <Book />

      <ChapterImage
        src="/kap5.png"
        alt="Krieg"
      />

      <Footer />
      <ScrollTop />
    </main>
  );
}