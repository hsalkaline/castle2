import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducers';
import {
    beginRound,
    endRound
} from './actions';
import Immutable from 'immutable';

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
                hand: ['MESSENGER'],
                discardPile: []
            }
        },
        {
            color: 'blue',
            resources: {
                gold: 1
            },
            cards: {
                hand: ['MESSENGER'],
                discardPile: []
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
