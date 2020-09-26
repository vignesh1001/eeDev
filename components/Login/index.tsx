import React from 'react';
import '../../public/css/login.scss';
import {login} from '../../apis/login';
import Cookies from 'universal-cookie';
import {  useToasts } from 'react-toast-notifications'

import { useSelector, useDispatch } from 'react-redux';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
const errorMAP:any ={
  userName: "",
  password: "",
}
const initial_STATE={
  userName: '',
  password: '',
  isStaySigned: false,
  errorMap: errorMAP
};
export default function Login() {
  const dispatch = useDispatch();
  const [state, setState] = React.useState(initial_STATE);
  const [disableVerify, setDisableVerify] = React.useState(true);
  const { addToast } = useToasts();
  
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang==='en')?true:false;
  const handleChange = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    setState({ ...state, [name]: value });
    checkDisable({ ...state, [name]: value })
    
  };
  const onBlur = (e: any) => {
    const { target } = e;
    const { name, value } = target;
    state.errorMap[name] = value ? false : true;
    
    setState({ ...state });
  };
  const checkDisable = (stateData: any) => {
    if(stateData.userName !="" && stateData.password !=""){
      setDisableVerify(false);
          }else{
            setDisableVerify(true);
          }

  }
  const doLogin = (e:any) => {
    dispatch({type:'APP_START',appStart:true});
    e.preventDefault();
    login(state.userName,state.password).then((response) => {
      if(response.token){
        addToast(isCurrentLangEng?en.login_success:ka.login_success, { appearance: 'error', autoDismiss : true });
        const cookies = new Cookies();
        localStorage.setItem('userData', response);
          cookies.set('userId', response.data[0].UserID, { path: '/' });
          cookies.set('token', response.tken, { path: '/' });
        window.location.href = '/';
      }else{
        addToast(isCurrentLangEng?en.username_pass_invalid:ka.username_pass_invalid, { appearance: 'error', autoDismiss : true });
      }
      
    dispatch({type:'APP_START',appStart:false});
    })
    .catch(function (error) {
      console.log('Request failed', error);
      
    dispatch({type:'APP_START',appStart:false});
    });
  };
  return (
    <div> 
    <div className="login">
      <div className="Loginwrapper" id="copyHtml1">
        <div className="logincontainer mt-5">
          <div className="row mt-4">
            <div className="col-lg-6 offset-lg-3 col-md-6 offset-md-3">
              <div className="section-one">
                <h4 className="registration-titles">{isCurrentLangEng?en.sign_in:ka.sign_in}</h4>
                <p>{isCurrentLangEng?en.signin_email_userpwd:ka.signin_email_userpwd}</p>
                <form
                  autoComplete="off"
                  className="col-lg-8 col-md-8 col-sm-8 col-xs-12 ng-pristine ng-invalid ng-touched"
                  name="Login"
                  // novalidate=""
                >
                  <div className="row">
                    <div className="form-group col-12 p-0">
                      <input
                        className={'form-control '.concat(
                          state.errorMap.userName ? 'is-invalid' : '',
                        )}
                        name="userName"
                        // required=""
                        type="text"
                        placeholder={isCurrentLangEng?en.email_address:ka.email_address}
                        value={state.userName}
                        onChange={handleChange}
                        onBlur={onBlur}
                      />
                      {state.errorMap.userName && (
                        <div className="text-danger">{isCurrentLangEng?en.email_required:ka.email_required}</div>
                      )}
                    </div>
                    <div className="form-group col-12 p-0">
                      <input
                        className={'form-control '.concat(
                          state.errorMap.password ? 'is-invalid' : '',
                        )}
                        name="password"
                        // required=""
                        type="password"
                        placeholder={isCurrentLangEng?en.password:ka.password}
                        value={state.password}
                        onChange={handleChange}
                        onBlur={onBlur}
                      />
                      {state.errorMap.password && (
                        <div className="text-danger">{isCurrentLangEng?en.password_required:ka.password_required}.</div>
                      )}
                    </div>
                    <div className="form-row col-12 p-0">
                      <div className="form-group col-6">
                        <div className="custom-control custom-checkbox">
                          <input
                            className="custom-control-input"
                            id="isStaySigned"
                            type="checkbox"
                            checked={state.isStaySigned}
                            onChange={(e) =>
                              handleChange({
                                target: {
                                  value: !state.isStaySigned,
                                  name: 'isStaySigned',
                                },
                              })
                            }
                          />
                          <label className="custom-control-label" htmlFor="isStaySigned">
                            {isCurrentLangEng?en['stay signed in']:ka['stay signed in']}
                          </label>
                        </div>
                      </div>
                      <div className="form-group col-6 text-right">
                        <a id="btn-forgot" href="/forgotpassword">
                          {isCurrentLangEng?en['forgot password']:ka['forgot password']}?
                        </a>
                      </div>
                    </div>
                    <button disabled={disableVerify} className={`btn-darkred ${!disableVerify?'':'btn-disabled'}`} onClick={doLogin}>{isCurrentLangEng?en.sign_in:ka.sign_in} </button>
                  </div>
                </form>
                <div className="dont-have-account col-xs-12">
                  <span className="txt-grey">{isCurrentLangEng?en['dont have an account']:ka['dont have an account']} </span>
                  <a className="btn btn-link txt-red" href="/registration">
                  {isCurrentLangEng?en['create an account now']:ka['create an account now']}
                  </a>
                </div>
                <div className="social-login col-xs-12">
                  <button className="facebook btn">
                    <i className="fa fa-facebook" /> Facebook{' '}
                  </button>
                  <button className="google btn">
                    <i className="fa fa-google-plus" /> Google{' '}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
