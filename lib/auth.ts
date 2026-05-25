export function setLoginSession() {

  const expiredAt =
    Date.now() + 24 * 60 * 60 * 1000

  localStorage.setItem(
    "isLogin",
    "true"
  )

  localStorage.setItem(
    "expiredAt",
    expiredAt.toString()
  )

  document.cookie =
    "isLogin=true; path=/; max-age=86400"
}

export function logoutSession() {

  localStorage.removeItem("isLogin")

  localStorage.removeItem("expiredAt")

  document.cookie =
    "isLogin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

export function checkLoginSession() {

  const isLogin =
    localStorage.getItem("isLogin")

  const expiredAt =
    localStorage.getItem("expiredAt")

  if (!isLogin || !expiredAt) {
    return false
  }

  const now = Date.now()

  if (now > Number(expiredAt)) {

    logoutSession()

    return false
  }

  return true
}