import React from 'react';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
const TopCategories = () => {
  const topCategories = useSelector((state: RootState) => state.home.topCategories);
  const device = useSelector((state: RootState) => state.common.device);
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang ==='en')? true:false;
  return (<div >
<div className="test-wrapper"  >
  <div className="cat-wrapper">
    <div className="container">
      <div className="row text-center category-row">
        <div className="col-md-12">
          <div className="category-heading mb-5">
            <h2 className="main-header-regular alternate">{isCurrentLangEng===true?en.top_cats:ka.top_cats}</h2>
          </div>
        </div>
        {
          topCategories && topCategories.data && topCategories.data.map((category: any) =>
        <div className="col-md-4 col-sm-6 col-xl-3 col-lg-3 col-6 special-class">
            <div className="category-section" >
            <a href={`/${category.parent_category_slug}/${category.category_slug}`}>
              <LazyLoadImage  src={category.category_image} alt="" />
                 <p className='mob-btn' >
                {isCurrentLangEng===true?(category.category_name):(category.category_name_gr) }
               </p>
               </a>
               { !device && 
              <div className="category-overlay">
                <div className="overlay">
                  <a href={`/${category.parent_category_slug}/${category.category_slug}`}>
                  <button
                    className="category-btn">
                    {isCurrentLangEng===true?(category.category_name):(category.category_name_gr) }
                  </button>
                  </a>
                </div>
              </div>
}
            </div>
          </div>
          )}
      </div>
    </div>
  </div>
</div>
</div>);
}

export default TopCategories
