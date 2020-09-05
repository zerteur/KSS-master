const logInForm = document.querySelector("#logIn")

logInForm.addEventListener("submit", (e) => {

  let password = e.target[1].value
  // if (!(password.match(/[0-9]/g) && password.match(/[a-z]/g) && password.length >= 10)) {
  //   e.preventDefault()
  // }
  let pseudo = e.target[0].value
  // if (!(pseudo != null && pseudo.length > 0)) {
  //   e.preventDefault()
  // }
})