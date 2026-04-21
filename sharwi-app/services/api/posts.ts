import { getStoredToken } from "./auth";

const BASE = () =>
  process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:4000/api";

export async function savePost(payload: {
  workInput: string;
  generatedText: string;
  tone: string;
  evidenceChips: string[];
  status: "draft" | "published";
}) {
  try {
    const token = await getStoredToken();

    if (!token) {
      return null;
    }

    const res = await fetch(`${BASE()}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        workInput: payload.workInput,
        generatedText: payload.generatedText,
        tone: payload.tone,
        evidenceChips: payload.evidenceChips,
        status: payload.status,
      }),
    });

    if (!res.ok) {
      return null;
    }

    return await res.json();
  } catch {
    return null;
  }
}

export async function getUserPosts() {
  try {
    const token = await getStoredToken();

    if (!token) {
      return [];
    }

    const res = await fetch(`${BASE()}/posts`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return [];
    }

    return await res.json();
  } catch {
    return [];
  }
}
