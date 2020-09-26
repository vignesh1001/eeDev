import { logger } from '../utils/logger'
import api from './api'

const submitSupportPage = async (supportdata:any) => {
  try {
    const action = '/user/send_supportpage_mail/'
    const result = await api.postData(action,supportdata)

    return result.data
  } catch (error) {
    logger('error.response', error)
    throw error
  }
}
export default submitSupportPage;
