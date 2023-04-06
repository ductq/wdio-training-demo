Feature: Airport Car Rental

  @e2e
  Scenario Outline: <TestID>: As a person from, I want to

    Given I am on the home page of Airport Car Rental
    When I selects <Pickup> location
    When I selects <Return> location
    Then I should see a flash message saying <message>

    Examples:
      | TestID | Pickup | Return | SDate | STime | EDate   | ETime    | Country   | Age |
      | TC001a | AUS     | DAL    |       |       | 7:30 am | 12:00 pm | Singapore | 33  |
