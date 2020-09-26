import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../public/css/login.scss';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
import Cookies from 'universal-cookie';
import {login} from '../../apis/login';
import {  useToasts } from 'react-toast-notifications'
const errorMap:any = {
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
  email: ""
};
const INITIAL_STATE ={
  tokenPassword: '',
  firstName: '',
  lastName: '',
  password: '',
  confirmPassword: '',
  email: '',
  errorMap,
  disableVerify: true,
  token:""
};
export default function Registration() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang==='en')?true:false;
  const [state, setState] = React.useState(INITIAL_STATE);
  const checkError = (name: string, value: string) => {
    let errorMessage = "";
    if (name === 'firstName') {
      if(value === ""){
        errorMessage=isCurrentLangEng?en.firstname_required:ka.firstname_required;
      }else if(value.length <=1){
        errorMessage=isCurrentLangEng?en.first_name_min_chars:ka.first_name_min_chars;
      }

    }else if (name === 'lastName') {
      if(value === ""){
        errorMessage=isCurrentLangEng?en.last_name_required:ka.last_name_required;
      }else if(value.length <=1){
        errorMessage=isCurrentLangEng?en.last_name_min_chars:ka.last_name_min_chars;
      }

    }else if (name === 'password') {
      if(value === ""){
        errorMessage=isCurrentLangEng?en.password_required:ka.password_required;
      }else if (!/^[0-9a-zA-Z]+$/.test(value) || value.length <= 5){
        errorMessage=isCurrentLangEng?en.pwd_pwd_length + en.pwd_pwd_digit:ka.pwd_pwd_length +ka.pwd_pwd_digit;
      }

    }else if (name === 'email') {
      if(value === ""){
        errorMessage=isCurrentLangEng?en.email_required:ka.email_required;
      }else if(!validateEmail(value)){
        errorMessage=isCurrentLangEng?en.invalid_email:ka.invalid_email;
      }

    }else if (name === 'confirmPassword') {
      if (value === '') {
        errorMessage=isCurrentLangEng?en.repeat_pwd_req:ka.repeat_pwd_req;
      }
      if (state.password !== value) {
        errorMessage = isCurrentLangEng?en.repeat_pwd_not_match:ka.repeat_pwd_not_match;
      }
    }
    state.errorMap[name] = errorMessage;    
    setState({ ...state });
    checkVerifyEmail();
    
  };
  const validateEmail = (email:any) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  const handleChange = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    checkError(name, value);
    setState({ ...state, [name]: value });
  };
  const onBlur = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    //state.errorMap[name] = value ? false : true;
    checkError(name, value);
  };
  const doCreate = () => {

    dispatch({type:'APP_START',appStart:true});
    if(window.atob(state.token) !== state.tokenPassword ){
      addToast( isCurrentLangEng?en.enter_valid_code:ka.enter_valid_code , { appearance: 'error', autoDismiss : true });
      dispatch({type:'APP_START',appStart:false});
    } else{

        let payload = {"first_name":state.firstName,"last_name":state.lastName,"email":state.email,"password":state.password,"signup_html":"","terms_version":1,"language":isCurrentLangEng?1:2}
        fetch('https://admin.ee.ge/api-1408/create_user', {
          method: 'POST',
          body: JSON.stringify(payload),
        }).then((response) => {
          return response.json();
        })
        .then(function (data) {
              const cookies = new Cookies();
              cookies.set('userId', data.id, { path: '/' });
              login(state.email,state.password).then((response) => {
                if(response.token){
                  const cookies = new Cookies();
                  localStorage.setItem('userData', response);
                  cookies.set('userId', response.data[0].UserID, { path: '/' });
                  cookies.set('token', response.tken, { path: '/' });
                  window.location.href = '/';
                }
                
        dispatch({type:'APP_START',appStart:false});
              })
              .catch(function (error) {
              console.log('Request failed', error);
              
        dispatch({type:'APP_START',appStart:false});
              });
        })
        .catch(function (error) {
          console.log('Request failed', error);
          
        dispatch({type:'APP_START',appStart:false});
        });
  }
  };  

  const doRegister = () => {
    dispatch({type:'APP_START',appStart:true});
    const  payload = {
      email:state.email,
      password:state.password,
      language:isCurrentLangEng?1:2

    }
    fetch('https://admin.ee.ge/api-1408/get_the_email', {
      method: 'POST',
      body: JSON.stringify({...payload}),
    }).then((response) => {
      return response.json();
    })
    .then(function (data) {
      if(data.token){

        state.token = data.token;
      }else{
        addToast(data.msg, { appearance: 'error', autoDismiss : true });

      }
      setState({...state});
      dispatch({type:'APP_START',appStart:false});
    })
    .catch(function (error) {
      console.log('Request failed', error);
      dispatch({type:'APP_START',appStart:false});
    });
    //return false;
  };
  const checkVerifyEmail  = () => {
    let error = false;
    for (let [key, value] of Object.entries(state.errorMap)) {
      if(value !==""){
        error= true;
      }
  }
    if(state.firstName !=="" && state.lastName !="" && state.email !="" && state.password !="" && state.confirmPassword !="" && !error){
      error= false;
    }else{
      error= true;
    }
    state.disableVerify = error;
    setState({...state});   

  }
  return (
    <div>
    <div className="login">
      <div className="wrapper" id="copyHtml1">
      { state.token === "" && 
        <div className="mt-5">
            <div className="logincontainer mt-5">
              <div className="row">                
                
                <div className="col-xl-8 col-lg-8 col-md-8 col-xs-12 offset-xl-2 offset-lg-2 offset-md-2 mr-auto">
                  <div className="loginsection-two">
                    <p>{isCurrentLangEng?en['signed in to buy products and see discounted prices']:ka['signed in to buy products and see discounted prices']}
                    </p>
  <h4 className="registration-titles mt-5">{isCurrentLangEng?en.quick_signup:ka.quick_signup}</h4>
                    <p>{isCurrentLangEng?en.signing_easy:ka.signing_easy}</p>
                    <form
                      autoComplete="off"
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6 col-xs-12">
                          <input
                            className={'form-control  '.concat(
                              state.errorMap.firstName ? 'is-invalid' : '',
                            )}
                            name="firstName"
                            id="firstName"
                            type="text"
                            placeholder={isCurrentLangEng?en['first name']:ka['first name']}
                            value={state.firstName}
                            onChange={handleChange}
                            onBlur={onBlur}
                          />
                          {state.errorMap.firstName && (
                            <div>
                              <small className="text-danger">{state.errorMap.firstName}</small>
                            </div>
                          )}
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-xs-12">
                          <input
                            className={'form-control  '.concat(
                              state.errorMap.lastName ? 'is-invalid' : '',
                            )}
                            name="lastName"
                            id="lastName"
                            type="text"
                            placeholder={isCurrentLangEng?en['last name']:ka['last name']}
                            value={state.lastName}
                            onChange={handleChange}
                            onBlur={onBlur}
                          />
                          {state.errorMap.lastName && (
                            <div>
                              <small className="text-danger">{state.errorMap.lastName}</small>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-8 col-md-8 col-xs-12">
                          <input
                            className={'form-control  '.concat(
                              state.errorMap.email ? 'is-invalid' : '',
                            )}
                            name="email"
                            id="email"
                            type="text"
                            placeholder={isCurrentLangEng?en.enter_your_emailaddress:ka.enter_your_emailaddress}
                            value={state.email}
                            onChange={handleChange}
                            onBlur={onBlur}
                          />
                          {state.errorMap.email && (
                            <div>
                              <small className="text-danger">{state.errorMap.email}</small>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6 col-xs-12">
                          <div className="password1">
                            <input
                              autoComplete="new-password"
                              className={'form-control  '.concat(
                                state.errorMap.password ? 'is-invalid' : '',
                              )}
                              name="password"
                              id="password"
                              type="password"
                              placeholder={isCurrentLangEng?en.password:ka.password}
                              value={state.password}
                              onChange={handleChange}
                              onBlur={onBlur}
                            />
                            {state.errorMap.password && (
                              <div>
                                <small className="text-danger">
                                  {state.errorMap.password}
                                </small>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="form-group col-lg-6 col-md-6 col-xs-12">
                          <div className="password1">
                            <input
                              className={'form-control  '.concat(
                                state.errorMap.confirmPassword ? 'is-invalid' : '',
                              )}
                              name="confirmPassword"
                              id="confirmPassword"
                              value={state.confirmPassword}
                              onChange={handleChange}
                              type="password"
                              placeholder={isCurrentLangEng?en['repeat password']:ka['repeat password']}
                              onBlur={onBlur}
                            />
                            {state.errorMap.confirmPassword && (
                              <div>
                                <small className="text-danger">{state.errorMap.confirmPassword}</small>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="signup-note">
                        <span>
                          
                        { isCurrentLangEng?en['verify your email by sending you a six-digit confirmation code to your email']:ka['verify your email by sending you a six-digit confirmation code to your email']}
                        </span>
                      </div>
                      <button type="button" className={`btn-darkred ${!state.disableVerify?'':'btn-disabled'}`}  id="singup" disabled={state.disableVerify} onClick={()=>doRegister()}>                        
                        { isCurrentLangEng?en['verify email']:ka['verify email']}
                      </button>
                    </form>
                    <div className="dont-have-account col-xs-12">
                      <span className="txt-grey font-weight-bold">{isCurrentLangEng?en['sign up with']:ka['sign up with']} </span>
                    </div>
                    <div className="social-login col-xs-12">
                      <button className="facebook btn">
                        <i className="fa fa-facebook" /> Facebook
                      </button>
                      <button className="google btn">
                        <i className="fa fa-google-plus" /> Google
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }

        { state.token !=="" && 
        <div className="wrapper">
        <div className="logincontainer stepone-container" style={{marginBottom:'80px'}}>
      <div className="row mt-3">
      <div className="col-md-8 offset-md-2">
        <h4 className="txt-red mb-2 registration-titles">
            { isCurrentLangEng?en.confirm_code:ka.confirm_code}
        </h4>
        <p> { isCurrentLangEng?en.confirm_code_note:ka.confirm_code_note}</p>
        <form action=""  >          
          <div className="form-row ml-auto mr-auto">
            <div className="form-group col-12  col-lg-6 col-xl-6">
              <input
              className="form-control  mobile-verify pass"
                type="number"
                name="tokenPassword"
                id="tokenPassword"
                value={state.tokenPassword}
                onChange={handleChange}
                onBlur={onBlur}
              />
            </div>
          </div>
          <div className="verification-box-button mt-3">
              <button type="button" className="btn-darkred " onClick={()=>doCreate()}>
              
                { isCurrentLangEng?en.sign_up:ka.sign_up}
              </button> 
              <span className="inner">
                <span className="txt-grey">{ isCurrentLangEng?en.signup_terms_note:ka.signup_terms_note}
                  <span className="btn btn-link btn-darkgrey" >
                    { isCurrentLangEng?en.terms_conditions:ka.terms_conditions}
                  </span>
                </span>
              </span>
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
}
      
      </div>
    </div>
    </div>
  );
}
