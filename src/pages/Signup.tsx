import Auth from "../components/Auth";
import Quote from "../components/Quote";
import man from '../assets/outpu.jpg';

function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen relative overflow-hidden">
      <div className="flex justify-center items-center relative z-10">
        <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
          <Auth signtype="signup" />
        </div>
      </div>
      <div 
        className="absolute inset-0 md:relative md:inset-auto md:hidden"
        style={{
          backgroundImage: `url(${man})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 backdrop-filter backdrop-blur-md md:backdrop-blur-none">
          
        </div>
        <div className="hidden md:block relative z-10 h-full">
          <Quote />
        </div>
      </div>
      <div className="hidden md:flex">
        <Quote />
      </div>
    </div>
  );
}

export default Signup;