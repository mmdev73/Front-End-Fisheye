import { displayPhotographInfo, displayPortrait, displayMedias, displayPrice, displayTotalLike } from '../utils/functions.js'
import {
  inputFirst,
  inputLast,
  inputEmail,
  inputMsg,
  rgxName,
  rgxEmail,
  rgxMsg,
  openModalContact,
  closeModalContact,
  isValidInput,
  validateForm,
  toggleValidSend
} from '../utils/contactForm.js'
import { objForm } from '../class/Validation.js'
import { objMsg } from '../class/ErrorMsg.js'
import { lightboxOpen, displayLightbox, closeLightbox, displayNextMedia, displayPreviousMedia } from '../utils/lightbox.js'
// Extract the photographer ID from the URL query parameters and convert it to a number
const photographerId = Number(new URL(location.href).searchParams.get('id'))

// Check if photographerId is a valid number
if (!isNaN(photographerId)) {
  /**
 * Retrieves data from a specified source asynchronously.
 *
 * @param {string} dataSrc - The URL or path to the data source.
 * @returns {Promise} A promise that resolves to the fetched data in JSON format.
 */
  async function getData (dataSrc) {
  // Fetch data from the specified source
    let data = await fetch(dataSrc)

    // Parse the data as JSON
    data = data.json()

    // Return the fetched data
    return data
  }

  // Fetch JSON data from the './data/photographers.json' file using the getData function and store it in the 'jsonData' variable.
  const jsonData = await getData('./data/photographers.json')

  // Create a new variable `data` and make a deep copy of `jsonData`

  // Use JSON.stringify() to convert `jsonData` to a JSON string
  // Use JSON.parse() to parse the JSON string and create a new JavaScript object
  const data = JSON.parse(JSON.stringify(jsonData))

  let photographers = data.photographers
  let medias = data.media
  /**
   * Set the 'isLiked' flag to false as default for each element in the 'medias' array.
   */
  medias.forEach(element => {
    element.isLiked = false
  })
  /**
   * Filter the 'medias' array to include only items with matching 'photographerId',
   * and filter the 'photographers' array to include only items with matching 'id'.
   */
  medias = medias.filter(item => item.photographerId === photographerId)
  photographers = photographers.filter(item => item.id === photographerId)
  document.querySelector('.header__title').innerText = 'Page de profil de ' + photographers[0].name

  displayPhotographInfo(photographers)
  displayPortrait(photographers)
  displayMedias(medias)
  displayPrice(photographers)
  displayTotalLike(medias)
  const dynamicSubtitle = document.querySelector('.contact-modal__subtitle')
  dynamicSubtitle.textContent = photographers[0].name

  /**
  * Add event listener for click on the document and perform various actions based on the clicked element's data context.
  */
  document.addEventListener('click', (event) => {
    if (event.target.hasAttribute('data-context')) {
      const dataId = event.target.getAttribute('data-id')
      const dataContext = event.target.getAttribute('data-context')
      const value = event.target.value
      let mediaToUpdate = {}
      switch (dataContext) {
        case 'like-icon':
          mediaToUpdate = medias.find(media => media.id === Number(dataId))
          if (!mediaToUpdate.isLiked) {
            mediaToUpdate.likes++
            mediaToUpdate.isLiked = true
          } else {
            mediaToUpdate.likes--
            mediaToUpdate.isLiked = false
          }
          displayMedias(medias)
          displayTotalLike(medias)
          break
        case 'filter-select':
          // Sort the media items based on the filter option value
          switch (Number(value)) {
            case 0:
              medias = medias.sort((a, b) => b.likes - a.likes)
              break
            case 1:
              medias = medias.sort((a, b) => new Date(b.date) - new Date(a.date))
              break
            case 2:
              medias = medias.sort((a, b) => a.title.localeCompare(b.title))
              break
            default:
              medias = medias.sort((a, b) => b.likes - a.likes)
              break
          }
          displayMedias(medias)
          break
        case 'contact-btn-open':
          openModalContact()
          break
        case 'contact-btn-close':
          closeModalContact()
          break
        case 'btn-modal-send':
          if (validateForm()) {
            console.log(objForm.allValues) // Pour la soutenance
            toggleValidSend()
          }
          break
        case 'lb-media':
          displayLightbox(medias, dataId)
          break
        case 'lb-btn-close':
          closeLightbox()
          break
        case 'lb-btn-next':
          displayNextMedia()
          break
        case 'lb-btn-prev':
          displayPreviousMedia()
          break
        default:
          break
      }
    }
  })

  /**
  * Add event listener for keyup on the document and perform actions if the lightbox is open.
  */
  document.addEventListener('keyup', (event) => {
    if (lightboxOpen) {
      switch (event.key) {
        case 'ArrowLeft':
          displayPreviousMedia()
          break
        case 'ArrowRight':
          displayNextMedia()
          break
        default:
          break
      }
    }
  })

  /**
  * Add event listener for keydown on the active element and perform actions based on the event data.
  */
  document.activeElement.addEventListener('keydown', (event) => {
    const dataContext = event.target.getAttribute('data-context')
    const dataId = event.target.getAttribute('data-id')
    let mediaToUpdate = {}
    if (event.key === 'Enter') {
      if (dataContext === 'lb-media') {
        displayLightbox(medias, dataId)
      }
      if (dataContext === 'like-icon') {
        mediaToUpdate = medias.find(media => media.id === Number(dataId))
        if (!mediaToUpdate.isLiked) {
          mediaToUpdate.likes++
          mediaToUpdate.isLiked = true
        } else {
          mediaToUpdate.likes--
          mediaToUpdate.isLiked = false
        }
        displayMedias(medias)
        displayTotalLike(medias)
      }
    }
  })

  // Modal eventListener for live validation
  inputFirst.addEventListener('input', () => isValidInput(inputFirst, objMsg.errName, rgxName))
  inputLast.addEventListener('input', () => isValidInput(inputLast, objMsg.errNameLast, rgxName))
  inputEmail.addEventListener('input', () => isValidInput(inputEmail, objMsg.errEmail, rgxEmail))
  inputMsg.addEventListener('focusout', () => isValidInput(inputMsg, objMsg.msg, rgxMsg))
  inputMsg.addEventListener('input', () => isValidInput(inputMsg, objMsg.msg, rgxMsg))
} else {
  window.location.href = './index.html'
}
