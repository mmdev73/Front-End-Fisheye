export class PhotographerInfos {
  /**
   * Constructor function for creating a new instance of the class.
   *
   * @param {string} name - The name of the instance.
   * @param {number} id - The ID of the instance.
   * @param {string} city - The city of the instance.
   * @param {string} country - The country of the instance.
   * @param {string} tagline - The tagline of the instance.
   * @param {number} price - The price of the instance.
   * @param {string} portrait - The portrait of the instance.
   */
  constructor (name, id, city, country, tagline, price, portrait) {
    this.name = name
    this.id = id
    this.city = city
    this.country = country
    this.tagline = tagline
    this.price = price
    this.portrait = './assets/photographers/' + portrait
  }

  /**
 * Generates a DOM element for a photographer's article.
 *
 * @return {string} The HTML representation of the photographer's article.
 */
  getDOMPhotographerArticle () {
    let elementDom = ''
    elementDom += '<article class="photographer-article">'
    elementDom += `<a href="./photographer.html?id=${this.id}" class="photographer-article__link">`
    elementDom += `<img src="${this.portrait}" alt="Portrait de ${this.name}" class="photographer-article__portrait">`
    elementDom += `<h2 class="photographer-article__name">${this.name}</h2>`
    elementDom += '</a>'
    elementDom += '<div class="photographer-article__infos">'
    elementDom += `<p class="photographer-article__city">${this.city}, ${this.country}</p>`
    elementDom += `<p class="photographer-article__tagline">${this.tagline}</p>`
    elementDom += `<p class="photographer-article__price">${this.price}€/jour</p>`
    elementDom += '</div>'
    elementDom += '</article>'

    return elementDom
  }
}
