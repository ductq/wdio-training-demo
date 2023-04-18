Feature: Demo site testing
    @test
    Scenario Outline: <TestID>: I want to test a demo site

        Given I am on the home page of demo site
        Then I check what I want

        Examples:
            | TestID     |
            | TC-DEMO-001 |