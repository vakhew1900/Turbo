export function makeAdaptiveTextArea(textarea) {
    textarea.setAttribute('style', 'height:' + (textarea.scrollHeight) + 'px;overflow-y:hidden;');
    textarea.addEventListener("input", OnInput, false);
}

function OnInput() {

    this.style.height = 'auto';

    this.style.height = (this.scrollHeight) + 'px';

}