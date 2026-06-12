# 🧪 TROUBLESHOOTING GUIDE - SAMS Application

## 🔴 Problem: Registration Shows "invalid" Error

### ❌ What Was Happening:
- You fill out the registration form
- Click "Create account"
- See generic "Registration failed" message
- No idea what went wrong

### ✅ What Should Happen Now:
- Click "Create account"
- If validation fails, see specific error like:
  - `"password: Password must include upper, lower, and number"`
  - `"email: Invalid email"`
  - Field highlights in RED
- Fix the specific issue
- Try again

### 🛠️ How to Debug:

**Step 1**: Open Browser Developer Tools (Press F12)

**Step 2**: Click "Network" tab

**Step 3**: Try to register

**Step 4**: Look for failed request `POST /api/auth/register`

**Step 5**: Click on it and view "Response"

**Expected Response if validation fails**:
```json
{
  "success": false,
  "errors": [
    {
      "path": ["password"],
      "message": "Password must include upper, lower, and number"
    }
  ]
}
```

**Expected Response if email exists**:
```json
{
  "success": false,
  "error": "Email already registered"
}
```

**Expected Response if success**:
```json
{
  "success": true,
  "message": "Registration successful. Email is not configured..."
}
```

---

## 🔴 Problem: Not Redirected to Login After Registration

### ❌ What Was Happening:
- Registration succeeds
- Page shows success message
- You have to manually navigate to login
- Confusing user experience

### ✅ What Should Happen Now:
- Registration succeeds
- See success message with animation
- See "Redirecting to login..." text
- Auto-redirects to `/login` after 2 seconds
- Can login immediately

### 🛠️ How to Debug:

Check if you see the success message:
```
✓ "Registration successful. Email is not configured..."
✓ "Redirecting to login..."
```

If YES → Everything working ✅
If NO → Check browser console for errors (F12)

---

## 🔴 Problem: Login Fails with Unclear Error

### ✅ What Should Happen:
- Try login with wrong password
- See clear error: "Invalid credentials"
- Try login with non-existent email
- See clear error: "Invalid credentials"

### 🛠️ How to Debug:

**Check 1**: Are you using correct email format?
```
✅ CORRECT: tejaswini@student.edu
❌ WRONG: tejaswini
❌ WRONG: @student.edu
```

**Check 2**: Is your password correct?
- Passwords are CASE-SENSITIVE
- `Password123` ≠ `password123`

**Check 3**: Did you register this account?
- Check if account exists in database
- Try registering a new account

**Check 4**: Browser console errors (F12)
- Look for network errors
- Check if API is returning 401/403

**Expected Responses**:
```json
// Wrong email
{
  "success": false,
  "error": "Invalid credentials"
}

// Wrong password
{
  "success": false,
  "error": "Invalid credentials"
}

// Email not verified (if emails were configured)
{
  "success": false,
  "error": "Please verify your email before login"
}

// Success
{
  "success": true,
  "user": {
    "id": 1,
    "fullName": "Tejaswini Yerra",
    "email": "tejaswini@student.edu",
    "role": "student"
  },
  "accessToken": "eyJhbGc...",
  "refreshToken": "eyJhbGc..."
}
```

---

## 🔴 Problem: Stuck on Login Page After Login

### ✅ Expected Behavior:
- You click "Sign in"
- Page shows loading state
- Redirects to `/student/dashboard`
- See dashboard with data

### ❌ What Might Be Wrong:

**Issue 1**: Backend not running
```
❌ Cannot connect to http://localhost:4000
✅ Solution: Start backend server
```

**Issue 2**: API CORS error
```
❌ Error: Cross-Origin Request Blocked
✅ Solution: Check CORS config in backend (should allow http://localhost:5173)
```

**Issue 3**: Token not saved
```
❌ Can log in but get redirected back to login
✅ Solution: Check if localStorage is enabled in browser
   - DevTools → Application → Local Storage
   - Should have "sams_user" key
```

**Issue 4**: Dashboard API fails
```
❌ Login works but dashboard shows blank/error
✅ Check API: GET /api/students/dashboard
   - F12 → Network → Filter "dashboard"
   - Should return 200 status with data
```

---

## 🔴 Problem: Protected Routes Redirect to Login

### ✅ Expected Behavior:
- Logged in as student
- Navigate to `/student/dashboard`
- See dashboard
- Click "Profile" → See profile page

### ❌ What Might Be Wrong:

**Issue 1**: Not logged in
```
❌ Trying to access /student/dashboard without logging in
✅ Solution: Login first
```

**Issue 2**: Token expired
```
❌ Were logged in, but token expired
✅ Solution: Login again
```

**Issue 3**: Wrong role
```
❌ Student trying to access /admin/dashboard
✅ Solution: Use correct user account for that role
```

**Issue 4**: localStorage cleared
```
❌ Browser cleared storage, lost login info
✅ Solution: Login again
   - DevTools → Application → Storage → Clear All
```

---

## 🔴 Problem: Form Fields Not Saving

### ✅ Expected Behavior:
- Fill in Profile form
- Click "Save"
- Data persists
- Reload page → Data still there

### ❌ What Might Be Wrong:

**Issue 1**: Not authenticated
```
❌ Trying to save without being logged in
❌ Getting 401 Unauthorized error
✅ Solution: Login first
```

**Issue 2**: Backend validation failing
```
❌ Some fields have validation rules
❌ Check console for validation error
✅ Solution: Follow field requirements
```

**Issue 3**: Database connection issue
```
❌ Server error (500) when saving
✅ Solution: Check backend logs
   - Look for database connection errors
   - Verify DATABASE_URL in .env is correct
```

---

## 🔴 Problem: Files Not Uploading

### ✅ Expected Behavior:
- Go to Documents page
- Select document type
- Choose file
- Click Upload
- See file in list

### ❌ What Might Be Wrong:

**Issue 1**: File too large
```
❌ Error: File exceeds limit
✅ Solution: Use file smaller than 15MB
```

**Issue 2**: Wrong file format
```
❌ Error: Invalid file type
✅ Solution: Upload PDF, JPG, PNG
```

**Issue 3**: Upload directory doesn't exist
```
❌ Server error when uploading
✅ Solution: Backend should auto-create /uploads directory
   - Check if /backend/uploads/ exists
   - If not, create manually
```

**Issue 4**: Permissions issue
```
❌ Error: Cannot write to uploads directory
✅ Solution: Check folder permissions
   - Directory should be writable by Node process
```

---

## 🧪 Verification Checklist

### Before Testing:
- [ ] Backend running on http://localhost:4000
- [ ] Frontend running on http://localhost:5173
- [ ] Database connected (check .env DATABASE_URL)
- [ ] Email config has placeholder values (for dev mode)

### Registration Test:
- [ ] Can open /register page
- [ ] Form has 5 fields (Name, Email, Mobile, Password, Confirm)
- [ ] Password field shows help text
- [ ] Validation shows specific errors
- [ ] Auto-redirects to login after success

### Login Test:
- [ ] Can open /login page
- [ ] Form has 2 fields (Email, Password)
- [ ] Wrong credentials show error
- [ ] Correct credentials redirect to dashboard
- [ ] Stored in localStorage

### Dashboard Test:
- [ ] Can see 4 stat cards
- [ ] Can see application progress steps
- [ ] Can see profile completion bar
- [ ] Navigation sidebar works
- [ ] Sign out button works

---

## 📊 Debug Commands

### Check if backend is running:
```bash
# In terminal where backend is running
# Should show "Server running on http://localhost:4000"
# Should show "Connected to database"
```

### Check if frontend is running:
```bash
# In terminal where frontend is running
# Should show "VITE v... ready in ... ms"
# Should show "local: http://localhost:5173"
```

### Test API from terminal:
```bash
# Register test
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "mobile": "1234567890",
    "password": "Test@12345",
    "confirmPassword": "Test@12345"
  }'

# Login test
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test@12345"
  }'
```

---

## 🆘 Still Not Working?

### Step 1: Collect Information
- [ ] Exact error message (screenshot)
- [ ] What were you trying to do?
- [ ] What did you expect to happen?
- [ ] What actually happened?
- [ ] Browser console errors (F12)
- [ ] Backend terminal errors

### Step 2: Check Logs
```bash
# Backend logs
# Look for errors like:
# - Database connection issues
# - Route not found
# - Validation errors
# - JWT token errors

# Frontend logs (F12 Console)
# Look for errors like:
# - API not found (404)
# - Not authorized (401)
# - CORS errors
# - Parse errors
```

### Step 3: Clear Cache
```bash
# In browser:
# Ctrl + Shift + Delete
# Clear All Time
# ✓ Cookies and other site data
# ✓ Cached images and files
# Then reload page (Ctrl + R)
```

### Step 4: Check Database
```bash
# Verify connection in backend
# Check PostgreSQL is running
# Verify DATABASE_URL is correct
# Run migrations if needed: npx prisma migrate dev
```

---

## ✅ Success Indicators

You'll know everything is working when:

✅ **Registration**:
- Form accepts valid data
- Shows specific validation errors
- Auto-redirects to login

✅ **Login**:
- Accepts correct credentials
- Redirects to dashboard
- Shows user info in sidebar

✅ **Dashboard**:
- Shows 4 stat cards with data
- Shows application progress
- Sidebar navigation works
- Can logout and return to login

✅ **Full Workflow**:
- Can register → login → see dashboard
- Can edit profile
- Can submit admission
- Can upload documents
- All data persists on reload

---

## 📞 Getting Help

If you're still having issues:

1. **Check this guide** - Most common issues are covered
2. **Check browser console** (F12) - JavaScript errors are shown here
3. **Check backend terminal** - Server errors are logged here
4. **Verify .env file** - All required variables set
5. **Test API directly** - Use curl or Postman to isolate issues

---

Last Updated: 2024
Made with ❤️ for SAMS Application

