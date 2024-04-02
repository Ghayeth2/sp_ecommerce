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
          <div id="header-carousel" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              <div className="carousel-item active" style={{ height: '410px' }}>
                <img className="img-fluid" src="img/carousel-1.jpg" alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px' }}>
                    <h4 className="text-light text-uppercase font-weight-medium mb-3">10% Off Your First Order</h4>
                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">Fashionable Dress</h3>
                    <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                  </div>
                </div>
              </div>
              <div className="carousel-item" style={{ height: '410px' }}>
                <img className="img-fluid" src="img/carousel-2.jpg" alt="Image" />
                <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                  <div className="p-3" style={{ maxWidth: '700px' }}>
                    <h4 className="text-light text-uppercase font-weight-medium mb-3">11% Off Your First Order</h4>
                    <h3 className="display-4 text-white font-weight-semi-bold mb-4">Reasonable Price</h3>
                    <a href="" className="btn btn-light py-2 px-3">Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
