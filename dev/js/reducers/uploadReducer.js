const initialState = {
	error : "",
	isLoading : false
};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'START_UPLOAD':
			return {
				...state,
				isLoading : true
			};
		break;

		case 'UPLOAD_FINISH':
			return {
				...state,
				isLoading : false
			}
		break;

		case 'ERROR':
			return {
				...state,
				error : action.payload
			}
		break;
	}
}