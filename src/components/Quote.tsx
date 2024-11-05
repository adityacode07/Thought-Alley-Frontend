import man from '../assets/outpu.jpg';

function Quote() {
  return (
    <div
      className="h-screen flex flex-col justify-center items-center px-14"
      style={{ backgroundColor: '#ffffff' }}
    >
      <div className="text-3xl font-bold pt-4 ">
        <img
          src={man} 
          alt="Art"
          style={{ width: '108.5%', maxWidth: 'none' }} 
        />
      </div>
    </div>
  );
}

export default Quote;
