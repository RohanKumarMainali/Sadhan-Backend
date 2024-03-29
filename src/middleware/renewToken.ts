import axios from "axios";
const url = "https://sadhan-backend.onrender.com/api";

const getTokenFromCookies = async () => {
  const response = await axios.get(`${url}/token`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  let accessToken = "";
  let refreshToken = "";
  if (response) {
    accessToken = response.data.accessToken;
    refreshToken = response.data.refreshToken;
  }
  return { accessToken, refreshToken };
};

const renewToken = async () => {
  try {
    const { refreshToken } = await getTokenFromCookies();

    if (refreshToken !== "") {
      const response = await axios(`${url}/renewToken`, {
        method: "post",
        data: { refreshToken: refreshToken },
        withCredentials: true,
      });
      const details = response.data.payload;
      localStorage.setItem("user", JSON.stringify(response.data.payload));

      return details.role;
    }
  } catch (error: any) {
    return "";
  }
};

const renewTokenInterval = async () => {
  await renewToken();
};

module.exports = renewTokenInterval;
