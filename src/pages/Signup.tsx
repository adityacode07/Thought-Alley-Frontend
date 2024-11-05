import Auth from "../components/Auth";
import Quote from "../components/Quote";

function Signup() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex justify-center items-center">
        <Auth signtype="signup"/>
      </div>
      <div className="hidden md:flex">
        <Quote />
      </div>
    </div>
  );
}

export default Signup;
