const gallery = document.querySelector(`.gallery`);
const btnFilter = document.querySelector(`.btn-filter-container`);
const modalAdd = document.getElementById("modalAdd");
const modalGalery = document.getElementById("modalGalery");
const modal = document.querySelector(".modal"); 
const modalContainer = document.querySelector(".modalContainer"); 


async function getWorks() {
    try {
      const response = await fetch("http://localhost:5678/api/works");
      const works = await response.json();
      return works;
    } catch (error) {
      console.error("An error occurred while fetching works:", error);
      return []; // Return an empty array if fetching the works fails
    }
  }


//Récupération des Filtres de catégories  et creéation du  boutton tous 
  async function getCategories() {
    try {
      const response = await fetch("http://localhost:5678/api/categories"); 
      const categories = await response.json(); // Convertit la réponse en JSON
      const btnAll = { id: 0, name: "Tous" }; //creer le boutton tous en dynamique 
      categories.unshift(btnAll); //  mettre le bouton tous en dynamique 
      return categories; // Renvoie les catégories/filtres  
    } catch (error) {
      console.error("Une erreur s'est produite :", error); // affiche un message d'erreur au cas où
    }
  }


//-- Création et affichage des boutons filtres
async function displayCategoriesBtn() {
  try {
    const token = localStorage.getItem('token'); // Vérifie si l'utilisateur est connecté
    if (token) {
      // L'utilisateur est connecté, ne pas afficher les catégories
      return;
    }

    const categories = await getCategories(); // Récupère les catégories depuis l'API

    categories.forEach(category => {
      const btn = document.createElement('button'); // Crée un élément <button> en utilisant le DOM
      btn.classList.add('btn-filter'); // Ajoute la classe CSS 'btn-filter' au bouton
      btn.innerText = category.name; // Définit le texte du bouton
      btn.setAttribute('id', category.id); // Définit l'attribut 'id' du bouton
      btnFilter.appendChild(btn); // Ajoute le bouton à l'élément parent 'btnFilter' dans le HTML en utilisant le DOM

      if (category.id === 0) {
        btn.classList.add('btn-filter-focus'); // Ajoute la classe CSS 'btn-filter-focus' si l'id est 0
      }

      btn.addEventListener('click', () => {
        const allbtnFilter = document.querySelectorAll('.btn-filter'); // Sélectionne tous les boutons de filtre

        allbtnFilter.forEach(btn => {
          btn.classList.remove('btn-filter-focus'); // Supprime la classe CSS 'btn-filter-focus' de tous les boutons
        });

        btn.classList.toggle('btn-filter-focus'); // Ajoute ou supprime la classe CSS 'btn-filter-focus' du bouton courant

        showWorksByCategory(category.id); // Affiche les travaux en fonction de la catégorie
      });
    });
  } catch (error) {
    console.error('Une erreur s\'est produite :', error);
  }
}

displayCategoriesBtn();


async function showWorksByCategory(categoryId) {
    if (!gallery) {
      return; // If the 'gallery' element does not exist, stop the function
    }
  
    gallery.innerHTML = ""; // Reset the content of 'gallery'
  
    try {
      const works = await getWorks(); // Retrieve WORKS from the API
  
      let worksToShow;
  
      if (categoryId !== 0) {
        const filteredWorks = works.filter(work => work.categoryId === categoryId); // Filter the WORKS and keep only those with the desired 'categoryId'
        worksToShow = filteredWorks; // Store the filtered works in 'worksToShow'
      } else {
        worksToShow = works; // If categoryId is 0, show all works (ID 0 corresponds to the initial 'All' button)
      }
  
      console.log(worksToShow);
  
      if (Array.isArray(worksToShow)) {
        worksToShow.forEach(work => {
          const figureGallery = document.createElement('figure'); // Create 'figure' element in the HTML using the DOM
          const figureImgGallery = document.createElement('img'); // Create 'img' element in the HTML using the DOM
          const figureFigCaptionGallery = document.createElement('figcaption'); // Create 'figcaption' element in the HTML using the DOM
  
          figureImgGallery.src = work.imageUrl; // Get the image URL
          figureImgGallery.alt = work.title; // Set the alt attribute for the image
          figureFigCaptionGallery.innerText = work.title; // Set the caption text
  
          figureGallery.appendChild(figureImgGallery); // Append the image as a child of the figure
          figureGallery.appendChild(figureFigCaptionGallery); // Append the figcaption as a child of the figure
          gallery.appendChild(figureGallery); // Append the figure as a child of the gallery
        });
      } else {
        console.error("Invalid data format for worksToShow:", worksToShow);
      }
    } catch (error) {
      console.error("An error occurred while retrieving works:", error);
    }
  }
  
  showWorksByCategory(0);

// connexion

  window.addEventListener("DOMContentLoaded", function () {
    const loginLink = document.getElementById("login"); 
    const logoutLink = document.getElementById("logout"); 
  
    // Vérifie si un token est présent dans le localStorage
    if (localStorage.getItem("token")) {
      loginLink.style.display = "none"; // Masque le lien de connexion
      logoutLink.style.display = "inline-block"; // Affiche le lien de déconnexion
  
      
      logoutLink.addEventListener("click", function () {
        localStorage.removeItem("token"); // Supprime le token du localStorage lors du clic sur le lien de déconnexion
      });
  
      // Affiche la div avec la classe "container-edit"
      const containerEdit = document.querySelector(".container-edit");
      containerEdit.style.display = "flex";
  
      // Affiche tous les boutons avec la classe "btn-modifier"
      const btnModifier = document.querySelectorAll(".btn-modifier");
      btnModifier.forEach(function (button) {
        button.style.display = "inline-block";
      });
    }
  });
  
  


  //MODAL 

//   afficher le modal 
const modalTrigger = document.getElementById("modal-trigger");
modalTrigger.addEventListener("click", function () { // Ajout d'un écouteur d'événements au clic sur l'élément "modal-trigger"
  const modal = document.querySelector(".modal");// Sélection de l'élément avec la classe "modal" (assumant que cela a été fait ailleurs dans le code)
  modal.style.display = "block";// Modification de la propriété de style "display" de l'élément "modal" pour le rendre visible en utilisant "block"
});


//fermer  le modal 
// Sélection de tous les éléments avec la classe "btn-exit"
const exitModal = document.querySelectorAll(".btn-exit");
exitModal.forEach(exitButton => {
  exitButton.addEventListener("click", function () {  // Lorsque l'un des boutons est cliqué, la fonction de rappel (callback) est exécutée   
    const modalAdd = document.getElementById("modalAdd"); // Sélection des éléments avec les classes modalAdd 
    const modalGalery = document.getElementById("modalGalery");// Sélection des éléments avec les classes modalGalery
    const modal = document.querySelector(".modal");// Sélection des éléments avec les classes modal

    // Modification des propriétés de style des éléments
    modalAdd.style.display = "none";
    modalGalery.style.display = "flex";
    modal.style.display = "none";
  });
});



window.addEventListener("click", function (event) { // Lorsque la fenêtre est cliquée, la fonction de rappel (callback) est exécutée
  const modalContainer = document.querySelector(".modalContainer");// Sélection de l'élément avec la classe modalContainer
  if (event.target === modalContainer) {// Vérification si l'élément cliqué correspond à l'élément "modalContainer"

    // les éléments sont masqués ou affichés selon les besoins
    

    modalGalery.style.display = "flex";
    modalAdd.style.display = "none";
    modal.style.display = "none";
  }
});



//gallerie dans le modal 
function addFigureToGaleryContainer(work) {
  const galeryContainer = document.querySelector('.galeryContainer');
  const figure = document.createElement('figure');
  const img = document.createElement('img');
  img.src = work.imageUrl;
  img.alt = work.title;
  figure.appendChild(img);

  const iconsContainer = document.createElement('div');
  iconsContainer.classList.add('icons-container');

  const resizeIcon = document.createElement('i');
  resizeIcon.classList.add('fa-solid', 'fa-arrows-up-down-left-right', 'resize-ico');
  iconsContainer.appendChild(resizeIcon);

  const deleteIcon = document.createElement('i');
  deleteIcon.classList.add('fa-solid', 'fa-trash-can');
  iconsContainer.appendChild(deleteIcon);
  figure.appendChild(iconsContainer);

  const editLink = document.createElement('a');
  editLink.textContent = 'Éditer';
  figure.appendChild(editLink);

  deleteIcon.addEventListener('click', () => {
    // Afficher une boîte de dialogue de confirmation
    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer ce travail ?');
    if (confirmed) {
      deleteWork(work.id)
        .then(() => {
          figure.remove();
        })
        .catch(error => {
          console.error("An error occurred while deleting the work:", error);
        });
    }
  });

  galeryContainer.appendChild(figure);
}

async function deleteWork(workId) {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }

    const response = await fetch(`http://localhost:5678/api/works/${workId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      showWorksByCategory(0);
      console.log('Supprimé avec succès');
    } else {
      console.log("Une erreur s'est produite lors de la suppression");
    }
  } catch (error) {
    console.log("Une erreur s'est produite lors de la suppression", error);
  }
}

async function displayWorksInModal() {
  const works = await getWorks();// Récupère les travaux depuis l'API
  displayWorks(works);// Affiche les travaux dans le modal de la galerie
}

function displayWorks(works) {
 
  works.forEach(work => { // Parcourt chaque worls dans le tableau 'works'
    addFigureToGaleryContainer(work);
  });
}
displayWorksInModal();//  afficher les travaux dans le modal 


//test 

//-- Passage sur la modal "ModalAdd"
const addPicture = document.querySelector(".btn-addWork");
addPicture.addEventListener("click", function () {
  modalGalery.style.display = "none";
  modalAdd.style.display = "block";
})

//-- Retour sur la modal "ModalGalery"
const returnModal = document.querySelector(".btn-back");
returnModal.addEventListener("click", function () {
  modalAdd.style.display = "none";
  modalGalery.style.display = "flex";
})

//-- Gestion de l'image Upload ModalAdd
const changeFiles = document.getElementById("returnPreview")
const addImgElements = document.querySelectorAll(".addImg i, .addImg label, .addImg input, .addImg p");
let image = document.getElementById("imagePreview");

let previewPicture = function (e) {
  const [picture] = e.files;
  if (picture) {
    //-- Affichage du preview
    image.src = URL.createObjectURL(picture);
    changeFiles.style.display = "flex";
    //-- Cache les elements de la div
    addImgElements.forEach(element => {
      element.style.display = "none";
    });
  }
};
//-- Bouton bonus pour retirer le preview et pouvoir changer d'image upload
let deletePreviewPicture = function () {
  image.src = "";
  changeFiles.style.display = "none";
  addImgElements.forEach(element => {
    element.style.display = "inline-block";
  const inputUploadImg = document.getElementById("uploadImg");
  inputUploadImg.value = "";
  });
};
changeFiles.addEventListener("click", deletePreviewPicture);

//-- Gestion du label des catégories dans ModalAdd
const selectCategories = document.getElementById("categorie");

async function getCategoriesforLabel() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categoriesForLabel = await response.json();
  // Réinitialiser le contenu du select
  selectCategories.innerHTML = "";
  // Ajouter un champ vide
  const champVide = document.createElement("option");
  champVide.value = "";
  champVide.text = "";
  selectCategories.appendChild(champVide);
  // Parcourir les catégories et les ajouter au select
  categoriesForLabel.forEach(category => {
    if (category !== "tous") {
      const optionnalCategories = document.createElement("option");
      optionnalCategories.value = category.id;
      optionnalCategories.text = category.name;
      selectCategories.appendChild(optionnalCategories);
    }
  });
}
getCategoriesforLabel();

const formUploadWorks = document.getElementById("sendImg");
const submitBtnWorks = document.getElementById("btnSubmit");

formUploadWorks.addEventListener("submit", submitWork);

function submitWork(e) {
  e.preventDefault();
  var token = localStorage.getItem("token");
  if (!token) {
    return;
  }

  var title = document.getElementById("titre").value;
  var category = document.getElementById("categorie").value;
  var image = document.getElementById("uploadImg").files[0];

  if (!title || !category || !image) {
    return;
  }

  var formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", image);


  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token
    },
    body: formData
  })
  .then(async (work) => {
    console.log("Image envoyée avec succès !");
    addFigureToGaleryContainer(await work.json());
    showWorksByCategory(0);
    modalAdd.style.display = "none";
    modalGalery.style.display = "flex";
    modal.style.display = "none";
    document.getElementById("titre").value = "";
    document.getElementById("categorie").value = "";
    image = document.getElementById("uploadImg").innerHTML = "";
    deletePreviewPicture();
  })
  .catch(error => {
    console.log("Erreur lors de l'envoi de l'image :", error);
  });
}

function checkSubmitButton() {
  const errorMsgModal = document.querySelector(".errorModal");
  var title = document.getElementById("titre").value;
  var category = document.getElementById("categorie").value;
  var image = document.getElementById("uploadImg").files[0];

  if (title && category && image) {
    submitBtnWorks.removeAttribute("disabled");
    submitBtnWorks.classList.add("active");
    errorMsgModal.textContent= "";
  }
  else {
    submitBtnWorks.setAttribute("disabled", "disabled");
    submitBtnWorks.classList.remove("active");
    errorMsgModal.textContent= "Tout les champs doivent être rempli !";
  }
}