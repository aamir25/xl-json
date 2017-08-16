const initialState = {
	data : [],
	error : "",
	isLoading : false
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'FETCH_DATA':
			return {
				...state,
				isLoading : true
			};
		break;

		case 'DATA_FETCHED':
			return {
				...state,
				data : action.payload,
				isLoading : false
			}
		break;

		case 'ERROR':
			return {
				...state,
				error : action.payload,
				isLoading : false
			}
		break;
	}
	return state;
}