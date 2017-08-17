export function getData(dbRef) {
	return (dispatch) => {
		dispatch({ type : 'FETCH_DATA' });
		dbRef.once('value', (snapshot) => {
			dispatch({
				type : 'DATA_FETCHED',
				payload : snapshot.val()
			});
		}, (error) => {
				dispatch({
					type : 'FETCH_ERROR',
					payload : error
				});
			console.log(error);
		})
	};
} 