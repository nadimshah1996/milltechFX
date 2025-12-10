Feature: Alerts handling on DemoQA
	As a user on the DemoQA Alerts page
	I want to interact with different alert types
	So that I can verify their behaviors and responses

	Background:
		Given I am on the Alerts page

	Scenario: Immediate alert appears on button click
		When I click the alert button
		Then I should see an alert with message "You clicked a button"

	Scenario: Alert appears after 5 seconds
		When I click the delayed alert button
		Then I should see an alert with message "This alert appeared after 5 seconds"

	Scenario: Confirm box appears and I accept
		When I click the confirm button and choose "Ok"
		Then I should see a confirm with message "Do you confirm action?"
		And the confirm result text should be "You selected Ok"

	Scenario: Confirm box appears and I cancel
		When I click the confirm button and choose "Cancel"
		Then I should see a confirm with message "Do you confirm action?"
		And the confirm result text should be "You selected Cancel"

	Scenario: Prompt appears and I enter a random name
		When I click the prompt button and enter a random name
		Then the prompt result text should start with "You entered "
