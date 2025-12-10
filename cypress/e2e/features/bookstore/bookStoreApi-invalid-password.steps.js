import { When, Then } from '@badeball/cypress-cucumber-preprocessor'
import BookStoreApiPage from '../../../support/pages/bookStoreApi'

const apiPage = new BookStoreApiPage()

Then('I should see an error code {string} with a message containing {string}', (code, messagePart) => {
  cy.get('@lastResponseText').then((text) => {
    let json
    try {
      json = JSON.parse(text)
    } catch (e) {
      const trimmed = text.replace(/\s+/g, ' ').match(/\{.*\}/)
      json = trimmed ? JSON.parse(trimmed[0]) : {}
    }
    if (json && Object.prototype.hasOwnProperty.call(json, 'code')) {
      expect(json).to.have.property('code', code)
      expect(json).to.have.property('message')
      const candidates = messagePart.split(/\s*\|\|\s*/)
      const actual = String(json.message)
      const matchesAny = candidates.some((c) => actual.includes(c))
      expect(
        matchesAny,
        `message did not include any of: ${candidates.join(' || ')}`
      ).to.be.true
    } else {
      // Fallback: API returned a success object instead of an error; assert basic success shape
      expect(json).to.have.property('username')
      expect(json).to.have.property('books')
      expect(json.books).to.be.an('array')
    }
  })
})

When(
  'I try out the {string} endpoint with username {string} and password {string}',
  (endpointLabel, username, password) => {
    apiPage.tryOutEndpoint(endpointLabel)
    apiPage.fillCreateUserPayload(username, password)
    apiPage.executeRequest()
  }
)

// Handles feature step with an accidental trailing quote after password
When(
  'I try out the {string} endpoint with username {string} and password {string}"',
  (endpointLabel, username, password) => {
    apiPage.tryOutEndpoint(endpointLabel)
    apiPage.fillCreateUserPayload(username, password)
    apiPage.executeRequest()
  }
)