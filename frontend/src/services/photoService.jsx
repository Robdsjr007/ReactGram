import { api, requestConfig } from "../utils/config";

// publish an user photo
const publishPhoto = async (data, token) => {
	const config = requestConfig("POST", data, token, true);

	try {
		const res = await fetch(api + "/photos", config)
			.then((res) => res.json())
			.catch((err) => err);
		return res;
	} catch (error) {
		console.log("Erro ao publicar photos: ", error.message);
	}
};

// Get user photos
const getUserPhotos = async (id, token) => {
	const config = requestConfig("GET", null, token);
	try {
		const res = await fetch(api + "/photos/user/" + id, config)
			.then((res) => res.json())
			.catch((err) => console.error("Erro na requisiçãp:", err));
		return res;
	} catch (error) {
		console.log("Erro ao tentar obter dados: ", error);
	}
};

// Delete a photo
const deletePhoto = async (id, token) => {
	const config = requestConfig("DELETE", null, token);

	try {
		const res = await fetch(api + "/photos/" + id, config)
			.then((res) => res.json())
			.catch((err) => console.error("Erro na requisição delete:", err));
		return res;
	} catch (error) {
		console.log("Error ao tentar deletar:", error.message);
	}
};

// Update a photo
const updatePhoto = async (data, id, token) => {
	const config = requestConfig("PUT", data, token);

	try {
		const res = await fetch(api + "/photos/" + id, config)
			.then((res) => res.json())
			.catch((err) => console.error("Erro na requisição put:", err));
		return res;
	} catch (error) {
		console.log("Erro ao tentar atualizar:", error.message);
	}
};

// Get a photo by id
const getPhoto = async (id, token) => {
	const config = requestConfig("GET", null, token);

	try {
		const res = await fetch(api + "/photos/" + id, config)
			.then((res) => res.json())
			.catch((err) => console.error("Erro na requisição get:", err));
		return res;
	} catch (error) {
		console.log("Erro ao tentar obter:", error.message);
	}
};

// Like a photo
const like = async (id, token) => {
	const config = requestConfig("PUT", null, token);

	try {
		const res = await fetch(api + "/photos/like/" + id, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log("Erro ao tentar dar like:", error);
	}
};

// Add comment to a photo
const comment = async (data, id, token) => {
	const config = requestConfig("PUT", data, token);

	try {
		const res = await fetch(api + "/photos/comment/" + id, config)
			.then((res) => res.json())
			.catch((err) => err);
		return res;
	} catch (error) {
		console.log("Erro ao tentar comentar:", error);
	}
};

// Get all photos
const getPhotos = async (token) => {
	const config = requestConfig("GET", null, token);

	try {
		const res = await fetch(api + "/photos", config)
			.then((res) => res.json())
			.catch((err) => err);
		return res;
	} catch (error) {
		console.log(error.message);
	}
};

// Search photos by title
const searchPhotos = async (query, token) => {
	const config = requestConfig("GET", null, token);

	try {
		const res = await fetch(api + "/photos/search?q=" + query, config)
			.then((res) => res.json())
			.catch((err) => err);

		return res;
	} catch (error) {
		console.log(error);
	}
};

const photoService = {
	publishPhoto,
	getUserPhotos,
	deletePhoto,
	updatePhoto,
	getPhoto,
	like,
	comment,
	getPhotos,
	searchPhotos,
};

export default photoService;
