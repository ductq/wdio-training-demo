Feature: API testing on demoqa.com
    @api @smoke
    Scenario Outline: <TestID>: I want to check the reponses from the demo site

        Given I am on the home page of demoqa
        Then I check responses of the links
        Then I check signup feature
        Then I check login feature
        Then I verify and clearup
        

        Examples:
            | TestID     |
            | TC-API-001 |