import { objForm } from '../class/Validation.js'
import { objMsg } from '../class/ErrorMsg.js'

const form = document.querySelector('.contact-modal__form')
export const inputFirst = document.getElementById('firstname')
export const inputLast = document.getElementById('name')
export const inputEmail = document.getElementById('email')
export const inputMsg = document.getElementById('message')

let tmOut
const dialog = document.querySelector('dialog')
export let modalOpen = false // Handler for toggle lightbox and modal

// Expression reguliere pour les tests
export const rgxName = /^[a-zA-ZÀ-ÖØ-öøç]{2,15}[-]{0,1}[a-zA-ZÀ-ÖØ-öøç]{0,15}$/ // Nom et Prenom
export const rgxEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ // Email
export const rgxMsg = /^[\w\W]+$/ // message non vide (aucune vérification de longueur ou de caractère)

/**
 * Ouvertue du modal
 */
export function openModal () {
  dialog.showModal()
  clearTimeout(tmOut)
  modalOpen = true
  toggleValidSend(true)
  form.reset()
  document.getElementById('firstname').focus()
}

/**
 * Fermeture du maodal
 */
export function closeModal () {
  dialog.close()
  modalOpen = false
  clearTimeout(tmOut)
}

/**
 * setErrMsg()
 * affiche le message d'erreur passe en argument de fonction via l'attribut data-set
 * @param {DOMElement} elem => element du dom concerne
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 */
function setErrMsg (elem, msg) {
  elem.parentElement.parentElement.dataset.errorVisible = true
  elem.parentElement.parentElement.dataset.error = msg
  elem.parentElement.firstChild.nextElementSibling.setAttribute('style', 'display: flex')
  return true
}

/**
 * rmErrMsg()
 * retire le message d'erreur de l'attribut data-set
 * @param {DOMElement} elem => element du dom concerne
 */
function rmErrMsg (elem) {
  elem.parentElement.parentElement.removeAttribute('data-error-visible')
  elem.parentElement.parentElement.removeAttribute('data-error')
  elem.parentElement.firstChild.nextElementSibling.setAttribute('style', 'display: none')
  return true
}

/**
 * isValidInput()
 * indique si la valeur du champs repond au test de l'expression regex du param 3, et affiche le message d'erreur lie au champ le cas echeant
 * @param {DOMElement} elem => element du dom concerne
 * @param {string} msg => message adapte a l'element concernant l'erreur de remplissage
 * @param {regex} rgx => expression reguliere permettant de valider ou non le test
 * @return {boolean} => true, la valeur du champ correspond a la demande - false, la valeur du champ ne correspond pas a la demande
 */
export function isValidInput (elem, msg, rgx) {
  let result = null
  if (!rgx.test(elem.value)) {
    setErrMsg(elem, msg)
    result = false
  } else {
    rmErrMsg(elem)
    result = true
  }
  switch (msg) {
    case objMsg.errName:
      objForm.validator.firstName = result
      objForm.values.firstName = elem.value
      break
    case objMsg.errNameLast:
      objForm.validator.lastName = result
      objForm.values.lastName = elem.value
      break
    case objMsg.errEmail:
      objForm.validator.email = result
      objForm.values.email = elem.value
      break
    case objMsg.msg:
      objForm.validator.msg = result
      objForm.values.msg = elem.value
      break
    default:
      break
  }
  // console.log({objForm})
  return result
}

/**
 * Return if the validation is Ok or not
 * @returns - boolean
 */
export function validateForm () {
  isValidInput(inputFirst, objMsg.errName, rgxName)
  isValidInput(inputLast, objMsg.errNameLast, rgxName)
  isValidInput(inputEmail, objMsg.errEmail, rgxEmail)
  isValidInput(inputMsg, objMsg.msg, rgxMsg)

  return objForm.isValid()
}
/**
 * Toggle the display of send button - toggle can be forced to display
 * @param {boolean} forceDisplay - Force display
 */
export function toggleValidSend (forceDisplay = false) {
  const btnSend = document.getElementById('contact-modal__btn')
  const validSendText = document.querySelector('.contact-modal__validate')
  if (btnSend.classList.contains('contact-modal__validate--close') || forceDisplay) {
    btnSend.classList.remove('contact-modal__validate--close')
    validSendText.classList.add('contact-modal__validate--close')
  } else {
    btnSend.classList.add('contact-modal__validate--close')
    validSendText.classList.remove('contact-modal__validate--close')
    timerToCloseModal()
  }
}

/**
 * Force to close the modal
 * @param {int} timer - time before closing the podal in second
 */
function timerToCloseModal (timer = 10) {
  const displayTimer = document.querySelector('.automatic__close__timer')
  let displayTime = timer
  displayTimer.innerText = displayTime
  // tmOut = setTimeout(toggleModal,10000)
  tmOut = setTimeout(closeModal, 10000)
  setInterval(() => {
    displayTime--
    displayTimer.innerText = displayTime
  }, 1000)
}
