import React from 'react';
import { Carousel, Image } from 'react-bootstrap';

const CarouselPictures = () => (
  <div className="container-fluid splash-carousel">
    <Carousel>
      <Carousel.Item>
        <Image responsive src="/assets/carousel.png" />
        <Carousel.Caption>
          <h3>Enter your target host</h3>
          <p>Use the built-in validation tool to verify domain ownership.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src="/assets/carousel.png" />
        <Carousel.Caption>
          <h3>Write a custom script</h3>
          <p>Load Effect supports script validation, so you can comfortably write knowing that the test will according to spec</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src="/assets/carousel.png" />
        <Carousel.Caption>
          <h3>Run the stress test</h3>
          <p>Run it once, run it as many times as you want.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <Image responsive src="/assets/carousel.png" />
        <Carousel.Caption>
          <h3>Profit</h3>
          <p>Real time data, formulated with charts and graphs for you to analyze performance.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  </div>
);

export default CarouselPictures;
