import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'service/logger';

import { reducer } from 'reducers';
import {
    startGame,
    beginRound,
    endRound,
    playCard,
    placeTrader
} from 'actions';

let store = createStore(
    reducer,
    Immutable.Map({}),
    applyMiddleware(thunk)
);

store.subscribe(() => {
    const error = store.getState().get('error');
    
    if (error) {
        throw JSON.stringify(error, 2, 2);
    }
});

store.dispatch(startGame(['red', 'blue']));
store.dispatch(beginRound());

store.dispatch(playCard('blue', { type: 'MESSENGER' }));
store.dispatch(playCard('red', { type: 'TRADER' }));

store.dispatch(placeTrader('red', 'sand'));

store.dispatch(endRound());

console.log(JSON.stringify(store.getState().toJS(), 2, 2));
