Feature: Adding Tables

	Background:
		Given I am on the Web Tables page

	Scenario: Add a new record successfully
		When I click the Add button
		And I fill the modal form with First Name "Jake", Last Name "Chad", Email "jake.chad@example.com", Age "30", Salary "75000" and Department "Engineering"
		And I submit the record form
		Then I should see a row with First Name "Jake", Last Name "Chad", Email "jake.chad@example.com", Age "30", Salary "75000" and Department "Engineering"