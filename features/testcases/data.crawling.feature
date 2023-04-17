Feature: Data Crawling from Airport Car Rental

  @exercise
  Scenario Outline: <TestID>: As a user, I want to get the data that I want and save to files

    Given I am on the home page of ACR
    Then I get the branches data
    Then I get the reviews data

    Examples: 
      | TestID    |
      | TC-DC-001 |