Feature: Airport Car Rental

  @e2e @
  Scenario Outline: <TestID>: As a user, I want to

    Given I am on the home page of Airport Car Rental
    Then I selects <Pickup> location
    Then I selects <Return> location
    Then I selects <Start date>
    Then I selects <Start time>
    Then I selects <End date>
    Then I selects <End time>
    Then I enter my <Country>
    Then I enter my <Age>
    Then I search for the car

    Examples: Valid and invalid cases
      | TestID      | Pickup  | Return    | Start date | Star time | End date | End time | Country   | Age |
      | TC-E2E-001a | AUS     | DAL       |            |           | 7:00 am  | 9:00 am  | Singapore | 70  |
      | TC-E2E-001b | LAX     | SEA       |            |           | 10:00 pm | 10:00 am | Fin       | 25  |
      | TC-E2E-001c | MIA     | JAX       |            |           | 7:30 am  | Noon     | land      | 20  |
      | TC-E2E-001d | Vietnam | Singapore |            |           | 7:30 am  | Noon     | Vietnam   | 33  |
      | TC-E2E-001e | AUS     | DAL       |            |           | 7:30 am  | 1:00 pm  | Singapore | 10  |
      | TC-E2E-001f | AUS     | DAL       |            |           | 7:30 am  | 5:00 pm  | Singapore | 75  |

  
  Scenario Outline: <TestID>: As a person from, I want to    
    # Select the desired price range
    # Select the other desired options
    # Verify that the search results include the correct car types and prices.
    # Select a car from the search results.
    # Verify that the car details, including the type, features, and price, are correct.
    # Select extra items
    # Enter the required personal information to complete the rental.
