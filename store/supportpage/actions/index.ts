export const INSERT_SUPPORTPAGE_SUCCESS = 'INSERT_SUPPORTPAGE_SUCCESS';
export const INSERT_SUPPORTPAGE_FAILURE = 'INSERT_SUPPORTPAGE_FAILURE';
export const INSERT_SUPPORT_DATA = 'INSERT_SUPPORT_DATA';

export function putSupportPage(data: any) {
    return { type: INSERT_SUPPORT_DATA, payload: data }
  }
