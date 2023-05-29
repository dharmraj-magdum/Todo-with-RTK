const setTokens = (token) => {
	// let tokens = {
	// 	access_token: token.access,
	// 	refresh_token: token.refresh,
	// };
	// document.cookie = `tokens=${JSON.stringify(tokens)}`;
	document.cookie = `access_token=${token.access}`;
	document.cookie = `refresh_token=${token.refresh}`;
};

const getToken = (type) => {
	let Str = "";
	if (type == 1) {
		Str = "access_token";
	}
	if (type == 2) {
		Str = "refresh_token";
	}
	let token = "";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == " ") {
			c = c.substring(1);
		}
		if (c.indexOf(Str) == 0) {
			token = c.substring(Str.length + 1, c.length);
			return token;
		}
	}
	// console.log(token);
	// return false;
	return token;
};

const removeTokens = () => {
	document.cookie = "access_token=;";
	document.cookie = "refresh_token=;";
	// const cookies = document.cookie.split("; ");
	// //split("; ") not split(";") seperated by space also
	// cookies.forEach((cookie) => {
	// 	// console.log(cookie);
	// 	if (cookie.startsWith(" tokens")) {
	// 		console.log("start with");
	// 		console.log(cookie);
	// 		cookie.replace("tokens", "");
	// 		// cookie = "";
	// 	}
	// });
};

export { setTokens, getToken, removeTokens };
