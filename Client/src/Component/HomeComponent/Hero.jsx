import React, { useEffect } from 'react';
// import Button from 'react-bootstrap/Button';


export function Hero() {
  // useEffect(() => {
  //     const element = document.getElementById('header-carousel');
  //
  //     if (element && element.offsetWidth !== undefined) {
  //         const width = element.offsetWidth;
  //         console.log('Width:', width);
  //     }
  // }, []);

  return (

      <div className="main">
        <div className="container">
          {/*<div id="header-carousel" className="carousel slide" data-ride="carousel">*/}
            <div className="carousel-inner">
              <div className="carousel-item active" style={{ height: '410px' }}>
                <img className="img-fluid" src="img/carousel-1.jpg" alt="Image" />

              </div>

            </div>
          {/*</div>*/}
        </div>
      </div>
  );
}
