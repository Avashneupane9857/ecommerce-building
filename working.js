const bar = document.getElementById('bar')

const list = document.querySelector('.list')
// console.log(list)
if (bar) {
    bar.addEventListener('click', () => {

        list.classList.add('active')
    })
}
const close = document.querySelector(".close")
if (close) {
    close.addEventListener('click',
        () => {
            list.classList.remove('active')
        })
}

