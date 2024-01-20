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
