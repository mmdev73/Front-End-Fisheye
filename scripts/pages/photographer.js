import { displayPhotographInfo, displayPortrait } from '../utils/functions.js'

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
} else {
  window.location.href = './index.html'
}
