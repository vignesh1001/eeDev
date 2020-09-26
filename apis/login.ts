import { logger } from '../utils/logger'
import api from './api'
const userDetails = {
  id: '',
  firstName: '',
  lastName: '',
  email: '',
  mobileNumber: '',
};

export const isLoggedIn =()=> {
  const userData = localStorage.getItem('userData');
  if (!userData) {
    return false;
  } else {
    return true;
  }
}

export const login = async (username:any,password:any) => {
    try {
      const result = await api.postData('/login',{
        email: username,
        password: password
      });
      return result.data;
    } catch (error) {
      logger('error.response', error)
      throw error
    }
  }

  export const getUserShipping = async (userId:any) => {
    try {
      const result = await api.getData('/user/get_user_shipping_address/'+userId);
      return result.data;
    } catch (error) {
      logger('error.response', error)
      throw error
    }
  }
  
  export const getUserRegion = async (userId:any) => {
    try {
      const result = await api.getData('/user/get_region/'+userId);
      return result.data;
    } catch (error) {
      logger('error.response', error)
      throw error
    }
  }

  
  export const saveShipping = async (payload:any) => {
    try {
      const result = await api.postData('/user/create_shipping_address',payload);
      return result.data;
    } catch (error) {
      logger('error.response', error)
      throw error
    }
  }

  export const forgot = async (email:any, language: any) => {
    try {
      const result = await api.postData('/forgotpassword',{
        email: email,
        language: language
      });
      return result.data;
    } catch (error) {
      logger('error.response', error)
      throw error
    }
  }

  export const checkToken = async (token:any) => {
    try {
      const result = await api.postData('/checktoken',{
        token
      });
      return result.data;
    } catch (error) {
      logger('error.response', error)
      throw error
    }
  }

  export const resetPassword = async (payload:any) => {
    try {
      const result = await api.postData('/resetpassword',payload);
      return result.data;
    } catch (error) {
      logger('error.response', error)
      throw error
    }
  }

  export const getLoginUserDetails= ()=> {
    const userData = localStorage.retrieve('userData');
    if (userData !== null) {
      userDetails.id = userData.data[0].UserID;
      userDetails.firstName = userData.data[0].FirstName;
      userDetails.lastName = userData.data[0].LastName;
      userDetails.email = userData.data[0].email;
      userDetails.mobileNumber = userData.data[0].MobileNumber;
    }
    return userDetails;
  }

  export default {login, getLoginUserDetails,isLoggedIn, getUserShipping}