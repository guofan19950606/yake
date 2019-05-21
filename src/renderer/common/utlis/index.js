export function objectToFormData(obj, form, namespace) {
	const fd = form || new FormData();
	let formKey;
	
	for (let property in obj) {
		if (obj.hasOwnProperty(property)) {
			let key = Array.isArray(obj) ? '' : `.${property}`;
			if (namespace) {
				formKey = namespace + key;
			} else {
				formKey = property;
			}
			
			// if the property is an object, but not a File, use recursivity.
			if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
				objectToFormData(obj[property], fd, formKey);
			} else if (obj[property] === '') {
				// 空文件不做处理
			} else {
				// if it's a string or a File object
				fd.append(formKey, obj[property]);
			}
			
		}
	}
	
	return fd;
	
}

export function f(obj, form, namespace) {
	console.log(obj)
	let fd = form || new FormData();
	let formKey;
	Object.keys(obj).map(property => {
		let key = Array.isArray(obj) ? '' : `.${property}`;
		if (namespace) {
			formKey = `${namespace}${key}`
		} else {
			formKey = property
		}
		// if the property is an object, but not a File, use recursivity.
		if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
			f(obj[property], fd, formKey);
		} else if (obj[property] === '') {
			// 空文件不做处理
		} else {
			// if it's a string or a File object
			fd.append(formKey, obj[property]);
		}
	})
	return fd
}
