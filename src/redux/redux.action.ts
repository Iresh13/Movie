import {EAPP_REDUCERS} from '../app/app.constant';

export const updateImages = (movies: any) => {
  return async function (dispatch: any) {
    dispatch({
      type: EAPP_REDUCERS.SAVE_MOVIES,
      payload: movies,
    });
  };
};
