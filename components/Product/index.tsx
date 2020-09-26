import React, { useState  } from 'react';
import { useSelector } from 'react-redux';
import  ProductInfo  from '../ProductInfo';
import { Console } from 'console';

const Product = () => {
  const [showhide, setShowHide] = useState(false);
  const productDetails = useSelector((state: RootState) => state.productInfo.product.data[0]);
  const breadcrumbData = useSelector((state: RootState) => state.productInfo.bc.data);
  
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang === 'en')?true:false;
  const onclickShowHide = () => {
    setShowHide(!showhide);
  }
  return (<div className="test-wrapper">
  <div className="container mt-3">
    <div className="row">
      <div className="col-md-12">
        <div>
          { breadcrumbData && 
            <p className="tab-links" >
              <a href="/">{"home" }</a>
              { breadcrumbData['category'] && 
              <span>/</span>
              }
              { breadcrumbData['category'] && 
              <a  
              href={`/ ${breadcrumbData['category']['category_slug']}`}>
              { isCurrentLangEng==true?(breadcrumbData['category']['category_name']):(breadcrumbData['category']['category_name_gr']) }
              </a>
              }
              { breadcrumbData['sub_category'] && 
              <span >/</span>
              }
              { breadcrumbData['sub_category'] &&
              <a 
              href={`/ ${breadcrumbData['category']['category_slug']} / ${breadcrumbData['sub_category']['category_slug']}`}>
              { isCurrentLangEng==true?(breadcrumbData['sub_category']['category_name']):(breadcrumbData['sub_category']['category_name_gr']) }
              </a>
              }
              { productDetails['sub_category'] &&
              <span>/</span>
              }
              { productDetails && breadcrumbData && breadcrumbData['category'] && productDetails['product_slug']  &&
              <a 
                href={`/ ${breadcrumbData['category']['category_slug']}/${breadcrumbData['sub_category']['category_slug'],productDetails['product_slug']}`}>
                { isCurrentLangEng==true?productDetails['product_name']:productDetails['product_name_gr'] }
              </a>
              }             

              <span style={{display:'none'}} className="groupSocailMedia float-right groupSocailMedia-custome">
              <span className="share">{"share" }: </span>
              <a title="Share on facebook" target="_blank"  
              className="fb-xfbml-parse-ignore"><i style={{color:'#3b5998'}} className="fl-icon-facebook"></i>{"post" } / {"story"  }</a></span>            
            </p>
            }

        </div>
        <hr />
      </div>
    </div>

<ProductInfo/>
    <hr />  

    <div className="row">
      <div className="col-lg-5 video_wrapper mobileVideos" >
        { productDetails['video_link'] && 
        <div className="video" >
          <h5 className="txt-grey center_video_title">
            { isCurrentLangEng==true? productDetails['video_title'] : productDetails['video_title_gr']}
          </h5>
          <iframe   
            src={productDetails['video_link']}
            width="300" 
            height="300" 
          >
          </iframe>
        </div>
        }
      </div>
      { productDetails && productDetails.specifications &&
        <div 
        className={"mobileSections " + (productDetails['video_link'] ? 'col-lg-7':
        'col-lg-12')}
          >
          {Object.values(productDetails.specifications).map((specification:any, key: number) => (
          <div className="features" >
          { Object.keys(productDetails.specifications)[key].toLowerCase() === 'key specs' && 
            <div >
            { isCurrentLangEng ?(<h5 className="txt-grey">{ Object.keys(productDetails.specifications)[key].toLowerCase() }</h5>):(<h5  className="txt-grey">{ specification[0].title2_gr }</h5>)}
            { (Object.keys(productDetails.specifications)[key].toLowerCase() !== 'features' 
                    && Object.keys(productDetails.specifications)[key].toLowerCase() !== 'modes') ?
             (<table >
               { specification && specification.map((item: any, childIndex: number) => (
                <tr 
                  className={(childIndex % 2 == 0) ? 'even' : 'odd'}>
                  <td className="spec-name">
                    {isCurrentLangEng==true?item.specification_name:item.specification_name_gr}
                  </td>
                  <td className="spec-value">
                    { isCurrentLangEng==true ? item.specification_value
                      : (item.specification_value_gr === "" ? item.specification_value : item.specification_value_gr) 
                      } 
                      <span style={{textTransform: 'lowercase'}} >
                          { isCurrentLangEng==true ? item.english_unit
                            : item.georgian_unit }
                      </span>
                  </td>
                </tr>))
                }
              </table>)
              :
              (<table>
              <tr className={(key % 2 == 0) ? 'even' : 'odd'}>
                <td className="spec-header">
                  { specification.type}
                </td>
                <td className="spec-value">
                  
                { specification && specification.map((item: any, childIndex: number) => (
                  <span >
                      { isCurrentLangEng==true ? item.specification_name
                        : item.specification_name_gr }
                        { specification.length &&
                        <span >,</span>
                        }
                  </span>
                ))}
                  </td>
                </tr>
              </table>)
            }
            </div>
          }
          </div>))
        }
        </div>
      }
       <div className="col-lg-5 video_wrapper mobileVideo" >
         {productDetails['video_link'] && 
        <div className="video" >
          <h5 className="txt-grey center_video_title">
            { isCurrentLangEng==true? productDetails['video_title'] : productDetails['video_title_gr']}
          </h5>
          <iframe   
            src={productDetails['video_link']}
            width="300" 
            height="300" 
          >
          </iframe>
        </div>
        }
      </div>        
      </div> 


    { productDetails && productDetails.specifications && showhide && 
    <div className="showhide" >
      <div className="row">
      { productDetails && productDetails.specifications &&
        <div className="col-lg-12">
        {Object.values(productDetails.specifications).map((specification:any, key: number) => (
          <div className="features" >
{ Object.keys(productDetails.specifications)[key].toLowerCase() != 'key specs' &&
      <div >
{ isCurrentLangEng ?(<h5 className="txt-grey">{ Object.keys(productDetails.specifications)[key].toLowerCase() }</h5>):(<h5  className="txt-grey">{ specification[0].title2_gr }</h5>)}
{ (Object.keys(productDetails.specifications)[key].toLowerCase() !== 'features' 
                    && Object.keys(productDetails.specifications)[key].toLowerCase() !== 'modes')?(
             <table >
               { specification && specification.map((item: any, childIndex: number) => (
              <tr className={(childIndex % 2 == 0) ? 'even' : 'odd'}>
                <td className="spec-name">
                  {isCurrentLangEng==true?item.specification_name:item.specification_name_gr}
                </td>
                <td className="spec-value">
                  { isCurrentLangEng==true ? item.specification_value
                    : (item.specification_value_gr === "" ? item.specification_value : item.specification_value_gr) 
                    } 
                    <span style={{textTransform: 'lowercase'}}>
                        { isCurrentLangEng==true ? item.english_unit
                          : item.georgian_unit }
                    </span>
                </td>
              </tr>
                    ))}
            </table>
                    ):(
                <table className="">
                <tr className={(key % 2 == 0) ? 'even' : 'odd'}>
                  <td className="spec-header">
                    { specification.type}
                  </td>
                  <td className="spec-value">
                  { specification && specification.map((item: any, childIndex: number) => (
                    <span >
                        { isCurrentLangEng==true ? item.specification_name
                          : item.specification_name_gr }
                          { specification.length -1 &&
                          <span >,</span>
                          }
                    </span>
                  ))}
                  </td>
                </tr>
              </table>
                    )}
          </div>
                        }
        </div>
        ))}
      </div>
                        }
      </div> 
    </div>
}
{ productDetails && productDetails.specifications &&
    <div className="row" > 
      <div className="col-md-12">
        { !showhide && 
        <div  className="showSection mt-3"> 
            <button  onClick={ () => onclickShowHide()}
              type="button"  className="btn-darkred">
                <i className="fa fa-angle-double-down"></i>
                { "Show More"  }
            </button>
        </div>
        }
{ showhide && 
        <div  className="hideSection mt-5">
          <button 
          onClick={ () => onclickShowHide()}
              type="button"  className="btn-darkred">
              <i className="fa fa-angle-double-up"></i>
              { "Show Less"  }
            </button>
        </div>
}
      </div>
    </div>
}
  </div>
</div>
  );

}

export default Product
