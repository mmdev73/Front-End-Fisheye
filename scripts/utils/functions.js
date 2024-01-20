import { PhotographerFactory } from '../class/PhotographerFactory.js'
/********************************************************************
 *
 *
 * PAGE INDEX
 *
 *
 */

/**
 * Displays a list of photographers on the webpage.
 *
 * @param {Array} photographers - An array of photographer objects.
 * @return {void} This function does not return a value.
 */
export function displayPhotographers (photographers) {
  const photographersSection = document.querySelector('.photographer_section')
  let elementDom = ''
  photographers.forEach((photographer) => {
    const photographerModel = PhotographerFactory.createPhotographerInfos(photographer)
    elementDom += photographerModel.getDOMPhotographerArticle()
  })
  photographersSection.innerHTML = elementDom
}

/********************************************************************
 *
 *
 * PAGE PHOTOGRAPHER
 *
 *
 */

/**
 * Display the photographer's information on the webpage.
 *
 * @param {Object} photographer - The photographer object containing information.
 * @return {void} This function does not return a value.
 */
export function displayPhotographInfo (photographer) {
  const headerInfos = document.querySelector('.photograph-header_infos')
  headerInfos.innerHTML = PhotographerFactory.getPhotographer(photographer)
}

/**
 * Displays the portrait of a photographer.
 *
 * @param {string} photographer - The name of the photographer.
 * @return {void} This function does not return a value.
 */
export function displayPortrait (photographer) {
  const headerPortrait = document.querySelector('.photograph-header_portrait')
  headerPortrait.innerHTML = PhotographerFactory.getPortrait(photographer)
}

/**
 * Displays the given medias on the page.
 *
 * @param {Array} medias - An array of medias to be displayed.
 */
export function displayMedias (medias) {
  const headerPortrait = document.querySelector('.medias-container')
  headerPortrait.innerHTML = PhotographerFactory.getMedias(medias)
}

/**
 * Displays the price of the photographer on the webpage.
 *
 * @param {string} photographer - The photographer's name.
 * @return {void}
 */
export function displayPrice (photographer) {
  const floatingPrice = document.querySelector('.floating-likes_price')
  floatingPrice.innerHTML = PhotographerFactory.getPrice(photographer)
}

/**
 * Updates the total number of likes displayed on the UI based on the given array of media items.
 *
 * @param {Array} medias - The array of media items
 * @return {void}
 */
export function displayTotalLike(medias) {
  // Calculate the total number of likes
  const counter = medias.reduce((total, media) => total + media.likes, 0) // callback function on each array element. 0 is the initial value - Return the final accumulator value

  // Get the element for displaying the total likes and update its content
  const totalLikeElement = document.querySelector('.floating-likes_info--number')
  totalLikeElement.innerHTML = counter
}
