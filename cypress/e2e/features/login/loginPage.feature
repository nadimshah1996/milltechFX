Feature: Login to DemoQA Book Store
  As a user of the DemoQA Book Store app
  I want to login with valid credentials
  So that I am redirected to my profile page

  Scenario: Successful login redirects to profile
    Given I am on the login page
    When I fill username "test96" and password "Hello@246890"
    And I click the login button
    Then I should be redirected to "/profile"