import { PhotographerFactory } from '../class/PhotographerFactory.js'

export let lightboxOpen = false // Handler for toggle lightbox and modal

let mediasList
let mediaIndex
// let mediasListLength
let currentMedia

/**
 * Display the lightbox with the given medias starting from a specific media ID.
 *
 * @param {array} medias - The list of media to display in the lightbox
 * @param {number} startId - The ID of the media to start the lightbox display from
 * @return {void}
 */
export function displayLightbox (medias, startId) {
  const lightbox = document.querySelector('dialog.lightbox-modal')
  mediasList = medias
  // mediasListLength = mediasList.length
  mediaIndex = mediasList.findIndex(media => media.id === Number(startId))
  currentMedia = mediasList[mediaIndex]
  displayCurrentMedia()
  lightbox.showModal()
  lightboxOpen = true
}

/**
 * Closes the lightbox by clearing the content and closing the dialog.
 *
 * @return {void}
 */
export function closeLightbox () {
  const lightbox = document.querySelector('dialog.lightbox-modal')
  const lightboxContent = document.querySelector('.lb-container__middle')
  lightboxContent.innerHTML = ''
  lightbox.close()
  lightboxOpen = false
}

/**
 * Function to display the current media in the lightbox container.
 *
 * @return {void}
 */
function displayCurrentMedia () {
  const lightboxContent = document.querySelector('.lb-container__middle')
  lightboxContent.innerHTML = PhotographerFactory.getMediasLightbox(currentMedia)
  correctPosition()
}

/**
 * Function to adjust the position of the figcaptionbox based on the width of the media element.
 *
 * @return {void} No return value
 */
function correctPosition () {
  const media = document.querySelector('.lb__image')
  const figcaptionbox = document.querySelector('.lb_caption--box')
  console.log(media.offsetWidth)
  figcaptionbox.setAttribute('style', `width:${media.offsetWidth}px`)
  // TODO Correct the position because media.offsetWidth does not work correctly with video
}

/**
 * Updates the media index and displays the next media in the list.
 *
 * @return {void} - no return value
 */
export function displayNextMedia () {
  document.querySelector('.lb-btn__next').focus()
  mediaIndex++
  if (mediaIndex >= mediasList.length) {
    mediaIndex = 0
  }
  currentMedia = mediasList[mediaIndex]
  displayCurrentMedia()
}

/**
 * Decrements the media index, updates the current media, and displays it.
 *
 * @return {void} - no return value
 */
export function displayPreviousMedia () {
  document.querySelector('.lb-btn__prev').focus()
  mediaIndex--
  if (mediaIndex < 0) {
    mediaIndex = mediasList.length - 1
  }
  currentMedia = mediasList[mediaIndex]
  displayCurrentMedia()
}
