const images = document.getElementsByClassName('imageFilter');
const animalRadios = document.getElementsByName('animalType');
const search = document.getElementById('search');
const form = document.getElementById('filters');
let selectedAnimal= 'all';

function shouldShowImage(image) {
    if (selectedAnimal !=='all' && selectedAnimal !== image.getAttribute('animal')) {
        return false;
    }

    if (!search.value) {
        return true;
    }

    return image.alt.toLowerCase().includes(search.value.toLowerCase());
}

function filterAnimals(event) {

    for (const image of images) {
        if (shouldShowImage(image)) {
            image.classList.remove('hidden');
        }
        else {
            image.classList.add('hidden');
        }
    }
}

function updateHelper() {
    const filterLabel = form.querySelector(`label[for=${selectedAnimal}]`).textContent;
    const searchTitle = search.value ?
    `Showing animals that match the filter "${filterLabel}" and the search "${search.value}"` :
    `Showing animals that match the filter "${filterLabel}".`

    document.getElementById('helper').innerHTML = searchTitle
}

updateHelper()

function update() {
  selectedAnimal = document.querySelector('input[name="animalType"]:checked').value;
  filterAnimals();
  updateHelper();
}

form.addEventListener('submit', function (event) {
    event.preventDefault();
});


for (const animalRadio of animalRadios) {
    animalRadio.addEventListener('change', update);
}

search.addEventListener('keyup', update);