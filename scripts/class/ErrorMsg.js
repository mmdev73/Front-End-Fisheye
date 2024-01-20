class ErrorMsg {
  /**
   * Constructor for initializing error messages and default message.
   */
  constructor () {
    this.errName = "Prénom : entre 2 et 31 caractères. Lettres (avec accents) et trait d'union sont acceptés"
    this.errNameLast = "Nom : entre 2 et 31 caractères. Lettres (avec accents) et trait d'union sont acceptés"
    this.errEmail = "L'email semble invalide."
    this.msg = 'Votre message ne peut pas être vide.'
  }
}

export const objMsg = new ErrorMsg()
