const initialState = {
	favourites: {
		content: [],
	},
};

const mainReducer = (state = initialState, action) => {
	switch (action.type) {
		case "1":
			return {};
		case "2":
			return {};
		default:
			return state;
	}
};

export default mainReducer;
