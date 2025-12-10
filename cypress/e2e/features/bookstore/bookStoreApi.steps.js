import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor'
import BookStoreApiPage from '../../../support/pages/bookStoreApi'

const apiPage = new BookStoreApiPage()

Given('I visit the DemoQA home page', () => {
	cy.visit('/')
})

When('I open the Book Store Application', () => {
	apiPage.openBookStoreApplication()
})

When('I open the Book Store App API page', () => {
	apiPage.openBookStoreApiPage()
})

When(
	'I try out the {string} endpoint with username {string} and password {string}',
	(endpointLabel, username, password) => {
		apiPage.tryOutEndpoint(endpointLabel)
		apiPage.fillCreateUserPayload(username, password)
		apiPage.executeRequest()
	}
)

Then(
	'I should see the API response contain userID {string}, username {string} and empty books array',
	(userId, username) => {
		apiPage.verifyCreateUserResponse(userId, username)
	}
)

Then('the API response should match the sample user object', () => {
	apiPage.verifyResponseMatchesFixture('sampleUserResponse.json')
})