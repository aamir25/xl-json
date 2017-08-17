export function upload(file, storageRef) {
	return (dispactch) => {
		let uploadTask = storageRef.put(file);

		dispactch({ type : 'START_UPLOAD' });

		uploadTask.on('state_changed', function(snapshot) {
			var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
			console.log('Upload is ' + progress + '% done.');
			switch (snapshot.state) {
			    case firebase.storage.TaskState.PAUSED: // or 'paused'
			      console.log('Upload is paused');
		          break;
			    case firebase.storage.TaskState.RUNNING: // or 'running'
			      console.log('Upload is running');
			      break;
	    	}
		}, function(error) {
			console.log(error);
			dispactch({
				type : 'ERROR',
				payload : error
			});
		}, function() {
			//getting the poster url.
			let fileURL = uploadTask.snapshot.downloadURL;
			/* set up XMLHttpRequest */
			var oReq = new XMLHttpRequest();
			var sheetObject;
			var worksheet;

			oReq.open("GET", fileURL, true);
			oReq.responseType = "arraybuffer";

			oReq.onload = function(e) {
				var arraybuffer = oReq.response;

				/* convert data to binary string */
				var data = new Uint8Array(arraybuffer);
				var arr = new Array();
				for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
				var bstr = arr.join("");

				/* Call XLSX */
				var workbook = XLSX.read(bstr, {type:"binary"});

				/* DO SOMETHING WITH workbook HERE */
				var first_sheet_name = workbook.SheetNames[0];
				/* Get worksheet */
				worksheet = workbook.Sheets[first_sheet_name];
				sheetObject = XLSX.utils.sheet_to_json(worksheet,{raw:true});
			  
				//dbRef.ref(user.uid + '/sheets/' + file.name.split('.')[0]).push(sheetObject);
				console.log(sheetObject);
			}

			oReq.send();
		});

		dispactch({ type : 'UPLOAD_FINISH' });
	}
}