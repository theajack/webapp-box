/*
 * @Author: chenzhongsheng
 * @Date: 2023-03-15 23:58:59
 * @Description: Coding something
 */
window.jsboxCode = {
    lib: 'https://cdn.jsdelivr.net/npm/webapp-box',
    lang: 'html',
    code: /* html */`<button onclick="addNewBox()">addNewBox</button>
<script>
    let index = 0;
    function createDiv() {
        let div = document.createElement('div');
        div.innerText = 'currentPageIndex = ' + (++index) + '; ';
        const button = document.createElement('button');
        button.innerText = 'addNewBox';
        button.onclick = () => {WebappBox.add(createDiv())};
        div.appendChild(button)
        return div;
    }
    function addNewBox(){
        index = 0;
        WebappBox.add(createDiv());
    }
</script>`
};
