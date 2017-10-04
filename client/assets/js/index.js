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
            console.log(product);
            setTimeout(() => {
                particles.forEach(particle => {
                   particle.velocity = 0.02;
                });
            }, 3500);
            setTimeout(() => {
                canvas.style.display = 'none';
                buildLink(product);
            }, 5000);
            productIsDisplayed = true;
        }).catch((err) => {
            console.log('Error occurred', err.statusText);
        });
    } else {
        removeLink();
        generate();
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
        setTimeout(() => {
            xhr.send();
        }, 2500); //limit rate of request
    });
}

function buildLink(data) {
    let aTag = document.createElement('a');
    let img = document.createElement('img');
    aTag.setAttribute('id', 'productLink');
    aTag.setAttribute('href', data.DetailPageURL);
    aTag.setAttribute('target', '_blank');
    img.setAttribute('src', data.image.URL);
    aTag.appendChild(img);
    aTag.className += 'fade-in';
    img.className += 'product__image';
    productContainer.className += 'productContainer-image';
    productContainer.appendChild(aTag);
}

function removeLink() {
    let aTag = document.getElementById('productLink');
    setTimeout(() => {
        canvas.style.display = 'block';
    }, 1700);
    setTimeout(() => {
        aTag.parentNode.removeChild(aTag);
    }, 1500);
    aTag.className += ' fade-out';
    productIsDisplayed = false;
}