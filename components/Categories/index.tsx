import React from 'react'
//import './category.scss';
import { useSelector } from 'react-redux';
import Slider from '../Slider';

import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';

const Categories = () => {
  const categories = useSelector((state: RootState) => state.category.categories.data);
  const featureCategories = useSelector((state: RootState) => state.category.featureCategories.data);
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang==='en')?true:false;
  return (
    <div>
    <div className="container-cat mt-3">
  <div className="row" style={{margin:0}}>
    <div className="col-xl-12">
      <div className="link-tab">
        <p className="tab-links">
          <a > {(isCurrentLangEng?en.home:ka.home) + ` / ` } </a>
          <span className="txt-red">
            { isCurrentLangEng==true?(categories.category_name):(categories.category_name_gr) }
          </span>
        </p>
      </div>
    </div>
  </div>
  <div className="row d-xs-none" style={{margin:0}}>
    <div className="col-xl-12">
      <div className="header">
        <h1 className="txt-red mb-0">
            { isCurrentLangEng==true?(categories.category_name):(categories.category_name_gr) }
        </h1>
      </div>
    </div>
  </div>

  <div className="row category-page-row">
    {categories && categories.sub_category && categories.sub_category.map((category: any) => 
    <div className="col-lg-2 col-sm-6 col-6 special-class-cat" >
      <a href={`/${categories.category_slug}/${category.category_slug}`}>
      <div className="category-section-cat" >
         <img src={category.category_image} alt="" /> 
         <p className='mob-btn' >
          { isCurrentLangEng==true?(category.category_name):(category.category_name_gr) }
         </p>
        <div className="category-overlay">
          <div className="overlay">
            <div className="category-btn" > 
                { isCurrentLangEng==true?(category.category_name):(category.category_name_gr) }
            </div>            
          </div>
        </div>
      </div>
      </a>
    </div>
    )}
  </div>

 

</div>
<div className="wrapper sliderSection">
  <Slider heading={ isCurrentLangEng==true?(en.featured_products):(ka.featured_products) }data={featureCategories}/>
</div>


</div>
)}

export default Categories
