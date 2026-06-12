# SAMS Application - Complete Workflow Guide

## Application Overview
This is a Student Admission Management System (SAMS) with two user types:
- **Students**: Can register, complete profile, submit admission applications, upload documents
- **Admins**: Can review applications and verify documents

---

## 🚀 QUICK START - TEST THE ENTIRE WORKFLOW

### Prerequisites
✅ Backend running on `http://localhost:4000`
✅ Frontend running on `http://localhost:5173`
✅ Database connected (PostgreSQL via Supabase)

---

## 📋 SEQUENCE 1: Student Registration → Login → Dashboard

### Step 1️⃣: Register a New Student Account
**URL**: `http://localhost:5173/register`

**Form Fields** (with requirements):
```
Full Name: Tejaswini Yerra
  ├─ Requirement: Minimum 3 characters
  
Email: tejaswini@student.edu
  ├─ Requirement: Valid email format
  
Mobile Number: 06301594486
  ├─ Requirement: 10-16 digits
  
Password: Teja@12345
  ├─ Requirement: 
  │  ├─ Minimum 8 characters
  │  ├─ At least 1 UPPERCASE letter (A-Z)
  │  ├─ At least 1 lowercase letter (a-z)
  │  ├─ At least 1 number (0-9)
  
Confirm Password: Teja@12345
  ├─ Requirement: Must match Password field
```

**Expected Result**:
- ✅ "Registration successful. Email is not configured, so your account is already verified for development."
- ✅ Auto-redirect to Login page after 2 seconds
- ✅ If validation fails: Red border on invalid field + error message displayed

**Common Errors**:
| Error | Cause | Fix |
|-------|-------|-----|
| "fullName: String must contain at least 3 character(s)" | Name too short | Use full name (min 3 chars) |
| "email: Invalid email" | Invalid email format | Use valid email (name@domain.com) |
| "mobile: String must have length greater than or equal to 10" | Mobile too short | Use 10-16 digit number |
| "password: Password must include upper, lower, and number" | Weak password | Use format like: Abc123xyz |
| "confirmPassword: Passwords must match" | Passwords don't match | Ensure both password fields are identical |

---

### Step 2️⃣: Login with Student Account
**URL**: `http://localhost:5173/login`

**Form Fields**:
```
Email: tejaswini@student.edu
Password: Teja@12345
```

**Expected Result**:
- ✅ Login successful
- ✅ Redirect to `/student/dashboard`
- ✅ See "Welcome back" message and dashboard cards

**Expected Dashboard Cards**:
- 📄 Application Status: "draft"
- 📋 Documents Uploaded: 0
- 🛡️ Verification Progress: "pending"
- 🔔 Notifications: 0
- 📊 Profile Completion: 0%

---

### Step 3️⃣: View Student Dashboard
**URL**: `http://localhost:5173/student/dashboard`

**Layout**:
```
SIDEBAR (Left)                    MAIN CONTENT (Right)
├─ SAMS Logo                      ├─ Stats Cards (4 cards)
├─ Navigation Menu:               │  ├─ Application Status
│  ├─ Dashboard (active)          │  ├─ Documents Uploaded
│  ├─ Profile                     │  ├─ Verification Progress
│  ├─ Admission                   │  └─ Notifications
│  └─ Documents                   │
├─ User Info                      ├─ Application Progress (5 steps)
└─ Sign Out Button                │  ├─ 1. Draft
                                  │  ├─ 2. Submitted
                                  │  ├─ 3. Under Review
                                  │  ├─ 4. Document Verification
                                  │  └─ 5. Approved/Rejected
                                  │
                                  └─ Profile Completion
                                     └─ Progress Bar (0%)
```

---

## 👤 SEQUENCE 2: Complete Student Profile

### Step 4️⃣: Navigate to Profile
**Sidebar**: Click "Profile"
**URL**: `http://localhost:5173/student/profile`

**Profile Fields to Fill**:
- Full Name: Tejaswini Yerra
- Date of Birth: 2003-05-15
- Gender: Female
- Blood Group: O+
- Nationality: Indian
- Religion: Hindu
- Category: General
- Mobile: 06301594486
- Address: 123 University Road, Hyderabad
- Guardian Name: Yerra Rajesh
- Guardian Occupation: Engineer
- Guardian Income: 500000
- Emergency Contact: 9876543210

**Expected Result**:
- ✅ Form submits successfully
- ✅ Profile Completion increases on dashboard
- ✅ Fields are saved and persist on reload

---

## 📝 SEQUENCE 3: Submit Admission Application

### Step 5️⃣: Start Admission Application
**Sidebar**: Click "Admission"
**URL**: `http://localhost:5173/student/admission`

**Application Form Fields**:
- Course: Computer Science
- Branch: Engineering
- Admission Category: Merit
- Hostel Required: Yes/No (toggle)
- Scholarship Required: Yes/No (toggle)
- Previous Institution: (optional)
- Declaration: ✅ Accept Terms

**Expected Result**:
- ✅ Application saved as draft
- ✅ Can save and return later to edit
- ✅ Status shows "draft" on dashboard

### Step 6️⃣: Submit Application
- Click "Submit Application" button
- Application Status changes: "draft" → "submitted"
- Date: Current submission date

**Expected Result**:
- ✅ Application Status changes to "Submitted"
- ✅ Application Progress Step 1 marks as complete
- ✅ User cannot edit submitted application

---

## 📄 SEQUENCE 4: Upload Documents

### Step 7️⃣: Navigate to Document Center
**Sidebar**: Click "Documents"
**URL**: `http://localhost:5173/student/documents`

**Documents to Upload**:
- ✅ 10th Grade Certificate (PDF)
- ✅ 12th Grade Certificate (PDF)
- ✅ Entrance Exam Score Card (PDF)
- ✅ Transfer Certificate (PDF)

**Upload Steps**:
1. Select document type from dropdown
2. Choose file from computer
3. Click "Upload Document"
4. Wait for upload confirmation

**Expected Result**:
- ✅ File uploaded successfully
- ✅ Appears in "Uploaded Documents" list
- ✅ Dashboard: "Documents Uploaded" count increases
- ✅ Shows file name, upload date, verification status

**Document Status Flow**:
```
Pending → Under Review → Verified ✅
   ↓
   └─→ Rejected ❌ (with rejection notes)
```

---

## 👨‍💼 SEQUENCE 5: Admin Review Workflow

### Step 8️⃣: Login as Admin
**URL**: `http://localhost:5173/login`

**Use Demo Admin Credentials** (created in seed):
```
Email: admin@sams.edu
Password: AdminPass@123
```

**Expected Result**:
- ✅ Redirect to `/admin/dashboard`
- ✅ See admin-specific layout and navigation

---

### Step 9️⃣: View Admin Dashboard
**URL**: `http://localhost:5173/admin/dashboard`

**Admin Stats**:
- 📊 Total Applications: (count)
- 📋 Pending Review: (count)
- ✅ Approved: (count)
- ❌ Rejected: (count)

---

### Step 🔟: Review Student Applications
**Sidebar**: Click "Applications"
**URL**: `http://localhost:5173/admin/applications`

**Application List Features**:
- Search by student name or email
- Filter by status (draft, submitted, under review, approved, rejected)
- Click application to view details

**Application Detail View**:
```
Student Information          Application Details
├─ Full Name                ├─ Course
├─ Email                    ├─ Branch
├─ Mobile                   ├─ Category
└─ Profile Details          ├─ Hostel Required
                            └─ Scholarship Required

Uploaded Documents
├─ Document 1
│  ├─ File name
│  ├─ Upload date
│  └─ Verification Status
└─ Document 2

Admin Actions
├─ ✅ Approve Application
├─ ❌ Reject Application
├─ ✓ Verify Document
└─ 📝 Add Notes
```

### Action: Verify Documents
- Click "Verify" button for each document
- Add verification notes (optional)
- Document status: "Pending" → "Verified"

### Action: Approve Application
- Review all information
- Verify all documents
- Click "Approve Application"
- Application Status: "Approved"

**Expected Result**:
- ✅ Student receives notification
- ✅ Student can see approval status on their dashboard
- ✅ Application Progress shows: Step 5 - Approved

---

## ❌ SEQUENCE 6: Error Handling & Edge Cases

### Error Case 1: Invalid Password
**Registration**:
```
Password: password123  ❌ (no uppercase)
Error: "Password must include upper, lower, and number"
```

### Error Case 2: Duplicate Email
**Registration** with existing email:
```
Email: tejaswini@student.edu (already registered)
Error: "Email already registered"
```

### Error Case 3: Session Expired
**While logged in**: Browser session expires after inactivity
- Trying to access protected route
- Redirect to: `/login`
- Message: "Authentication required"

### Error Case 4: Unauthorized Access
**Student trying to access admin page**:
- URL: `http://localhost:5173/admin/dashboard`
- Expected: Redirect to `/login`
- Reason: Role mismatch protection

---

## 🔄 NAVIGATION MAP

```
START
  │
  ├─→ /register ─→ /login ─→ / ─→ /student/dashboard
  │                          │
  │                          └─→ /admin/dashboard (if admin role)
  │
  └─→ /login ─→ / ─→ [Dashboard]

STUDENT NAVIGATION:
/student/dashboard
├─→ /student/profile
├─→ /student/admission
└─→ /student/documents

ADMIN NAVIGATION:
/admin/dashboard
└─→ /admin/applications

LOGOUT:
[Any Page] ─→ Click "Sign out" ─→ /login
```

---

## 🧪 TESTING CHECKLIST

### Registration ✓
- [ ] Fill form with valid data → Register successfully
- [ ] Password doesn't meet requirements → Show error
- [ ] Email already exists → Show error
- [ ] Form validation errors highlight fields in red
- [ ] Auto-redirect to login after success

### Login ✓
- [ ] Correct credentials → Login successfully
- [ ] Wrong password → Show error
- [ ] Non-existent email → Show error
- [ ] Redirect to dashboard based on role

### Dashboard ✓
- [ ] All 4 stat cards display
- [ ] Application progress shows 5 steps
- [ ] Profile completion progress bar visible
- [ ] Notifications display correctly

### Profile ✓
- [ ] All fields save successfully
- [ ] Profile completion updates on dashboard
- [ ] Data persists on page reload
- [ ] Validation errors show for invalid data

### Admission ✓
- [ ] Can save draft application
- [ ] Can edit draft before submitting
- [ ] Can submit application
- [ ] Cannot edit after submission
- [ ] Status updates: "draft" → "submitted"

### Documents ✓
- [ ] Can upload multiple documents
- [ ] Document list shows all uploads
- [ ] Dashboard document count increases
- [ ] Shows upload date and status

### Admin Functions ✓
- [ ] Can view all student applications
- [ ] Can verify documents
- [ ] Can approve applications
- [ ] Can add notes/comments
- [ ] Student sees updates on dashboard

### Redirect Flows ✓
- [ ] Registration → Auto-redirect to login
- [ ] Login → Redirect to dashboard based on role
- [ ] Logout → Redirect to login
- [ ] Protected route without login → Redirect to login
- [ ] Wrong role access → Redirect to login

---

## 📞 Support

**If you encounter issues**:

1. **Check Browser Console** (F12):
   - Look for any JavaScript errors
   - Check Network tab for failed API calls

2. **Check Backend Terminal**:
   - Look for server errors
   - Verify database connection

3. **Check Error Messages**:
   - Read the error carefully
   - Check validation requirements
   - Compare form data with requirements

4. **Clear Browser Cache**:
   - Press Ctrl+Shift+Delete
   - Clear cookies and cache
   - Try again

---

## 🎯 Success Indicators

✅ **Registration flow works perfectly**
- Form validates all fields correctly
- Validation errors are clear and helpful
- Auto-redirect after successful registration
- Can immediately login with new account

✅ **Full workflow is smooth**
- Navigation is intuitive
- All redirects happen correctly
- Data persists across page reloads
- No console errors

✅ **Both student and admin features work**
- Students can complete full application cycle
- Admins can review and approve applications
- Status updates reflect in real-time
- All pages are responsive and styled

---

Generated: 2024 | SAMS Application Workflow Guide
