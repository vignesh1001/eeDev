import React from 'react';
import { useSelector } from 'react-redux';
//import './slider.scss'
import Carousel from "react-multi-carousel";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import '../../public/css/slider.scss';
import Swiper from 'swiper';

import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
const Slider = (props:any) => {
  
  const device = useSelector((state: RootState) => state.common.device);
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang ==='en')? true:false;
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      slidesToSlide: 5 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    spaceBetween: 30,
    freeMode: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });
  const redirectProductPage = (url:any) => {
    window.location.href= url;

  }
  return (
    <div>
      { !device &&
  <div className="test-wrapper d-xs-none  most-popular-carousel"> 
  <div className="wrapper">
  <div className="container">
  <div className="row">
  <div className="col-md-12">
    
  <div className="slider-heading "> 
  {props && props.heading &&   
      <h2 className="main-header-regular" >    
        <span>
          { props.heading }
        </span>         
      </h2>  
}  
    </div>

  <div className="slider-section">
  <div className="sections">
  <div className="inner-wrap">
  {props && props.data &&
  
  <Carousel
    arrows={false}
    showDots={true}
    responsive={responsive}
    autoPlaySpeed={10000}
    autoPlay={true}
    >

{props && props.data  && props.data.map((item: any, index:number) => 
      <div className="slide holder-img">        
          <div className="item-contaner" >
            {
              item.in_store_price > 0 && <div className="web_exclusive_online_price" > 
              {isCurrentLangEng? en.web_exclucive_online_price:ka.web_exclucive_online_price }               
            </div>
            }              
            <div className="heartIcons">
            </div>
  
            
          <div onClick={() => redirectProductPage(`/${item.parent_category_slug}/${item.category_slug}/${item.product_slug}`)} >
            { (item.is_gift_available == 1 || item.is_multi_voucher_available == 1 || item.is_glovo_voucher_available == 1) &&
            <span 
              className="gift_icon">
              <img  src="/images/gift-icon2.png" alt=""/>
            </span>
}
  
            <a > 
              {
                props.heading ?(index <=5?<img  src={item.image} alt="" className="img-resp" />:<LazyLoadImage  src={item.image} alt="" className="img-resp" />):(<LazyLoadImage  src={item.image} alt="" className="img-resp" />)

              }  </a>
              { item.web_exclusive > 0 &&
              <span className="ribben" > {isCurrentLangEng? 'Sale':ka.sales }</span>
              }
  
            <div className="description " >
            { item.isSaleActivated === 1 ?(
                      <div className="price-label">
                        { isCurrentLangEng ? (
                        <p >
                            { (item.product_name.length>20)? (item.product_name.slice(0,20))+'..':(item.product_name) }
                        </p>):(
                        <p >
                          { (item.product_name_gr.length>20)? (item.product_name_gr.slice(0,20) )+'..':(item.product_name_gr) }
                        </p>
                        )
                        }
                        {item.sale_price  } <i className="elite-lari"></i>
                      </div>):(
                        <div className="price-label">
                          { isCurrentLangEng ?(
                          <p >
                              { (item.product_name.length>20)? (item.product_name.slice(0,20) )+'..':(item.product_name) }
                          </p>):(
                          <p >
                            { (item.product_name_gr.length>20)? (item.product_name_gr.slice(0,20) )+'..':(item.product_name_gr) }
                          </p>)
}
                          { item.actual_price } <i className="elite-lari"></i>
                        </div>
                      )}
              
            </div>
            
          </div>
          
          </div>
      </div>
      )};
      
    </Carousel>
}
  </div>
  </div>
  </div>

  </div>
  </div>
  </div>
  </div>
  </div>
}

  <div className="test-wrapper d-lg-none d-md-none d-sm-none" > 
    <div className="sliderwrapper">
        <div className="swiper-container" >
            <div className="slider-heading ">
                {props && props.heading &&   
                <h2 className="main-header-regular" >    
                <span>
                { props.heading }
                </span>         
                </h2>  
                }
            </div>
      
            <div className="swiper-wrapper">
              { props && props.data  && props.data.map((item: any, index: number) => (
              <div className="holder-img swiper-slide"   onClick={() => redirectProductPage(`/${item.parent_category_slug}/${item.category_slug}/${item.product_slug}`)}>
                <div className="item-contaner">
                {
                  item.in_store_price > 0 && <div className="web_exclusive_online_price" > 
                  {isCurrentLangEng? en.web_exclucive_online_price:ka.web_exclucive_online_price }              
                </div>
                }
                  <div className="heartIcons">
                  </div>
                  <a //(click)="storecurrentLang(item.parent_category_slug+'/'+item.category_slug+'/'+item.product_slug,item.parent_category_slug_gr+'/'+item.category_slug_gr+'/'+item.product_slug)"
                    href={`/${item.parent_category_slug}/${item.category_slug}/${item.product_slug}`}>

                      { (item.is_gift_available == 1 || item.is_multi_voucher_available == 1 || item.is_glovo_voucher_available == 1) && 
              <span 
              className="gift_icon">
                <img src="/images/gift-icon2.png" alt=""/>
              </span>
                      }
                      {
                        index <=1?(<img  src={item.image} alt="" className="img-resp" />):(<LazyLoadImage  src={item.image} alt="" className="img-resp" />)
                      }
              
                    { item.web_exclusive > 0  &&
                                  <span className="ribben" >{isCurrentLangEng? 'Sale':ka.sales }</span>
                    }

                    <div className="description">
                      { item.isSaleActivated === 1 ?(
                      <div className="price-label">
                        { isCurrentLangEng ? (
                        <p >
                            { (item.product_name.length>20)? (item.product_name.slice(0,20))+'..':(item.product_name) }
                        </p>):(
                        <p >
                          { (item.product_name_gr.length>20)? (item.product_name_gr.slice(0,20) )+'..':(item.product_name_gr) }
                        </p>
                        )
                        }
                        {item.sale_price  } <i className="elite-lari"></i>
                      </div>):(
                        <div className="price-label">
                          { isCurrentLangEng ?(
                          <p >
                              { (item.product_name.length>20)? (item.product_name.slice(0,20) )+'..':(item.product_name) }
                          </p>):(
                          <p >
                            { (item.product_name_gr.length>20)? (item.product_name_gr.slice(0,20) )+'..':(item.product_name_gr) }
                          </p>)
}
                          { item.actual_price } <i className="elite-lari"></i>
                        </div>
                      )}
                    </div>
                  </a>
                  </div>
              </div>
  ))}
            </div>

        </div>
    </div>
  </div>

  </div>
  );
}

export default Slider;
