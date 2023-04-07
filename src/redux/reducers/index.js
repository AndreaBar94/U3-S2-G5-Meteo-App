const initialState = {
	favourites: {
		content: [],
	},
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SEARCH":
			return {
				...state,
				search: {
					...state.search,
					content: [...state.search.content, action.payload],
				},
			};
		default:
			return state;
	}
};

export default mainReducer;
