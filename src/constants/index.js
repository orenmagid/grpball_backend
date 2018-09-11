export const API_ROOT = "http://localhost:3000/api/v1";
export const API_WS_ROOT = "ws://localhost:3000/cable";

// export const API_ROOT = "https://grpball-backend.herokuapp.com/api/v1";
// export const API_WS_ROOT = "wss://grpball-backend.herokuapp.com/cable";

export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
  Authorization: `Bearer ${localStorage.getItem("token")}`
};

export const baseUrl = "http://localhost:3000/api/v1";
// export const baseUrl = "https://grpball-backend.herokuapp.com/api/v1";

export const baseUrlForFeed = "https://localhost:300";
// export const baseUrlForFeed = "https://grpball-backend.herokuapp.com";
