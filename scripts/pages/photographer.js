import { displayPhotographInfo, displayPortrait, displayMedias } from '../utils/functions.js'

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
  medias.forEach(element => {
    element.isLiked = false
  })
  medias = medias.filter(item => item.photographerId === photographerId)
  photographers = photographers.filter(item => item.id === photographerId)
  displayPhotographInfo(photographers)
  displayPortrait(photographers)
  displayMedias(medias)

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
        default:
          break
      }
    }
  })
} else {
  window.location.href = './index.html'
}
