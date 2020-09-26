import React from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import submitSupportPage  from '../../apis/supportpage';
import '../../public/css/supportpage.scss';

const errorsMap:any = {
  firstname: { type: '' },
  surname: { type: '' },
  phoneNumber: { type: '' },
  email: { type: '' },
  productBrand: { type: '' },
  idNumber: { type: '' },
};
const INITIAL_STATE:any = {
  firstname: '',
  surname: '',
  phoneNumber: '',
  email: '',
  whereBuy: '',
  productBrand: '',
  modelName: '',
  idNumber: '',
  errors: errorsMap,
}
const SupportPageLink = () => {
  const isCurrentLangEng = true;
  const supportPageData = useSelector((state: RootState) => state);
  const [state, setState] = React.useState(INITIAL_STATE);

  const validatePattern = (name:string, value:string) =>{
      if(name=='idNumber') {
        if(value && value.length!=11){
          setState({ ...state, errors: { ...state.errors, [name]: { type: 'pattern' } } });
        }
      } else if(name==='phoneNumber') {
        if(value && value.length!=9){
          setState({ ...state, errors: { ...state.errors, [name]: { type: 'pattern' } } });
        }
      }
  }
  const handleChange = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    state[name] = value;
    setState({ ...state });
    validatePattern(name,value);
  };
  const onBlur = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    if (state.errors[name]) {
      if (!value) {
        state.errors[name] = { type: 'required' };
        setState({ ...state });
      } else {
        state.errors[name] = { type: '' };
        setState({ ...state });
      }
    }
    validatePattern(name,value);
  };
  var localjsondataeng = require('../../public/i18n/en.json');
  var localjsondatagr = require('../../public/i18n/ka.json');
  const onSubmit = () => {
    // prepate the request and send to common API
    // const request = {
    //   firstname: 'Testing',
    //   surname: 'Test',
    //   phoneNumber: '325325',
    //   email: 'a@gmail.com',
    //   productBrand: '3523523523',
    //   idNumber: '23532532',
    //   modelName: 
    // };
    submitSupportPage(state);
  };
  const errors = state.errors;
  return (
    <div className="test-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="top-header mt-2">
              <p className="tab-links">
                {/* <a routerLink="/">{{ "home_cap" | translate }} / </a><span> {{ "support" | translate }} </span> */}
                <Link href="">
                  <a>
                    {isCurrentLangEng === true
                      ? localjsondataeng.home_cap + '      /      '
                      : localjsondatagr.home_cap + '           /           '}
                  </a>
                </Link>
                <span>
                  {isCurrentLangEng === true ? localjsondataeng.support : localjsondatagr.support}
                </span>
              </p>
              <hr />
            </div>
            <div className="main-header mt-3 mb-3">
              <h1>
                {isCurrentLangEng === true ? localjsondataeng.support : localjsondatagr.support}
              </h1>
            </div>
            <hr />
          </div>
        </div>
      </div>

      {/*<!--  Main Section  -->*/}
      <div className="wrapper">
        <div className="container mt-5">
          <div className="row">
            <div className="col-md-10 col-xl-8 col-lg-10 ml-auto mr-auto">
              <div className="main-section">
                <h5>
                  {isCurrentLangEng === true
                    ? localjsondataeng.support_request
                    : localjsondatagr.support_request}
                  <span>
                    (*{' '}
                    {isCurrentLangEng === true
                      ? localjsondataeng.start_required_field
                      : localjsondatagr.start_required_field}
                    )
                  </span>
                </h5>
                <p className="mb-4">
                  {isCurrentLangEng === true
                    ? localjsondataeng.support_form_msg
                    : localjsondatagr.support_form_msg}
                </p>
                <form>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="">
                        {isCurrentLangEng === true
                          ? localjsondataeng.first_name
                          : localjsondatagr.first_name}
                        *
                      </label>
                      <input
                        type="text"
                        name="firstname"
                        className={'form-control blinker '.concat(
                          errors?.firstname?.type === 'required' ? 'is-invalid' : '',
                        )}
                        required
                        value={state.firstname}
                        onChange={handleChange}
                        onBlur={onBlur}
                      />
                      {errors?.firstname?.type === 'required' && (
                        <div>
                          <small className="text-danger">
                            {isCurrentLangEng === true
                              ? localjsondataeng.support_name_required
                              : localjsondatagr.support_name_required}
                          </small>
                        </div>
                      )}
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="">
                        {isCurrentLangEng === true
                          ? localjsondataeng.surname_lw
                          : localjsondatagr.surname_lw}{' '}
                        *
                      </label>
                      <input
                        name="surname"
                        type="text"
                        required
                        value={state.surname}
                        onChange={handleChange}
                        onBlur={onBlur}
                        className={'form-control blinker '.concat(
                          errors?.surname?.type === 'required' ? 'is-invalid' : '',
                        )}
                      />
                      <div className="errors_div">
                        {errors?.surname?.type === 'required' && (
                          <small className="text-danger">
                            {isCurrentLangEng === true
                              ? localjsondataeng.support_surname_required
                              : localjsondatagr.support_surname_required}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <label htmlFor="">
                        {isCurrentLangEng === true
                          ? localjsondataeng.id_num_lw
                          : localjsondatagr.id_num_lw}
                        *
                      </label>
                      <input
                        name="idNumber"
                        type="text"
                        value={state.idNumber}
                        onChange={handleChange}
                        onBlur={onBlur}
                        className={'form-control blinker '.concat(
                          errors?.idNumber?.type === 'required' || errors?.idNumber?.type === 'pattern' ? 'is-invalid' : '',
                        )}
                      />
                      <div className="errors_div">
                        {errors?.idNumber?.type === 'required' && (
                          <small className="text-danger">
                            {isCurrentLangEng === true
                              ? localjsondataeng.support_id_required
                              : localjsondatagr.support_id_required}
                          </small>
                        )}
                        {errors?.idNumber?.type === 'pattern' && (
                          <small className="text-danger">
                            {isCurrentLangEng === true
                              ? localjsondataeng.idproof_length_required
                              : localjsondatagr.idproof_length_required}
                          </small>
                        )}
                      </div>
                    </div>
                    <div className="form-group col-md-6">
                      <label htmlFor="">
                        {isCurrentLangEng === true
                          ? localjsondataeng.phone_num_lw
                          : localjsondatagr.phone_num_lw}
                        *
                      </label>
                      <input
                        type="tel"
                        className={'form-control blinker '.concat(
                          errors?.phoneNumber?.type === 'required' ? 'is-invalid' : '',
                        )}
                        placeholder="xxx - xxx - xxxx"
                        value={state.phoneNumber}
                        onChange={handleChange}
                        onBlur={onBlur}
                        name="phoneNumber"
                      />
                      <div>
                        {errors?.phoneNumber?.type === 'required' && (
                          <small className="text-danger">
                            {isCurrentLangEng === true
                              ? localjsondataeng.phone_required
                              : localjsondatagr.phone_required}
                          </small>
                        )}
                        {errors?.phoneNumber?.type === 'pattern' && (
                          <small className="text-danger">
                            {isCurrentLangEng === true
                              ? localjsondataeng.phone_length_required
                              : localjsondatagr.phone_length_required}
                          </small>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      {isCurrentLangEng === true
                        ? localjsondataeng.email_address
                        : localjsondatagr.email_address}{' '}
                      *
                    </label>
                    <input
                      type="email"
                      placeholder={
                        isCurrentLangEng === true
                          ? localjsondataeng.enter_your_emailaddress
                          : localjsondatagr.enter_your_emailaddress
                      }
                      name="email"
                      value={state.email}
                      onChange={handleChange}
                      onBlur={onBlur}
                      className={'form-control blinker '.concat(
                        errors?.email?.type === 'required' ? 'is-invalid' : '',
                      )}
                    />
                    <div>
                      {errors?.email?.type === 'required' && (
                        <small className="text-danger">
                          {isCurrentLangEng === true
                            ? localjsondataeng.support_email_required
                            : localjsondatagr.support_email_required}
                        </small>
                      )}
                      {errors?.email?.type === 'pattern' && (
                        <small className="text-danger">
                          {isCurrentLangEng === true
                            ? localjsondataeng.invalid_email
                            : localjsondatagr.invalid_email}
                        </small>
                      )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="sort">
                      <label htmlFor="">
                        {isCurrentLangEng === true
                          ? localjsondataeng.support_page_question
                          : localjsondatagr.support_page_question}
                      </label>
                      <div className="arrow-wrapper">
                        <input
                          type="text"
                          name="whereBuy"
                          className="form-control"
                          placeholder="xxx - xxx - xxxx"
                          value={state.whereBuy}
                          onChange={handleChange}
                          onBlur={onBlur}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col-md-6">
                      <div className="sort">
                        <label htmlFor="">
                          {isCurrentLangEng === true
                            ? localjsondataeng.support_page_product_brand
                            : localjsondatagr.support_page_product_brand}
                          *
                        </label>
                        <div className="arrow-wrapper">
                          <input
                            type="text"
                            className={'form-control  '.concat(
                              errors?.productBrand?.type === 'required' ? 'is-invalid' : '',
                            )}
                            placeholder="xxx - xxx - xxxx"
                            value={state.productBrand}
                            onChange={handleChange}
                            onBlur={onBlur}
                            name="productBrand"
                          />
                        </div>

                        <div className="">
                          {errors?.productBrand?.type === 'required' && (
                            <small className="text-danger">
                              {isCurrentLangEng === true
                                ? localjsondataeng.product_brand_required
                                : localjsondatagr.product_brand_required}
                            </small>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      {isCurrentLangEng === true
                        ? localjsondataeng.support_page_model_name
                        : localjsondatagr.support_page_model_name}
                    </label>
                    <input
                      type="text"
                      name="modelName"
                      className="form-control"
                      placeholder="xxx - xxx - xxxx"
                      value={state.modelName}
                      onChange={handleChange}
                      onBlur={onBlur}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="">
                      {isCurrentLangEng === true
                        ? localjsondataeng.support_page_explain
                        : localjsondatagr.support_page_explain}
                    </label>
                    <textarea name="problem" rows={5} className="form-control"></textarea>
                  </div>
                  {/* // <!-- Submit Button --> */}
                  <button
                    type="button"
                    className="formState.isValid?btn btn-darkred : btn btn-disabled"
                    onClick={onSubmit}
                  >
                    {isCurrentLangEng === true ? localjsondataeng.submit : localjsondatagr.submit}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SupportPageLink;
