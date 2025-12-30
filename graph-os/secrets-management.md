# Secrets Management Strategy

**Date:** 2025-12-29
**Subject:** Handling API Keys & Credentials

## 1. The Challenge
GenAI nodes require secrets (API Keys, OAuth Tokens).
*   **Client-Side**: Secrets must be stored securely in the browser (LocalStorage / IndexedDB) and never committed to code.
*   **Server-Side**: Secrets should be injected via Environment Variables or Secret Manager.

## 2. The Solution: `SecretsProvider`
Breadboard nodes request secrets via a standard `secrets` input. We will inject a provider that resolves these requests based on the runtime context.

### A. Client-Side (Browser)
1.  **Storage**: Use `localStorage` (prefixed with `litflow_secret_`).
2.  **Provider**: `ClientSecretsProvider`.
    *   *Input*: Key Name (e.g., `GEMINI_KEY`).
    *   *Action*: Check storage.
    *   *Miss*: Dispatch UI event to prompt user. "Please enter your Gemini API Key".
    *   *Hit*: Return value.

### B. Server-Side (Cloud Run)
1.  **Storage**: Environment Variables / Google Secret Manager.
2.  **Provider**: `ServerSecretsProvider`.
    *   *Action*: `process.env[KEY]` or `gcp.secretManager.access(KEY)`.

## 3. Implementation Details
The Harness accepts a `kits` array. Some kits (like the Core Kit) have a `secrets` node. We need to configure the runner to handle this node.

```typescript
// Client Runner Setup
const runner = createPlanRunner({
  ...config,
  // Intercept secret requests
  secretHandler: async (keys) => {
    return Object.fromEntries(keys.map(key => [key, localStorage.getItem(key)]));
  }
});
```

**Note**: Breadboard's `HarnessRunner` logic might abstract this via `NodeHandlerContext`. We need to ensure our `LitFlowRunner` passes the correct context.
