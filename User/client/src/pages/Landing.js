import {React , useEffect,useRef} from 'react'
import '../Css/Landing.css'
import ContactCard from '../Card/ContactCard';
import AboutCard from '../Card/AboutCard'
import GalleryCard from '../Card/GalleryCard'
import MinistryCard from '../Card/MinistryCard'
import { useNavigate } from 'react-router-dom';
import priest from '../Img/priest.png'
import TypeWriterEffect from 'react-typewriter-effect';

function Landing() {

  const navigate = useNavigate();
  const handleAnnouncementClick = () => {
    navigate('/Event');
  };
  const landingRef = useRef(null);
// scorling effect starts 
  useEffect(() => {
    const handleScroll = () => {
      const landingTop = landingRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (landingTop < windowHeight * 0.75) {
        // Add fade-in animation class
        landingRef.current.classList.add('fade-in-up');
      } else {
        // Remove fade-in animation class
        landingRef.current.classList.remove('fade-in-up');
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
// scorling effect ends
  return (
    <div className="Landing-Container">
      <div className="Landing-Main" ref={landingRef}>
        <div className='Landing-Background_Image'>
          <div className='Landing-Bottom_color'>
            <ContactCard />
            <AboutCard />
          </div>
          <div className='Landing-Heading'>
                St. Antony's
          </div>
          <div className='Landing-Sub_Heading'>
          <TypeWriterEffect
            startDelay={1500}
            cursorColor="white"
            multiText={[
              "Forane Church Thotathady"
            ]}
            typeSpeed={100}
            loop={true}
            multiTextLoop
          />
          </div>
          <div className='Landing-Quote'>
            The life of the body is the soul; the life of the soul is God.<br/> 
            Charity is the soul of faith, makes it alive; without love, faith dies.<br/>
            The spirit of humility is sweeter than honey, and those who nourish <br/>
            themselves with this honey produce sweet fruit.<br/>
            Learn to love humility, for it will cover all your sins.<br/>
          </div>
          <div className='Landing-left_double'>"</div>
          <div className='Landing-right_double'>"</div>
          <div className='Landing-Author'> – St.Antony.</div>
          <div className='Landing-priest-image'>
             <img src={priest} className="priest-image" alt="priest" height={580} width={320} loading='lazy' />
          </div>
        </div> 
        
      </div> 
    </div>
  )
}

export default Landing