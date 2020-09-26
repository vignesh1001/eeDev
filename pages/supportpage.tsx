import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NextPage } from 'next';
import { END } from 'redux-saga';
import { INSERT_SUPPORT_DATA } from '../store/supportpage/actions';
import { putSupportPage} from '../store/supportpage/actions';
import { wrapper } from '../store';
import useSWR from 'swr'
import SupportPage from '../components/supportPage';
import { loadHeaderData, loadFooterData } from '../store/common/actions';
import { ToastProvider, useToasts } from 'react-toast-notifications'

const supportPageUI: any = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    //dispatch(startClock());
  });
  return <ToastProvider><SupportPage /></ToastProvider>;
};

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {
  store.dispatch(loadHeaderData());
   store.dispatch(loadFooterData());
   //store.dispatch(putSupportPage())
   store.dispatch(END);
   await store.sagaTask?.toPromise();
 });

export default supportPageUI;
