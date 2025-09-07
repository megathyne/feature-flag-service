# Feature Flag Service

## Goals
- Allow for the deployment of feature with the ability to disable via configuration

## Feature Flags Instructions
- In the Launch Darkly control panel, a new feature flag can be set up
- The centralized feature flag server has a /:flagName endpoint where the flag can be passed in as a param
- The following additional properties need to be passed as query params
    - kind:
        The kind attribute specifies the type of context.
        While user is the default and most common kind, you can define custom kinds like device, organization, or account to represent different entities in your system.
        This allows for more granular targeting based on the specific type of entity. 
    - key:
        The key is a unique identifier for a specific instance of a context within its kind.
        The x-correlation-id of the request is an excellent choice for a key.
        For example, if the kind is user, the key might be a user's ID or email address. If the kind is device, the key could be a device ID.
        The key is required for every context and is used for individual targeting and tracking within LaunchDarkly. 
    - name:
        The name attribute provides a human-readable identifier for the context.
        It is used for display purposes in the LaunchDarkly UI, making it easier to identify specific contexts.
        For instance, a user context might have a name like "John Doe" even if its key is a UUID.
- Example: 
    ```/sample-feature?kind=user&key=example-user-key&name=Sandy'```

## Best Practices
- Feature flags should be treated as technical debt.
- Set a time limit on feature flag life.
- Create slack notifications for feature flags past a date threshold
- Each team has to be aware of what feature flags are used by other teams.
- Rely on booleans for evaluation instead of some of the other data types that Launch Darkly can provide.
- Treat every change to Launch Darkly in production as a change to production. (verbalized, tested, approved)


## Concerns
- Polling only. Launch Darkly's push capabilities are unavailable due to the system design.
- Teams may manipulate a feature flag that affects other teams.  
