import $http from "./api";

export async function loginService(data) {
  try {
    const login = await $http.post("auth/login", data);
    return login.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
}

export async function registerService(data) {
  try {
    const login = await $http.post("auth/signup", data);
    return login.data;
  } catch (error) {
    return error?.response?.data || error.message;
  }
}

export async function forgetPasswordService(data) {
  try {
    const login = await $http.post("auth/forgot-password", data);
    return login.data;
  } catch (error) {
    return { message: error.message, error: error?.response?.data || true };
  }
}

export async function changePasswordService(data) {
  try {
    const login = await $http.post("auth/change-password", data);
    return login.data;
  } catch (error) {
    return { message: error.message, error: error?.response?.data || true };
  }
}

export async function verifyOTPService(data) {
  try {
    const login = await $http.post("auth/verify", data);
    return login.data;
  } catch (error) {
    return { message: error.message, error: error?.response?.data || true };
  }
}
