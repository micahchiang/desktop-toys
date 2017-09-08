function generate() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://localhost:8000/generate', true);
    xhr.onload = () => {
        if (xhr.status === 200) {
            console.log(xhr.response);
        } else {
            console.log(xhr.status);
        }
    }
    xhr.send();
}