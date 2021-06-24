import { User, UserLogin } from "../interfaces/user";

export async function register(data: User) {
  const tmpUser = data;
  delete tmpUser.rePassword;
  const response = await fetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tmpUser),
  });
  return await response.json();
}

export async function login(data: UserLogin) {
  const response = await fetch("/api/authU/loginU", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return await response.json();
}

export async function confirmAccount(token: string) {
  const response = await fetch(`/api/authU/confirmUser`, {
    headers: {
      confirm: token
    }
  })
  return response.json()
}

export async function forgotPassword(email: string) {
  const data = { email }
  const response = await fetch('/api/authU/forgot-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  return response.json()
}

export async function resetPassword(newPassword: {}, resetToken: string) {
  const response = await fetch('/api/authU/new-password', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      reset: resetToken
    },
    body: JSON.stringify(newPassword)
  })
  return response.json()
}