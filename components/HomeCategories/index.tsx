import React from 'react'
//import './category.scss';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Slider from '../Slider';

const HomeCategories = () => {
  const categories = useSelector((state: RootState) => state.home.categories);
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang==='en')?true: false;
  return (
    <div className="d-xs-none mt-5">
      { categories && categories.data && categories.data.map((homeCategoryData: any) => 
  <div className="test-wrapper" >
  <div className="wrapper">
    <div className="container border mb-3">
      <div className="row special-border">
        <div className="col-md-12 col-lg-5 d-lg-none d-md-none d-sm-none">
          <div className="selection-container">
            <h2 className="sub-header-regular">
              {homeCategoryData.section_name}
            </h2>
          </div>
        </div>

        <div className={"parentsHeading " + ((homeCategoryData && homeCategoryData.slides.engSlides && homeCategoryData.slides.engSlides[0] && homeCategoryData.slides.engSlides[0].image_path)?'col-lg-5': 'col-lg-12')}>
          <div className="selection-container">
          <h2 className="sub-header-regular d-xs-none">
              {isCurrentLangEng==true?homeCategoryData.section_name:homeCategoryData.section_name_gr}
          </h2>

             <ul className="row">
               { homeCategoryData.categories.map((category:any) =>
              <li className=" col-lg-6 col-md-3 col-12 col-6" >
                <div >                  
                  <h3>
                  <a href={`/${category.parent_category_slug}/${category.category_slug}`} className="nav-link" >{isCurrentLangEng==true? category.category_name:category.category_name_gr} </a>
                </h3>
              </div>
              </li> 
               )}

            </ul> 
          </div>
        </div>

        <div className="col-md-12 col-lg-7 pr-md-0 pl-0" id="none">
          <div className="section-2">
            <div className="d-xs-none">
              <div className="no-arrows">
                <a href="#">
                  { homeCategoryData && homeCategoryData.slides.engSlides && homeCategoryData.slides.engSlides[0] && homeCategoryData.slides.engSlides[0].image_path &&
                  <LazyLoadImage  src={ homeCategoryData.slides.engSlides[0].image_path }
                   style={{display: 'block', width: '100%', top:0}}
                   className="img-fluid"
                  />
}
                </a>
               
              </div>
            </div>
          </div>
        </div>

      </div>
<Slider data={homeCategoryData.products} />
    </div>
  </div>
</div>
      )}

</div>
)}

export default HomeCategories
