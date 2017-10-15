let productIsDisplayed = false;
let productContainer;
let productSection;
let generateBtn;
let generateContainer;
let productInfoContainer;
let purchaseBtn;
let productTitle;
let loadingGif;

(()=> {
    document.addEventListener('DOMContentLoaded', () => {
        productContainer = document.getElementById('productContainer');
        productSection = document.getElementById('productSection');
        generateBtn = document.getElementById('generateBtn');
        generateContainer = document.getElementById('generateContainer');
        productInfoContainer = document.getElementById('productInfoContainer');
        purchaseBtn = document.getElementById('purchaseBtn');
        productTitle = document.getElementById('productTitle');
        loadingGif = document.getElementById('loadingGif');
        generate();
    });
})();

function generate() {
    generateBtn.className += ' generate__btn-disabled';
    generateContainer.className += ' generate__btn-container-loading';
    if(!productIsDisplayed) {
        // particles.forEach(particle => {
        //     particle.velocity = 0.05;
        // });
        requestData('POST', '/generate').then((details) => {
            let product = JSON.parse(details);
            if (!product.DetailPageURL) {
                return toastr.error('Oh No! Something went wrong. Please wait a few seconds and refresh the page');
            }
            // setTimeout(() => {
            //     particles.forEach(particle => {
            //        particle.velocity = 0.02;
            //     });
            // }, 3500);
            setTimeout(() => {
                loadingGif.style.display = 'none';
                buildLink(product);
                buildInfo(product);
                generateBtn.classList.remove('generate__btn-disabled');
                generateContainer.classList.remove('generate__btn-container-loading');
            }, 5000);
            productIsDisplayed = true;
        }).catch((err) => {
            return toastr.error('Oh No! Something went wrong. Try refreshing the page');
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
    purchaseBtn.setAttribute('href', data.DetailPageURL);
    purchaseBtn.setAttribute('target', '_blank');
    productTitle.innerText = data.Title;
    productInfoContainer.classList.add('btn-container__visible');
    productTitle.classList.add('product__title-visible');
}

function removeLink() {
    let aTag = document.getElementById('productLink');
    setTimeout(() => {
        loadingGif.style.display = 'block';
    }, 1700);
    setTimeout(() => {
        aTag.parentNode.removeChild(aTag);
    }, 1500);
    aTag.className += ' fade-out';
    productIsDisplayed = false;
}

function removeInfo() {
    productInfoContainer.classList.remove('btn-container__visible');
    productTitle.innerText = '';
    productTitle.classList.remove('product__title-visible');
}
