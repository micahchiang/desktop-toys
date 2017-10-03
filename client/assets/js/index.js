let productIsDisplayed = false;
let productContainer;

(()=> {
    document.addEventListener('DOMContentLoaded', () => {
        productContainer = document.getElementById('productContainer');
    });
})();

function generate() {

    if(!productIsDisplayed) {
        particles.forEach(particle => {
            particle.velocity = 0.05;
        });
        requestData('GET', 'http://localhost:8000/generate').then((details) => {
            let product = JSON.parse(details);
            particles.forEach(particle => {
               particle.velocity = 0.02;
            });
            setTimeout(() => {
                canvas.style.display = 'none';
                buildLink(product);
            }, 5000);
        }).catch((err) => {
            console.log('Error occurred', err.statusText);
        });
    }
}

function requestData(method, url) {
    return new Promise((resolve, reject) => {
        var xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject({
                 status: this.status,
                 statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = () => {
            reject({
                status: this.status,
                statusText: xhr.statusText
            });
        };
        xhr.send();
    });
}

function buildLink(data) {
    let aTag = document.createElement('a');
    let img = document.createElement('img');
    aTag.setAttribute('href', data.DetailPageURL);
    aTag.setAttribute('target', '_blank');
    img.setAttribute('src', data.image.URL);
    img.style.height = '60vh';
    img.style.width = 'auto';
    aTag.appendChild(img);
    aTag.className += 'fade-in';
    productContainer.appendChild(aTag);
}