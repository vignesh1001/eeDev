import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../../public/css/login.scss';
import en from '../../public/i18n/en.json';
import ka from '../../public/i18n/ka.json';
import {checkToken, resetPassword} from '../../apis/login';
import {  useToasts } from 'react-toast-notifications'
const errorMap:any = {
  password: "",
  confirmPassword: ""
};
const INITIAL_STATE ={
  password: '',
  confirmPassword: '',
  errorMap,
  disableVerify: true,
  userId:""
};
export default function Reset() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const lang = useSelector((state: RootState) => state.common.lang);
  const isCurrentLangEng = (lang==='en')?true:false;
  const [state, setState] = React.useState(INITIAL_STATE);
  const checkError = (name: string, value: string) => {
    let errorMessage = "";
    if (name === 'password') {
      if(value === ""){
        errorMessage=isCurrentLangEng?en.password_required:ka.password_required;
      }else if (!/^[0-9a-zA-Z]+$/.test(value) || value.length <= 5){
        errorMessage=isCurrentLangEng?en.pwd_pwd_length + en.pwd_pwd_digit:ka.pwd_pwd_length +ka.pwd_pwd_digit;
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
  const getQueryVariable = (variable: any) => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if (pair[0] == variable) {
        return pair[1];
      }
    }
  }
  useEffect(() => {
    var token = getQueryVariable("token");
    checkToken(token).then((response) => {
      if(response.userId){
        state.userId  =  response.UserID;
        setState({...state});
      }
    })
    .catch(function (error) {
      console.log('Request failed', error);
    });

  },[]);
 



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
  const doRegister = () => {
    dispatch({type:'APP_START',appStart:true});
        let payload = {UserID:state.userId,"password":state.password,"language":isCurrentLangEng?1:2}
        resetPassword(payload).then((response) => {
          if(response.status){
            addToast(isCurrentLangEng?en.password_update_success:ka.password_update_success, { appearance: 'error', autoDismiss : true });
            window.location.href = '/';
          }
          dispatch({type:'APP_START',appStart:false});
        })
        .catch(function (error) {
          console.log('Request failed', error);
          dispatch({type:'APP_START',appStart:false});
        });
  };  

  const checkVerifyEmail  = () => {
    let error = false;
    for (let [key, value] of Object.entries(state.errorMap)) {
      if(value !==""){
        error= true;
      }
  }
    if( state.password !="" && state.confirmPassword !="" && !error){
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
        <div className="mt-5">
          <div className="wrapper" id="copyHtml">
            <div className="logincontainer mt-5">
              <div className="row">                
                
                <div className="col-xl-8 col-lg-8 col-md-8 col-xs-12 offset-xl-2 offset-lg-2 offset-md-2 mr-auto">
                  <div className="section-two">
                    <form
                      autoComplete="off"
                      className="ng-untouched ng-pristine ng-invalid"
                    >
                      <div className="form-row">
                        <div className="form-group col-lg-6 col-md-6 col-xs-12">
                        <h5 className="txt-red mb-3 registration-titles">
                {isCurrentLangEng?en.new_pwd:ka.new_pwd}
            </h5>
                          <div className="password1">
                            <input
                              autoComplete="new-password"
                              className={'form-control '.concat(
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
                        <h5 className="txt-red mb-3 registration-titles">
                        {isCurrentLangEng?en.repeat_pwd:ka.repeat_pwd}
            </h5>
                          <div className="password1">
                            <input
                              className={'form-control '.concat(
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
                      <div className="signup-note text-center">
                        
                      <button type="button" className={`btn-darkred ${!state.disableVerify?'':'btn-disabled'}`}  id="singup" disabled={state.disableVerify} onClick={()=>doRegister()}>                        
                        { isCurrentLangEng?en.submit:ka.submit}
                      </button>
                      </div>
                    </form>
                  </div>
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
