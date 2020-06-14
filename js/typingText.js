const fullscreen = document.querySelector('.fullscreen')

new TypeIt("#typingText", {
  speed: 10,
  waitUntilVisible: true
}).type("Привет,", {delay: 100})
.break()
.type("Меня зовут Степан")
.break()
.pause(350)
.type("Я frontend разработчик")
.break()
.break()
// .pause(750)
.type("Нажмите любую клавишу, чтобы продолжить...")
.go()
.exec(() => {
  document.addEventListener('keypress', () => {
    fullscreen.classList.add('active')
  })
  fullscreen.addEventListener('click', () => {
    fullscreen.classList.add('active')
  })
})