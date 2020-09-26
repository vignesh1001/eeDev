import React from 'react';
//import './home.scss';
import { Carousel } from "react-responsive-carousel";
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
const HomeSlider = () => {
  const styles = {width: "100%" };  
  const homeSlider = useSelector((state: RootState) => state.home.homeSlider);
  const lang = useSelector((state: RootState) => state.common.lang);
  const device = useSelector((state: RootState) => state.common.device);
  const language = (lang === 'en')?'1':'2';
  let desktopSlider = homeSlider && homeSlider.data && homeSlider.data.slides.filter((data: any) => data.language === language );
  let mobileSlider = homeSlider && homeSlider.data && homeSlider.data.mobile_slides.filter((data: any) => data.language === language);

  return (
    <div>
       { !device &&
    <div className="d-xs-none">
    <Carousel  showArrows={false} showThumbs={false} interval={5000} showStatus={false} autoPlay={true} >     
  {desktopSlider && desktopSlider.map((data:any)=>
  <div style={styles}>
  <img alt="" src={data.image_path} />
</div>
)}
    </Carousel></div>
}

    <div className="d-lg-none d-md-none d-sm-none">
    <Carousel  showArrows={false} showThumbs={false} interval={5000} showStatus={false} >     
  {mobileSlider && mobileSlider.map((data:any)=>
  <div style={styles}>
  <img alt="" src={data.image_path} />
</div>
)}
    </Carousel></div>
    </div>);
}

export default HomeSlider
