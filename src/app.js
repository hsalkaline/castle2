import Immutable from 'immutable';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import { reducer } from 'reducers';
import {
    beginRound,
    endRound,
    playCard
} from 'actions';

const initialState = Immutable.fromJS({
    treasury: {
        gold: 20
    },
    players: [
        {
            color: 'red',
            resources: {
                gold: 1
            },
            cards: {
                hand: Immutable.Set(['MESSENGER']),
                discardPile: Immutable.Set([])
            }
        },
        {
            color: 'blue',
            resources: {
                gold: 1
            },
            cards: {
                hand: Immutable.Set(['MESSENGER']),
                discardPile: Immutable.Set([])
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

store.dispatch(beginRound());

store.dispatch(playCard('blue', { type: 'MESSENGER' }));
store.dispatch(playCard('red', { type: 'MESSENGER' }));

store.dispatch(endRound());

console.log(JSON.stringify(store.getState().toJS(), 2, 2));
