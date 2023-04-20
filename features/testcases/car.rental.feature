Feature: Airport Car Rental

  @e2e @smoke
  Scenario Outline: <TestID>: As a user, I want to search for car rental

    Given I am on the home page of Airport Car Rental
    Then I enter <Pickup>, <Return>, <Start date>, <Start time>, <End date>, <End time>, <Country> and <Age>
    Then I search for the car
    #Date format: dd - mm - yyyy
    Examples: Valid and invalid cases
      | TestID        | Pickup  | Return    | Start date | Start time | End date   | End time | Country   | Age |
      | TC-E2E-001a   | AUS     | DAL       | 20-04-2023 | 7:00 am    | 07-07-2023 | 9:00 am  | Singapore | 70  |
      | TC-E2E-001b-N | LAX     | SEA       | 20-04-2023 | 10:00 pm   | 07-07-2023 | 13:00 am | Fin       | 25  |
      | TC-E2E-001c-N | MIA     | JAX       | 01-04-2023 | 0:30 am    | 07-07-2023 | 12:00 pm     | land      | 20  |
      | TC-E2E-001d-N | Vietnam | Singapore | 20-04-2023 | 0:00 am    | 32-07-2023 | 12:00 pm     | Vietnam   | 33  |
      | TC-E2E-001e-N | AUS     | DAL       | 20-04-2023 | 7:30 am    | 07-07-2023 | 1:00 pm  | Singapore | 10  |
      | TC-E2E-001f-N | AUS     | DAL       | 20-04-2023 | 7:30 am    | 07-07-2023 | 5:00 pm  | Singapore | 75  |
      | TC-E2E-001g   | TEX     | TEX       | 01-01-2024 | 7:00 am    | 01-01-2025 | 5:00 pm  | Vietnam   | 30  |


  Scenario Outline: <TestID>: I want to filter my result after searching

# Select the desired price range
# Select the other desired options
# Verify that the search results include the correct car types and prices.
# Select a car from the search results.
# Verify that the car details, including the type, features, and price, are correct.
# Select extra items
# Enter the required personal information to complete the rental.
