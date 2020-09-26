/* eslint-disable no-undef */
/* global google */
import React from 'react';
import { useSelector } from 'react-redux';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import Link from 'next/link';
import '../../public/css/footerpages.scss';
import {FontAwesomeIcon}from'@fortawesome/react-fontawesome';
import { faFacebookSquare, faInstagramSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons'

var localjsondataeng = require('../../public/i18n/en.json');
var localjsondatagr = require('../../public/i18n/ka.json');

const FooterPagesLink = () => {
  const [isCurrentLangEng, setIsCurrentLangEng] = React.useState(true);
  const footerpagesdata = useSelector((state: RootState) => state.common.footerPages);
  const locationdata = useSelector((state: RootState) => state.productList.shopLocation);
  //console.log(locationdata.data);
  const contentData = footerpagesdata.data;
  //console.log(footerpagesdata);
  //console.log('******', contentData);
  
  React.useEffect(() => {
    if (process.browser) {
      console.log('locationdata====>>>', locationdata);
      /* eslint-disable-next-line */
      (window as any).loadMap('map_load', locationdata.data, isCurrentLangEng);
    }
  }, [locationdata]);

  let content;
  /* banner content  */
  if (contentData.link_title === 'Create your adventure') {
    content = (
      <div>
        <div className="banner-section about-us">
          <LazyLoadImage
            src={isCurrentLangEng === true ? contentData.page_banner : contentData.page_banner_gr}
            alt="{isCurrentLangEng===true?contentData.page_banner:contentData.page_banner_gr}"
          />
        </div>
      </div>
    );
  } else if (contentData.page_title === 'About Us') {
    content = (
      <div>
        <div className="banner-section about-us">
          <LazyLoadImage
            src={isCurrentLangEng === true ? contentData.page_banner : contentData.page_banner_gr}
            alt="{isCurrentLangEng===true?contentData.page_banner:contentData.page_banner_gr}"
          />
        </div>
        <div className="headers text-left mt-3 pl-5 pr-5">
          <h1>{isCurrentLangEng === true ? contentData.page_title : contentData.page_title_gr}</h1>
        </div>
      </div>
    );
  }

  /*to call Google maps api*/
  return (
    <div>
      {content}
      {((contentData.link_title === 'Contact Us') || (contentData.link_title === 'Shop Location'))  && (
        <div className="banner-section-wrapper">
          <div
            className="big-map"
            style={{ paddingTop: '0', height: '500px', width: '100p%' }}
            id="map_load"
          ></div>
          <hr id="carousal-line" />
        </div>
      )}
      {/* //title content  */}
      {contentData.page_title !== 'About Us' && contentData.link_title !== 'Contact Us' && contentData.link_title !== 'Shop Location' && (
        <div>
          <div className="headers text-center mt-3">
            <h1>
              {isCurrentLangEng === true ? contentData.page_title : contentData.page_title_gr}
            </h1>
          </div>
          {contentData.link_title === 'Create your adventure' ? (
            <hr className="nodarkredline" />
          ) : (
            <hr className="darkredline" />
          )}
        </div>
      )}

      {/* CONTACT PAGE */}
      {((contentData.link_title === 'Contact Us') || (contentData.link_title === 'Shop Location'))   && (
        <div className="row map-content-section find-us-content">
          <div className="col-md-8 order-md-1 order-2" id="bli">
            <table id="table">
              <thead>
                <tr style={{ backgroundColor: 'transparent' }} className="heading">
                  <th colSpan={3}>
                    <h1 className="header mb-4">
                      {isCurrentLangEng === true
                        ? localjsondataeng.contact_page_find_us
                        : localjsondatagr.contact_page_find_us_gr}
                    </h1>
                  </th>
                </tr>
                <tr className="sub-heading">
                  <th>
                    {isCurrentLangEng === true
                      ? localjsondataeng.contact_page_shop
                      : localjsondatagr.contact_page_shop_gr}
                  </th>
                  <th className="borders">
                    {isCurrentLangEng === true
                      ? localjsondataeng.contact_page_week
                      : localjsondatagr.contact_page_week_gr}
                  </th>
                  <th>
                    {isCurrentLangEng === true
                      ? localjsondataeng.contact_page_sunday
                      : localjsondatagr.contact_page_sunday_gr}
                  </th>
                </tr>
              </thead>
              <tbody>
                {contentData.shop_locations.map((item: any) => (
                  <tr>
                    <td>{isCurrentLangEng === true ? item.shop_address : item.shop_address_gr}</td>
                    <td className="borders">{item.time_mon_to_sat}</td>
                    <td>{item.time_sunday}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-md-4 order-md-2 order-1 mb-5" id="bla">
            <table id="table-two">
              <thead>
                <tr>
                  <th>
                    <h1 className="header mb-4" id="contact">
                      {isCurrentLangEng === true
                        ? localjsondataeng.contact_us
                        : localjsondatagr.contact_us_gr}{' '}
                    </h1>
                  </th>
                </tr>
                <tr className="sub-heading">
                  <th>&nbsp;</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="header">
                    <h3 className="mt-3">
                      {isCurrentLangEng === true
                        ? localjsondataeng.elit_electronics
                        : localjsondatagr.elit_electronics_gr}
                    </h3>
                  </td>
                </tr>
                <tr>
                  <td className="header mini-header">
                    {isCurrentLangEng === true
                      ? localjsondataeng.contact_page_head_office
                      : localjsondatagr.contact_page_head_office}
                  </td>
                </tr>
                <tr>
                  <td>
                    {' '}
                    {isCurrentLangEng === true
                      ? contentData.head_office
                      : contentData.head_office_gr}
                  </td>
                </tr>
                <tr>
                  <td className="header mini-header">
                    {isCurrentLangEng === true
                      ? localjsondataeng.contact_page_tel
                      : localjsondatagr.contact_page_tel}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href={`${contentData.telephone}`}>
                      <a target="_top">{contentData.telephone}</a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="header mini-header">
                    {isCurrentLangEng === true
                      ? localjsondataeng.contact_page_email
                      : localjsondatagr.contact_page_email_gr}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href={`${contentData.email}`}>
                      <a target="_top">
                        {isCurrentLangEng === true ? contentData.email : contentData.email_gr}
                      </a>
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td className="header mini-header">
                    {isCurrentLangEng === true
                      ? localjsondataeng.contact_page_social
                      : localjsondatagr.contact_page_social_gr}
                  </td>
                </tr>
                <tr>
                  <td className="header mini-icon">
                    <h2>
                      <a href={`${contentData.facebook_link}`} target="_blank">
                        <FontAwesomeIcon icon={faFacebookSquare}/> 
                      </a>
                      <a href={`${contentData.instagram_link}`} target="_blank">
                      &nbsp;&nbsp;<FontAwesomeIcon icon={faInstagramSquare}/> 
                      </a>
                      <a href={`${contentData.youtube_link}`} target="_blank">
                      &nbsp;&nbsp;<FontAwesomeIcon icon={faYoutubeSquare}/>
                      </a>
                    </h2>
                  </td>
                </tr>
                <tr>
                  <td className="header mini-header">
                    {isCurrentLangEng === true
                      ? localjsondataeng.support
                      : localjsondatagr.support_gr}
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link href={`/supportpage`}>
                      <a style={{ textDecoration: 'underline' }}>
                        {isCurrentLangEng === true
                          ? localjsondataeng.contact_page_click
                          : localjsondatagr.contact_page_click_gr}
                      </a>
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Other content */}
      {
        <div className="other-content-section pl-5 pr-5">
          <div
            dangerouslySetInnerHTML={{
              __html: isCurrentLangEng === true ? contentData.page_desc : contentData.page_desc_gr,
            }}
          ></div>
        </div>
      }

      {/* Warranty content */}
      {contentData.page_title === 'Warranty terms' && (
        <div className="warrenty_page pl-5 pr-5">
          <h2>Brand specific warranties</h2>
          <ul className="para pl-5">
            {contentData.brands.map((item: any) => {
              return (
                <li>
                  <Link href={`/warranty-info/${item.slug}`}>
                    <a className="red-link">
                      {isCurrentLangEng === true ? item.brand_name : item.brand_name_gr}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};
export default FooterPagesLink;
