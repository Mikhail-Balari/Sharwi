import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE = () =>
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api";

export async function loginUser(email: string, password: string) {
  const res = await fetch(`${BASE()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Login failed");
  }

  await AsyncStorage.setItem("sharwi_token", data.accessToken);
  await AsyncStorage.setItem("sharwi_user", JSON.stringify(data.user));

  return data;
}

export async function registerUser(payload: {
  email: string;
  password: string;
  fullName: string;
  headline: string;
}) {
  const res = await fetch(`${BASE()}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payload.email,
      password: payload.password,
      fullName: payload.fullName,
      headline: payload.headline,
      bio: "",
      location: "",
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Registration failed");
  }

  await AsyncStorage.setItem("sharwi_token", data.accessToken);
  await AsyncStorage.setItem("sharwi_user", JSON.stringify(data.user));

  return data;
}

export async function logoutUser() {
  await AsyncStorage.removeItem("sharwi_token");
  await AsyncStorage.removeItem("sharwi_user");
}

export async function getStoredUser() {
  const raw = await AsyncStorage.getItem("sharwi_user");
  return raw ? JSON.parse(raw) : null;
}

export async function getStoredToken() {
  return AsyncStorage.getItem("sharwi_token");
}
