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