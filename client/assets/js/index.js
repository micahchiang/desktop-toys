let productIsDisplayed = false;
let productContainer;
let productSection;
let generateBtn;

(()=> {
    document.addEventListener('DOMContentLoaded', () => {
        productContainer = document.getElementById('productContainer');
        productSection = document.getElementById('productSection');
        generateBtn = document.getElementById('generateBtn');
    });
})();

function generate() {
    generateBtn.className += ' generate__btn-disabled';
    if(!productIsDisplayed) {
        particles.forEach(particle => {
            particle.velocity = 0.05;
        });
        requestData('POST', '/generate').then((details) => {
            let product = JSON.parse(details);
            setTimeout(() => {
                particles.forEach(particle => {
                   particle.velocity = 0.02;
                });
            }, 3500);
            setTimeout(() => {
                canvas.style.display = 'none';
                buildLink(product);
                buildInfo(product);
                generateBtn.classList.remove('generate__btn-disabled');
            }, 5000);
            productIsDisplayed = true;
        }).catch((err) => {
            console.log('Error occurred', err.statusText);
        });
    } else {
        removeLink();
        removeInfo();
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
        xhr.send();
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
    // productContainer.className += ' slide-left';
}

function buildInfo(data) {
    let container = document.createElement('div');
    let title = document.createElement('h1');
    let feature = document.createElement('p');
    let brand = document.createElement('p');
    let cta = document.createElement('a');
    container.setAttribute('id', 'productInfo');
    title.innerText = data.Title;
    title.style.fontWeight = '500';
    feature.innerText = data.Feature;
    brand.innerText = 'Brand: ' + data.Brand;
    cta.setAttribute('href', data.DetailPageURL);
    cta.setAttribute('target', '_blank');
    cta.innerText = 'Buy on Amazon';
    cta.className += 'purchase__btn';
    container.appendChild(title);
    container.appendChild(feature);
    container.appendChild(brand);
    container.appendChild(cta);
    container.className += 'productContainer-details fade-in';
    productSection.appendChild(container);
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

function removeInfo() {
    let container = document.getElementById('productInfo');
    setTimeout(() => {
        container.parentNode.removeChild(container);
    }, 1500);
    container.className += ' fade-out';
}
