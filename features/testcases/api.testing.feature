Feature: Ajax Demo

  @test
  Scenario Outline: <TestID>: As a user, I want to interact with ajax elements

    Given I am on the home page of playground
    Then I interact with Ajax

    Examples: 
      | TestID    |
      | TC-DC-001 |