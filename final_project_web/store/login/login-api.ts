const jwt = require("jsonwebtoken");

export type LoginFormData = {
  userId: string;
  password: string;
};

export const login = async (formData: LoginFormData) => {
  console.log("formdata", formData);
  try {
    const response = await fetch("http://localhost:5000/userLogin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const responseData = await response.json();
      if (responseData.token) {
        // Token is present in the response data
const token = responseData.token;

// Decode the token
const decodedToken = jwt.decode(token);
console.log("decodedToken", decodedToken);
        localStorage.setItem("token", responseData.token); // Store the token in local storage
        return responseData;
      } else {
        throw new Error("Token not found in the response data");
      }
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || "Network response was not ok");
    }
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
