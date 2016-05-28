let endRound = (dispatch, getState) => {
    dispatch({ type: 'ROUND_END' });
    
    let state = getState();
    
    if (state.get('roundsRemains') == 0) {
        dispatch({ type: 'GAME_END' });
    } else {
        dispatch({ type: 'ROUND_BEGIN' });
    }
};

export { endRound };
