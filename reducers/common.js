const transferGold = (state, from, to, amount) => {
    const actualAmount = Math.min(state.getIn([...from, 'gold']), amount);

    return state
        .updateIn([...to, 'gold'], x => x + actualAmount)
        .updateIn([...from, 'gold'], x => x - actualAmount);
};

const getPlayerPath = (state, player) => {
    const index = state.get('players').findIndex(item => item.get('color') == player);
    
    if (index == -1) {
        throw 'incorrect player color';
    }
    
    return ['players', index];
};

export {
    transferGold,
    getPlayerPath
};
