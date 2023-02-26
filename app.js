
const loadPhones = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayPhone(data.data, dataLimit);
    } catch (error) {
        console.log(error);
    }
}

const displayPhone = (phones, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.innerHTML = ''
    if (dataLimit && phones.length > dataLimit) {
        phones = phones.slice(0, dataLimit)
        document.getElementById('load_more').classList.remove('d-none')
    } else {
        document.getElementById('load_more').classList.add('d-none')
    }

    const noPhone = document.getElementById('no_found_message')
    if (phones.length === 0) {
        noPhone.classList.remove('d-none')
    } else {
        noPhone.classList.add('d-none')
    }

    phones.forEach(phone => {
        // console.log(phone);
        const { phone_name, slug, image } = phone;
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
            <div class="col">
            <div class="card">
                <img src="${image}" class="card-img-top p-4 pb-2" alt="${phone_name}">
                <div class="card-body">
                    <h5 class="card-title">${phone_name}</h5>
                    <p class="card-text">This is a longer card with supporting text below as a natural
                        lead-in to additional content. This content is a little bit longer.</p>

                    <button onclick="loadPhoneDetails('${slug}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    View Details
                    </button>
                </div>
            </div>
        </div>
    `
        phoneContainer.appendChild(phoneDiv)

    })
    // stop spinner or loader 
    toggleSpinner(false)

}


const processSearch = (dataLimit) => {
    // start spinner or loader 
    toggleSpinner(true)
    const searchField = document.getElementById('search_field')
    const searchText = searchField.value
    loadPhones(searchText, dataLimit)
}

// Handle Search Button Click 
document.getElementById('btn_search').addEventListener('click', function () {
    processSearch(12)
})

// search input field enter key handler
document.getElementById('search_field').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        processSearch(12)
    }
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader')
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    } else {
        loaderSection.classList.add('d-none')
    }
}


document.getElementById('btn_load_more').addEventListener('click', function () {
    processSearch()
})

const loadPhoneDetails = async id => {

    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        displayPhoneDetails(data.data)

    } catch (error) {
        console.log(error);
    }
}

const displayPhoneDetails = (phone) => {
    console.log('Phone : ', phone);
    const { name, image, brand, releaseDate } = phone;

    const phoneDetails = document.getElementById('phone_details')
    phoneDetails.innerHTML = `

    <div class="modal-header border-0">
       
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="row row-cols-1 row-cols-md-2 modal-body">
        <div class="text-center">
       <img style="max-width:300px; width:100%" src="${image}" class="" alt="${name}" >
       </div>
    <div>
    <h1 class="modal-title fs-5 mb-2" id="exampleModalLabel">${name}</h1>
    <p class="mb-0">Brand : ${brand} </p>
    <p class="mb-0">Storage : ${phone.mainFeatures.storage} </p>
    <p class="mb-0">Chipset : ${phone.mainFeatures.chipSet} </p>
    <p class="mb-0">Display Size : ${phone.mainFeatures.displaySize
        } </p>
    <p class="mb-0">Memory : ${phone.mainFeatures.memory
        } </p>
    <p class="mb-0">Release Date : ${releaseDate ? releaseDate : 'No release date found'} </p>

    </div>
    </div>
    <div class="modal-footer border-0">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>

    </div>
    
    `
}


loadPhones('iphone')