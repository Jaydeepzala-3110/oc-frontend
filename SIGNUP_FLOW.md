# Signup Flow Documentation

## Architecture Overview

### Two API Folders:

1. **`/apps/client/src/api/`** (Client-side API services)
   - `authApi.ts` - Direct HTTP calls to backend API
   - `profileApi.ts` - Profile-related API calls
   - These run in the browser and make requests to external backend (NestJS)

2. **`/apps/client/src/app/api/`** (Next.js API Routes)
   - `hello/route.ts` - Next.js server-side API endpoints
   - These run on Next.js server and can act as middleware/proxy
   - **Currently NOT used in signup flow**

---

## Complete Signup Flow

### Step-by-Step Process:

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. SignupForm.tsx (User Interaction)                           │
│    - User fills form with firstName, lastName, email, etc.     │
│    - React Hook Form validates using Zod schema                │
│    - On submit, calls handleSubmit(onSubmit)                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. SignupForm.tsx → onSubmit()                                 │
│    - Extracts validated form data                              │
│    - Calls: signupMutation.mutate({ email, firstName, ... })   │
│    - signupMutation comes from useSignup() hook                │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. useAuth.ts → useSignup() Hook                               │
│    - Uses React Query's useMutation                             │
│    - mutationFn: authApi.signup(data)                          │
│    - Handles success: stores tokens, shows toast, redirects    │
│    - Handles error: shows error toast with user-friendly msg   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. authApi.ts → signup() Function                              │
│    - Makes HTTP POST to: ${API_BASE_URL}/auth/signup          │
│    - Sends JSON body with user data                            │
│    - Handles API errors with handleApiError()                  │
│    - Returns AuthResponse { access_token, refresh_token }      │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. Backend API (NestJS)                                        │
│    - POST /auth/signup endpoint                                │
│    - Validates CreateUserDto                                   │
│    - Creates user in database                                  │
│    - Returns JWT tokens                                        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. authApi.ts → Returns tokens to useSignup()                 │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 7. useAuth.ts → onSuccess callback                             │
│    - Calls authStorage.setTokens(access_token, refresh_token)  │
│    - Shows success toast notification                          │
│    - Redirects to /dashboard after 1.5s                       │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 8. auth.ts → authStorage.setTokens()                          │
│    - Stores access_token in localStorage                       │
│    - Stores refresh_token in localStorage                      │
└─────────────────────────────────────────────────────────────────┘
```

---

## File-by-File Logic Breakdown

### 1. **SignupForm.tsx** (UI Component)
**Purpose:** Form UI and user interaction

**Responsibilities:**
- Renders form fields (firstName, lastName, email, password, etc.)
- Uses `react-hook-form` for form state management
- Uses `zodResolver` for validation against `signupSchema`
- Shows validation errors inline
- Password visibility toggles
- Calls `signupMutation.mutate()` on form submit

**Key Code:**
```typescript
const signupMutation = useSignup()  // ← Gets mutation from hook

const onSubmit = async (data: SignupFormData) => {
  signupMutation.mutate({  // ← Triggers the mutation
    email: data.email,
    firstName: data.firstName,
    // ...
  })
}
```

---

### 2. **useAuth.ts** (React Query Hook)
**Purpose:** Mutation logic and side effects

**Responsibilities:**
- Wraps `authApi.signup()` in `useMutation`
- Handles success: token storage, toast notification, redirect
- Handles errors: user-friendly error messages, toast notifications
- Provides loading state (`isPending`)

**Key Code:**
```typescript
export const useSignup = () => {
  const router = useRouter();
  
  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),  // ← API call
    onSuccess: (response) => {
      authStorage.setTokens(...)  // ← Store tokens
      toast.success(...)           // ← User feedback
      router.push('/dashboard')    // ← Navigation
    },
    onError: (error) => {
      toast.error(...)  // ← Error handling
    },
  });
};
```

---

### 3. **authApi.ts** (API Service Layer)
**Purpose:** HTTP requests to backend

**Responsibilities:**
- Makes actual HTTP requests to backend API
- Constructs request URL, headers, body
- Handles HTTP errors and converts to ApiError format
- Returns typed response (AuthResponse)

**Key Code:**
```typescript
export const authApi = {
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await handleApiError(response);
      throw error;  // ← Thrown error caught by useMutation
    }
    
    return response.json();  // ← Returns tokens
  },
};
```

---

### 4. **auth.ts** (Storage Utility)
**Purpose:** Token storage abstraction

**Responsibilities:**
- Provides type-safe localStorage operations
- Handles SSR safety (window check)
- Exposes simple API: `setTokens()`, `getAccessToken()`, etc.

**Key Code:**
```typescript
export const authStorage = {
  setTokens: (accessToken: string, refreshToken: string): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
    }
  },
  // ...
};
```

---

### 5. **validations/auth.ts** (Validation Schema)
**Purpose:** Form validation rules

**Responsibilities:**
- Defines Zod schema for form validation
- Validates password strength, email format, etc.
- Provides TypeScript types via `z.infer`

**Used by:** SignupForm.tsx via `zodResolver(signupSchema)`

---

## Do We Really Need useMutation?

### **Yes, useMutation is beneficial, but not strictly required.**

### Without useMutation (Manual Approach):
```typescript
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(null);

const handleSignup = async (data) => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await authApi.signup(data);
    authStorage.setTokens(response.access_token, response.refresh_token);
    toast.success('Success!');
    router.push('/dashboard');
  } catch (err) {
    setError(err);
    toast.error('Failed!');
  } finally {
    setIsLoading(false);
  }
};
```

**Problems with manual approach:**
- ❌ Boilerplate code (useState for loading, error)
- ❌ Manual error handling needed everywhere
- ❌ No automatic retry logic
- ❌ No built-in request cancellation
- ❌ Harder to track mutation state across components
- ❌ Need to manually handle optimistic updates (if needed)

### With useMutation (Current Approach):
```typescript
const signupMutation = useSignup();

// Clean, declarative
signupMutation.mutate(data);
// Auto-handles: loading, error, success states
```

**Benefits:**
- ✅ Automatic loading state (`isPending`)
- ✅ Built-in error handling with `onError`
- ✅ Success callbacks with `onSuccess`
- ✅ Request deduplication
- ✅ Easy to extend (retry, optimistic updates)
- ✅ Consistent pattern across app
- ✅ Works great with React Query DevTools
- ✅ Better testability

---

## Alternative Approaches

### Option 1: Keep useMutation (Recommended) ✅
**Best for:** Production apps, complex state management
**Pros:** Clean, maintainable, feature-rich
**Cons:** Requires React Query dependency

### Option 2: Custom Hook Without useMutation
```typescript
export const useSignup = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  
  const signup = async (data: SignupRequest) => {
    setIsPending(true);
    try {
      const response = await authApi.signup(data);
      authStorage.setTokens(...);
      toast.success(...);
      router.push('/dashboard');
      return response;
    } catch (error) {
      toast.error(...);
      throw error;
    } finally {
      setIsPending(false);
    }
  };
  
  return { signup, isPending };
};
```
**Pros:** No React Query dependency
**Cons:** More boilerplate, less features

### Option 3: Direct API Call in Component
```typescript
// In SignupForm.tsx
const onSubmit = async (data) => {
  try {
    const response = await authApi.signup(data);
    // handle success
  } catch (error) {
    // handle error
  }
};
```
**Pros:** Simplest
**Cons:** No reusable logic, harder to test, mixes concerns

---

## Recommendation

**Keep useMutation** because:
1. **Already using React Query** - No additional dependency
2. **Consistent pattern** - Same approach for all mutations (signin, logout, etc.)
3. **Better DX** - Easier to maintain and extend
4. **Production-ready** - Handles edge cases automatically
5. **Future-proof** - Easy to add retry logic, optimistic updates, etc.

The small overhead is worth the benefits for a production application.

---

## Summary

**Signup Flow:**
1. User submits form → `SignupForm.tsx`
2. Form validation → `validations/auth.ts` (Zod)
3. Mutation triggered → `useAuth.ts` (useSignup hook)
4. API request → `authApi.ts` (HTTP call)
5. Backend processes → NestJS `/auth/signup`
6. Tokens returned → `authApi.ts`
7. Success handler → `useAuth.ts` (onSuccess)
8. Tokens stored → `auth.ts` (localStorage)
9. User redirected → Dashboard

**useMutation is recommended** for maintainability, consistency, and production-grade error handling.
