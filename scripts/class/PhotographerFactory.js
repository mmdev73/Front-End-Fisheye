import { PhotographerInfos } from './PhotographerInfos.js'
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
   * Creates a new instance of PhotographerMedias using the provided data.
   *
   * @param {Object} data - The data used to create the PhotographerMedias instance.
   * @param {number} data.id - The ID of the PhotographerMedias.
   * @param {number} data.photographerId - The ID of the photographer.
   * @param {string} data.title - The title of the media.
   * @param {string} data.image - The image URL of the media.
   * @param {number} data.likes - The number of likes for the media.
   * @param {string} data.date - The date of the media.
   * @param {number} data.price - The price of the media.
   * @return {PhotographerMedias} The newly created instance of PhotographerMedias.
   */
  static createPhotographerMedias (data) {
    const { id, photographerId, title, likes, date, price, isLiked, image = null, video = null } = data
    return new PhotographerMedias(id, photographerId, title, likes, date, price, isLiked, image, video)
  }
}
