import {Observable} from 'rxjs';
import {
  FETCH,
  FETCH_CANCELLED,
  FETCH_FAILURE,
} from './DetailActionTypes';
import {combineEpics} from 'redux-observable';
import {fetchSuccess, fetchError} from './DetailActions';
import {
  get,
  parseXHRError
} from './../api/index';

const pollingInterval = 5000; // Time in ms

export const fetch = (action$, store, call = (fn, ...args) => fn(...args)) => action$.ofType(FETCH)
  .switchMap(({url}) => Observable.timer(0, pollingInterval)
      .startWith(0)
      .takeUntil(
        Observable.merge(
          action$.ofType(FETCH),
          action$.ofType(FETCH_FAILURE),
          action$.ofType(FETCH_CANCELLED),
        )
      )
      .mergeMap(() => {
        const state = store.getState();
        const {url: gohanUrl} = state.configReducer.gohan;
        const headers = {
          'Content-Type': 'application/json',
          'X-Auth-Token': state.authReducer.tokenId
        };

        return call(get, `${gohanUrl}${url}`, headers)
          .map(response => fetchSuccess(response.response))
          .catch(error => {
            console.error(error);
            return Observable.of(fetchError(parseXHRError(error)));
          });
      })
  );

export default combineEpics(
  fetch,
);
