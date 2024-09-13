export const api = "http://localhost:5000/api";
export const uploads = "http://localhost:5000/uploads";

export const requestConfig = (method, data = null, token = null, image = null) => {
  let config;

  if (image) {
      config = {
          method: method,
          body: data,
          headers: {},
      };
  } else if (method === "DELETE" || data === null) {
      config = {
          method: method,
          headers: {},
      };
  } else {
      config = {
          method: method,
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          },
      };
  }

  // Add token in header if exists
  if (token) {
      config.headers.Authorization = `Bearer ${token}`;
  }

  // For request GET, add a empty body and necessary headers
  if (method === "GET") {
      config = {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
              ...(token && { Authorization: `Bearer ${token}` }), // Adiciona o token se existir
          },
      };
  }

  return config;
};