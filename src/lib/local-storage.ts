const isWindowUndefined = typeof window === "undefined"

export function getStoredUsername() {
  if (isWindowUndefined) {
    return ""
  }

  return localStorage.getItem("username") ?? ""
}

export function setUsernameOnStorage(username: string) {
  if (isWindowUndefined) {
    return
  }

  localStorage.setItem("username", username)
}
