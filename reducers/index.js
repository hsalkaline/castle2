import { transferGold, getPlayerPath } from './common';
import messenger from './cards/messenger';

var reducer = (state, action) => {
    if (state.get('gameEnded')) {
        throw {
            action,
            error: 'game over!'
        };
    }
    
    switch (action.type) {
    case 'ROUND_BEGIN': {
        return transferGold(
            state,
            ['treasury'],
            [...getPlayerPath(state, state.get('currentPlayer')), 'resources'],
            1
        ).update('roundsRemains', x => x - 1);
    }
        
    case 'PLAY_CARD': {
        let playerPath = getPlayerPath(state, action.player),
            cardType = action.card.type,
            cardIndex = state.getIn([...playerPath, 'cards', 'hand']).findIndex(card => card == cardType);

        if (cardIndex == -1) {
            throw {
                action,
                error: 'cant play specified card: player have no such card in hand'
            };
        }

        state = state.updateIn(
            playerPath,
            item => item
                .deleteIn(['cards', 'hand', cardIndex])
                .updateIn(['cards', 'discardPile'], list => list.push(cardType))
        );
        
        switch(cardType) {
            
        case 'MESSENGER':
            return messenger(state, action.player);
        }
    }

    case 'ROUND_END': {
        let colors = state.get('players').map(item => item.get('color')),
            currentIndex = colors.findIndex(color => color == state.get('currentPlayer')),
            nextIndex = (currentIndex + 1) % colors.size;
        
        return state.set('currentPlayer', colors.get(nextIndex));
    }
        
    case 'GAME_END': { 
        return state.set('gameEnded', true);
    }
        
    default: return state;
    }
};

export { reducer };


        
