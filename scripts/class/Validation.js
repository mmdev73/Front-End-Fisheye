class Validation {
  /**
   * Constructor for initializing validator and values.
   */
  constructor () {
    this.validator = {
      firstName: false,
      lastName: false,
      email: false,
      msg: true
    }
    this.values = {
      firstName: '',
      lastName: '',
      email: '',
      msg: ''
    }
  }

  /**
   * Get all values.
   *
   * @return {Array} The array of values.
   */
  get allValues () {
    return this.values
  }

  /**
   * Check if all validator values are true.
   *
   * @return {boolean} true if all validator values are true, false otherwise
   */
  isValid () {
    return !Object.values(this.validator).includes(false)
  }

  /**
   * Reset the validator and values objects.
   */
  resetobj () {
    this.validator = {
      firstName: false,
      lastName: false,
      email: false,
      msg: true
    }
    this.values = {
      firstName: '',
      lastName: '',
      email: '',
      msg: ''
    }
  }
}
export const objForm = new Validation()
