export type LoginPayload = {
  email: string;
  password: string;
};

export async function login(payload: LoginPayload) {
  return Promise.resolve({
    accessToken: "demo-token",
    user: {
      email: payload.email,
    },
  });
}
