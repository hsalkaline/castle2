var reducer = (state, action) => {
    let players = state.get('players');

    if(state.get('gameEnded')) {
        throw 'game over!';
    }
    
    switch (action.type) {
    case 'ROUND_BEGIN':
        return state
            .set('players', players.update(
                players.findIndex(item => item.get('color') == state.get('currentPlayer')),
                item => item.setIn(['resources', 'gold'], item.getIn(['resources', 'gold']) + 1)
            ))
            .set('roundsRemains', state.get('roundsRemains') - 1);
        
    case 'PLAY_CARD':
        switch(action.card.type) {
        case 'MESSENGER':
            return state.set('players', players.update(
                players.findIndex(item => item.get('color') == action.player),
                item => item.setIn(['resources', 'gold'], item.getIn(['resources', 'gold']) + 1)
            ));
        }

    case 'ROUND_END':
        let colors = state.get('players').toSeq().map(item => item.get('color')),
        currentIndex = colors.findIndex(color => color == state.get('currentPlayer')),
        nextIndex = (currentIndex + 1) % colors.size;

        return state.set('currentPlayer', colors.get(nextIndex));
    case 'GAME_END':
        return state.set('gameEnded', true);
        
    default: return state;
    }
};


export { reducer };


        
