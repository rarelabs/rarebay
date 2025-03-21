import { useEffect } from 'react';

const GlassCoin = () => {
  return (
    <div className="container">
      <div className="coin">
  <div className="side">
    <div className="edge">
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
      <div className="spoke"></div>
    </div>
  </div>
  <div className="front"></div>
  <div className="front_b"></div>
  <div className="back"></div>
  <div className="back_b"></div>
</div>


      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 50px;
        }
      `}</style>
    </div>
  );
};

export default GlassCoin;