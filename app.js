import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers';
import { endRound } from './actions';
import Immutable from 'immutable';

const initialState = Immutable.fromJS({
    players: [
        {
            color: 'red',
            resources: {
                gold: 1
            }
        },
        {
            color: 'blue',
            resources: {
                gold: 1
            }
        },
        {
            color: 'yellow',
            resources: {
                gold: 1
            }
        }
    ],
    currentPlayer: 'red',
    roundsRemains: 1
});

let store = createStore(
    reducer,
    initialState,
    applyMiddleware(thunk)
);

store.dispatch({
    type: 'ROUND_BEGIN'
});

store.dispatch({
    type: 'PLAY_CARD',
    card: { type: 'MESSENGER' },
    player: 'blue'
});

store.dispatch({
    type: 'PLAY_CARD',
    card: { type: 'MESSENGER' },
    player: 'red'
});

store.dispatch(endRound);

console.log(JSON.stringify(store.getState().toJS(), 2, 2));
