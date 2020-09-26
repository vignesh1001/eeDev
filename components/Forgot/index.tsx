import React from 'react';
import '../../public/css/login.scss';
import {forgot} from '../../apis/login';
import Cookies from 'universal-cookie';
import {  useToasts } from 'react-toast-notifications'

import { useSelector, useDispatch } from 'react-redux';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
const errorMAP:any ={
  userName: "",
}
const initial_STATE={
  userName: '',
  ischeckmail: false,
  errorMap: errorMAP
};
export default function Forgot() {
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
  const dorForgot = (e:any) => {
    e.preventDefault();
    dispatch({type:'APP_START',appStart:true});
    forgot(state.userName,isCurrentLangEng?1:2).then((response) => {
      if(response.status === "success"){
        addToast(isCurrentLangEng?en.email_sent_inbox:ka.email_sent_inbox, { appearance: 'error', autoDismiss : true });
        state.ischeckmail = true;
        setState({...state});
      }else{
        addToast(isCurrentLangEng?en.invalid_email:ka.invalid_email, { appearance: 'error', autoDismiss : true });
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
            { state.ischeckmail &&
              <div className="section-one">
                <h4 className="registration-titles">{isCurrentLangEng?en.check_email:ka.check_email}</h4>
                <p>{isCurrentLangEng?en.email_sent_link_reset_pwd:ka.email_sent_link_reset_pwd}{isCurrentLangEng?en.click_link_new_pwd:ka.click_link_new_pwd}</p>
                <p>{isCurrentLangEng?en.back_to_your_account:ka.back_to_your_account}</p>
                
              </div>
}
              { !state.ischeckmail &&
              <div className="section-one">
                <h4 className="registration-titles">{isCurrentLangEng?en['forgot password']:ka['forgot password']}</h4>
                <p>{isCurrentLangEng?en.enter_email_below:ka.enter_email_below}</p>
                <p>{isCurrentLangEng?en.email_link_reset_pwd:ka.email_link_reset_pwd}</p>
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
                        value={state.userName}
                        onChange={handleChange}
                        onBlur={onBlur}
                      />
                      {state.errorMap.userName && (
                        <div className="text-danger">{isCurrentLangEng?en.email_required:ka.email_required}</div>
                      )}
                    </div>
                    <button  className={`btn-darkred`} onClick={dorForgot}>{isCurrentLangEng?en.submit:ka.submit} </button>
                  </div>
                </form>
              </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
