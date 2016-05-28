import { transferGold, getPlayerPath } from '../common';

const messenger = (state, player) => transferGold(
    state,
    ['treasury'],
    [...getPlayerPath(state, player), 'resources'],
    8
);

export default messenger;
