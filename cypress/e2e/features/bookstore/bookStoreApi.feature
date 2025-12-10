Feature: Book Store API - Create User via Swagger UI
	As a tester
	I want to create a user via the Book Store API UI
	So that I can validate the API response matches expectations

	Scenario: Create user with valid credentials via POST /Account/v1/User
		Given I visit the DemoQA home page
		When I open the Book Store Application
		And I open the Book Store App API page
		And I try out the "POST /Account/v1/User" endpoint with username "shah96" and password "Hello@246890"
		Then I should see the API response contain userID "beba3a50-ce6a-4cb3-8b6d-27fb6e4e3d13", username "shah96" and empty books array