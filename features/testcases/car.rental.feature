Feature: Airport Car Rental

  Background: I want to search for car rental
    Given User at the home page of Airport Car Rental
  @e2e @smoke
  Scenario Outline: <TestID>: Search for car rental with valid information
    When User enter <Pickup>, <Return>, <Start date>, <Start time>, <End date>, <End time>, <Country> and <Age>
    When User submit the form
    Then Validate the information after search
    Examples: Valid cases
      | TestID        | Pickup | Return | Start date | Start time | End date   | End time | Country   | Age |
      | TC-E2E-001a   | AUS    | DAL    | 20-04-2023 | 7:00 am    | 07-07-2023 | 9:00 am  | Singapore | 50  |
      | TC-E2E-001b-N | LAX    | SEA    | 20-04-2023 | 10:00 pm   | 07-07-2023 | 13:00 am | Fin       | 25  |

  # Scenario Outline: <TestID>: Search for car rental with valid information
  #   When User enter <Pickup>, <Return>, <Start date>, <Start time>, <End date>, <End time>, <Country> and <Age>
  #   When User submit the form
  #   Then Validate the message
  #   Examples: Invalid cases
  #     | TestID        | Pickup  | Return    | Start date | Start time | End date   | End time | Country   | Age |
  #     | TC-E2E-001b-N | LAX     | SEA       | 20-04-2023 | 10:00 pm   | 07-07-2023 | 13:00 am | Fin       | 25  |
  #     | TC-E2E-001c-N | MIA     | JAX       | 01-04-2023 | 0:30 am    | 07-07-2023 | 12:00 pm | land      | 20  |
  #     | TC-E2E-001d-N | Vietnam | Singapore | 20-04-2023 | 0:00 am    | 32-07-2023 | 12:00 pm | Vietnam   | 33  |
  #     | TC-E2E-001e-N | AUS     | DAL       | 20-04-2023 | 7:30 am    | 07-07-2023 | 1:00 pm  | Singapore | 10  |
  #     | TC-E2E-001f-N | AUS     | DAL       | 20-04-2023 | 7:30 am    | 07-07-2023 | 5:00 pm  | Singapore | 75  |

  # Scenario Outline: <TestID>: Full flow car rental
  #   When User enter <Pickup>, <Return>, <Start date>, <Start time>, <End date>, <End time>, <Country> and <Age>
  #   Examples: Information for the booking
  #     | TC-E2E-001g | TEX | TEX | 01-01-2024 | 7:00 am | 01-01-2025 | 5:00 pm | Vietnam | 30 |
  #   When User submit the form
  #   Then Validate the information after search
  #   When User change desired options
  #   Then Verify that the search results include the correct information
  #   When User select a car from the search results
  #   Then Verify that the car name, car type, price, location and time are correct
  #   When User select extra items
  #   When User clicks on
  #   When User enter the required personal information to complete the rental
  #   Then Veriy if book button is clickable
