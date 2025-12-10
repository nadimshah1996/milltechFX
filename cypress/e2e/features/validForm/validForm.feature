Feature: Valid form submission

  As an automation tester
  I want to submit the DEMOQA practice form with valid user details
  So that I can confirm the form accepts the input and shows a confirmation modal

  Scenario: Submit the practice form with valid details
    Given I open the practice form page
    When I fill in the form with:
      | firstName | Jake                         |
      | lastName  | Chad                         |
      | email     | automation-test243@tester.com    |
      | mobile    | 07435879120                    |
    And I submit the form
    Then I should see the submission modal containing "Jake Chad" and "automation-test243@tester.com" and "07435879120"