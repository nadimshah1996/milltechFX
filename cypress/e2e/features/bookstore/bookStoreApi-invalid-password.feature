Feature: Book Store API - Invalid Password
	As a tester
	I want to verify password validation errors
	So that the API enforces password strength rules

	Scenario: Create user with invalid password via POST /Account/v1/User
		Given I visit the DemoQA home page
		When I open the Book Store Application
		And I open the Book Store App API page
		And I try out the "POST /Account/v1/User" endpoint with username "tryrth" and password "gfhfghf""
		Then I should see an error code "1200" with a message containing "Passwords must have at least one non alphanumeric character || UserName and Password required."