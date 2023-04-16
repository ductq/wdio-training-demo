Feature: Data Crawling

  @crawl @smoke
  Scenario Outline: <TestID>: As a user, I want to get the data that I want and save to files

    Given I am on the home page of Airport Car Rental
    Then I get the branches data
    Then I get the reviews data

    Examples: Valid and invalid cases
      | TestID        | Pickup  | Return    | Start date | Start time | End date   | End time | Country   | Age |
      | TC-E2E-001a   | AUS     | DAL       | 20-04-2023 | 7:00 am    | 07-07-2023 | 9:00 am  | Singapore | 70  |