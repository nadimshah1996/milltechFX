Feature: Invalid Login on DemoQA Book Store
  As a user
  I want to see an error when I enter invalid credentials
  So that I am informed the login failed

  Scenario: Invalid username/password shows red error message
    Given I am on the DemoQA login page
    When I enter invalid username "wrongUser" and password "wrongPass123"
    And I submit the invalid login
    Then I should see the error message "Invalid username or password!" in red