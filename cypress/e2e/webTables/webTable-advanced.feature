Feature: Web Tables - Advanced Scenarios

  Background:
    Given I am on the Web Tables page

  Scenario: Negative - submit with missing required fields
    When I click the Add button
    And I fill the modal form with First Name "NoEmail", Last Name "User", Email "", Age "30", Salary "50000" and Department "QA"
    And I close the modal without submitting

  Scenario: Duplicate entry - allow same email twice
    When I click the Add button
    And I fill the modal form with First Name "Dup", Last Name "User", Email "dup.user@example.com", Age "22", Salary "40000" and Department "HR"
    And I submit the record form
    And I click the Add button
    And I fill the modal form with First Name "Dup2", Last Name "User2", Email "dup.user@example.com", Age "23", Salary "41000" and Department "Finance"
    And I submit the record form
    Then I should see at least 2 rows containing email "dup.user@example.com"

  Scenario: Boundary - age and salary extremes
    When I click the Add button
    And I fill the modal form with First Name "Bound", Last Name "User", Email "bound.user@example.com", Age "0", Salary "999999" and Department "Ops"
    And I submit the record form
    Then I should see a row with First Name "Bound", Last Name "User", Email "bound.user@example.com", Age "0", Salary "999999" and Department "Ops"

  Scenario: Edit after add - changes persist
    When I click the Add button
    And I fill the modal form with First Name "Edit", Last Name "User", Email "edit.user@example.com", Age "33", Salary "53000" and Department "IT"
    And I submit the record form
    And I edit the row with email "edit.user@example.com" to First Name "Edited", Last Name "User", Age "34", Salary "54000" and Department "IT"
    Then I should see a row with First Name "Edited", Last Name "User", Email "edit.user@example.com", Age "34", Salary "54000" and Department "IT"

  Scenario: Delete after add - row disappears
    When I click the Add button
    And I fill the modal form with First Name "Delete", Last Name "User", Email "delete.user@example.com", Age "40", Salary "60000" and Department "Legal"
    And I submit the record form
    And I delete the row with email "delete.user@example.com"
    Then I should not see a row containing email "delete.user@example.com"