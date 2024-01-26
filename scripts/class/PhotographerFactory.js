import { PhotographerInfos } from './PhotographerInfos.js'
import { MediasFactory } from './MediasFactory.js'
export class PhotographerFactory {
  /**
   * Creates a new Photographer object based on the provided data.
   *
   * @param {Object} data - The data used to create the Photographer object.
   * @param {string} data.name - The name of the photographer.
   * @param {number} data.id - The ID of the photographer.
   * @param {string} data.city - The city where the photographer is located.
   * @param {string} data.country - The country where the photographer is located.
   * @param {string} data.tagline - The tagline of the photographer.
   * @param {number} data.price - The price of the photographer's services.
   * @param {string} data.portrait - The URL of the photographer's portrait.
   * @return {Photographer} A new Photographer object.
   */
  static createPhotographerInfos (data) {
    const { name, id, city, country, tagline, price, portrait } = data
    return new PhotographerInfos(name, id, city, country, tagline, price, portrait)
  }

  /**
   * Creates a new instance of MediasFactory using the provided data.
   *
   * @param {Object} data - The data used to create the MediasFactory instance.
   * @param {number} data.id - The ID of the MediasFactory.
   * @param {number} data.photographerId - The ID of the photographer.
   * @param {string} data.title - The title of the media.
   * @param {string} data.image - The image URL of the media.
   * @param {number} data.likes - The number of likes for the media.
   * @param {string} data.date - The date of the media.
   * @param {number} data.price - The price of the media.
   * @return {MediasFactory} The newly created instance of MediasFactory.
   */
  static createPhotographerMedias (data) {
    const { id, photographerId, title, likes, date, price, isLiked, image = null, video = null } = data
    return new MediasFactory(id, photographerId, title, likes, date, price, isLiked, image, video)
  }

  /**
   * Retrieves the photographer information based on the provided data.
   *
   * @param {Array} data - The data containing photographers' information.
   * @return {undefined|DOMElement} - The DOM element representing the photographer information, or undefined if the photographer ID is not found in the data.
   */
  static getPhotographer (photographer) {
    return this.createPhotographerInfos(photographer[0]).getDOMPhotographerInfos()
  }

  /**
   * Retrieves the portrait of a photographer based on the given data.
   *
   * @param {Array} data - The data containing information about photographers.
   * @return {Element} - The DOM element representing the portrait of the photographer.
   */
  static getPortrait (photographer) {
    return this.createPhotographerInfos(photographer[0]).getDOMPortrait()
  }

  static getPrice (photographer) {
    return this.createPhotographerInfos(photographer[0]).getPrice()
  }

  /**
  * Retrieves the media elements associated with a specific photographer ID.
  *
  * @param {Object[]} data - An array of media items.
  * @param {number} filter - The filter option for sorting the media items. Default is null.
  * @returns {string} - The HTML string representing the media elements.
  */
  static getMedias (data) {
    let elementDom = ''
    // Generate the HTML string for each media item
    data.forEach(media => {
      if (typeof media.image !== 'undefined') {
        elementDom += this.createPhotographerMedias(media).getDOMMediaImage()
      } else {
        elementDom += this.createPhotographerMedias(media).getDOMMediaVideo()
      }
    })

    return elementDom
  }

  /**
   * Get the lightbox media element for the given data.
   *
   * @param {Object} data - description of parameter
   * @return {String} - the lightbox media element
   */
  static getMediasLightbox (data) {
    let elementDom = ''
    if (typeof data.image !== 'undefined') {
      elementDom += this.createPhotographerMedias(data).getDOMLightboxMediaImage()
    } else {
      elementDom += this.createPhotographerMedias(data).getDOMLightboxMediaVideo()
    }

    return elementDom
  }
}
