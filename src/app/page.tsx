import Hero from '@/components/sections/hero';
import About from '@/components/sections/about';
import Services from '@/components/sections/services';
import Projects from '@/components/sections/projects';
import News from '@/components/sections/news';
import Contact from '@/components/sections/contact';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Projects />
      <News />
      <Contact />
    </>
  );
}
