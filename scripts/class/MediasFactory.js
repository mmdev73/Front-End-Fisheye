export class MediasFactory {
  /**
   * Constructs a new instance of the class.
   *
   * @param {number} id - The ID of the instance.
   * @param {number} photographerId - The ID of the photographer.
   * @param {String} title - The title of the instance.
   * @param {number} likes - The number of likes.
   * @param {String} date - The date of the instance.
   * @param {number} price - The price of the instance.
   * @param {String} image - The image of the instance (optional).
   * @param {String} video - The video of the instance (optional).
   */
  constructor (id, photographerId, title, likes, date, price, isLiked, image = null, video = null) {
    if (image !== null) {
      this.id = id
      this.photographerId = photographerId
      this.title = title
      this.image = './assets/media/' + photographerId + '/' + image
      this.likes = likes
      this.date = date
      this.price = price
      this.isLiked = isLiked
    } else {
      this.id = id
      this.photographerId = photographerId
      this.title = title
      this.video = './assets/media/' + photographerId + '/' + video
      this.likes = likes
      this.date = date
      this.price = price
      this.isLiked = isLiked
    }
  }

  /**
   * Generates the HTML markup for displaying a media image.
   *
   * @return {string} The HTML markup for the media image.
   */
  getDOMMediaImage () {
    let elementDom = ''
    elementDom += '<figure class="media-image">'
    elementDom += `<img tabindex="0" data-context="lb-media" data-id="${this.id}" src="${this.image}" alt="Photographie intitulée ${this.title}" class="media-image__image" aria-label="image closeup view">`
    elementDom += '<figcaption class="media-image__caption">'
    elementDom += `<h4 class="media-image__title">${this.title}</h4>`
    if (!this.isLiked) {
      elementDom += `<p class="media-image__likes"><span class="media-image__likes-number" data-id="${this.id}">${this.likes}</span> <span role="button" aria-label="likes." tabindex="0" class="media-image__likes-icon far fa-heart" data-context="like-icon" data-id="${this.id}"></p>`
    } else {
      elementDom += `<p class="media-image__likes"><span class="media-image__likes-number" data-id="${this.id}">${this.likes}</span> <span role="button" aria-label="likes." tabindex="0" class="media-image__likes-icon fas fa-heart" data-context="like-icon" data-id="${this.id}"></p>`
    }
    elementDom += '</figcaption>'
    elementDom += '</figure>'

    return elementDom
  }

  getDOMMediaVideo () {
    let elementDom = ''
    elementDom += '<figure class="media-image">'
    elementDom += `<video tabindex="0" data-context="lb-media" data-id="${this.id}" src="${this.video}" alt="Vidéo intitulée ${this.title}" class="media-image__image" aria-label="image closeup view" controls>`
    elementDom += `<source src="${this.video}" type="video/mp4">`
    elementDom += '</video>'
    elementDom += '<figcaption class="media-image__caption">'
    elementDom += `<h4 class="media-image__title">${this.title}</h4>`
    if (!this.isLiked) {
      elementDom += `<p class="media-image__likes"><span class="media-image__likes-number" data-id="${this.id}">${this.likes}</span> <span role="button" aria-label="likes." tabindex="0" class="media-image__likes-icon far fa-heart" data-context="like-icon" data-id="${this.id}"></p>`
    } else {
      elementDom += `<p class="media-image__likes"><span class="media-image__likes-number" data-id="${this.id}">${this.likes}</span> <span role="button" aria-label="likes." tabindex="0" class="media-image__likes-icon fas fa-heart" data-context="like-icon" data-id="${this.id}"></p>`
    }
    elementDom += '</figcaption>'
    elementDom += '</figure>'

    return elementDom
  }

  /**
   * Function to get the DOM lightbox media image.
   *
   * @return {string} the DOM element for the lightbox media image
   */
  getDOMLightboxMediaImage () {
    let elementDom = ''
    elementDom += '<figure class="lb-figure">'
    elementDom += `<img data-id="${this.id}" src="${this.image}" alt="Photographie intitulée ${this.title}" class="lb__image">`
    elementDom += '<figcaption class="lb__caption">'
    elementDom += this.title
    elementDom += '</figcaption>'
    elementDom += '</figure>'

    return elementDom
  }

  /**
   * Get the DOM element for the lightbox media video.
   *
   * @return {string} The HTML string representing the video element for the lightbox media.
   */
  getDOMLightboxMediaVideo () {
    let elementDom = ''
    elementDom += '<figure class="lb-figure">'
    elementDom += `<video data-id="${this.id}" src="${this.video}" alt="Vidéo intitulée ${this.title}" class="lb__image" controls>`
    elementDom += `<source src="${this.video}" type="video/mp4">`
    elementDom += '</video>'
    elementDom += '<figcaption class="lb__caption">'
    elementDom += this.title
    elementDom += '</figcaption>'
    elementDom += '</figure>'

    return elementDom
  }
}
