import UserActionTypes from "./action-types";

const initialState = {
    searchType: null,
    pokeInfo: null,
    pokeCount: 1026,
    pag: 1
}

const userReducer = (state = initialState, action) => {
    if (action.type === UserActionTypes.ToPokemon) {
        return { ... state, searchType: 0};
    }
    if (action.type === UserActionTypes.ToType) {
        return { ... state, searchType: 1};
    }
    if (action.type === 'id') {
        return { ... state, pokeInfo: action.payload }; 
    }
    if (action.type === 'page') {
        return { ... state, pag: action.payload };
    }

    return state;
}

export default userReducer;