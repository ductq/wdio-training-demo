Feature: Airport Car Rental

  @e2e @smoke
  Scenario Outline: <TestID>: As a user, I want to search for car rental

    Given I am on the home page of Airport Car Rental
    Then I enter <Pickup>, <Return>, <Start date>, <Start time>, <End date>, <End time>, <Country> and <Age>
    Then I search for the car
    #Date format: dd - mm - yyyy
    Examples: Valid and invalid cases
      | TestID      | Pickup | Return | Start date | Start time | End date   | End time | Country   | Age |
      | TC-E2E-001a | AUS    | DAL    | 20-04-2023 | 7:00 am    | 07-07-2023 | 9:00 am  | Singapore | 70  |
  # | TC-E2E-001b | LAX     | SEA       |            | 10:00 pm   |          | 10:00 am | Fin       | 25  |
  # | TC-E2E-001c | MIA     | JAX       |            | 7:30 am    |          | Noon     | land      | 20  |
  # | TC-E2E-001d | Vietnam | Singapore |            | 7:30 am    |          | Noon     | Vietnam   | 33  |
  # | TC-E2E-001e | AUS     | DAL       |            | 7:30 am    |          | 1:00 pm  | Singapore | 10  |
  # | TC-E2E-001f | AUS     | DAL       |            | 7:30 am    |          | 5:00 pm  | Singapore | 75  |


  Scenario Outline: <TestID>: As a person from, I want to
# Select the desired price range
# Select the other desired options
# Verify that the search results include the correct car types and prices.
# Select a car from the search results.
# Verify that the car details, including the type, features, and price, are correct.
# Select extra items
# Enter the required personal information to complete the rental.
