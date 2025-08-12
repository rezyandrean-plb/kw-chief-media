# Enquiry System Documentation

## Overview
The enquiry system allows KW Singapore realtors and Property Lim Brothers users to connect with vendors through a structured process. Only users with @kwsingapore.com or @propertylimbrothers.com email addresses can submit enquiries.

## How It Works

### 1. User Authentication
- Users must be logged in to submit enquiries
- Only users with @kwsingapore.com or @propertylimbrothers.com email addresses are allowed to connect with vendors
- Users without the correct email domain will see an error notification
- **Smart Redirects**: After login, users are automatically redirected based on their role:
  - KW Singapore realtors → `/vendors`
  - Property Lim Brothers users → `/vendors`
  - Admins → `/admin/enquiries`
  - Vendors → `/admin`
- Clients → `/admin`

### 2. Enquiry Process
1. **Browse Vendors**: Users can view vendor profiles at `/vendors`
2. **Connect**: Click "Connect with [Vendor]" button
3. **Select Services**: Choose which services they're interested in
4. **Submit Enquiry**: The enquiry is stored and a success notification is shown
5. **View Pricing**: After submission, pricing information is displayed
6. **Book Meeting**: Option to schedule a meeting with the vendor

### 3. Enquiry Management

#### For Realtors
- View their enquiries at `/enquiries`
- Track status: pending, approved, rejected, completed
- Filter enquiries by status
- View detailed enquiry information

#### For Admins
- Manage all enquiries at `/admin/enquiries`
- Approve or reject pending enquiries
- View detailed information about each enquiry
- Track enquiry statistics

### 4. Data Structure

Each enquiry contains:
```typescript
interface Enquiry {
  id: string;
  vendorId: string;
  vendorName: string;
  realtorId: string;
  realtorName: string;
  realtorEmail: string;
  offerings: string[];
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  createdAt: string;
  meetingDate?: string;
  meetingTime?: string;
  meetingType?: string;
  notes?: string;
}
```

### 5. Status Flow
1. **Pending**: Initial state when enquiry is submitted
2. **Approved**: Admin has approved the enquiry
3. **Rejected**: Admin has rejected the enquiry
4. **Completed**: Project has been completed

### 6. Features

#### Notifications
- Success notifications when enquiries are submitted
- Error notifications for invalid email domains
- Auto-dismissing notifications with manual close option

#### Filtering
- Filter enquiries by status (All, Pending, Approved, Completed)
- Real-time statistics showing counts for each status

#### Responsive Design
- Works on desktop and mobile devices
- Dark theme with Chief Media branding
- Animated backgrounds and smooth transitions

## Technical Implementation

### Files
- `src/app/vendors/[id]/page.tsx` - Vendor detail page with enquiry form
- `src/app/enquiries/page.tsx` - Realtor enquiry management
- `src/app/admin/enquiries/page.tsx` - Admin enquiry management
- `src/lib/enquiries.tsx` - Enquiry context and data management
- `src/components/Notification.tsx` - Notification component

### Data Storage
- Currently uses localStorage for demo purposes
- In production, this would connect to a backend API
- Enquiries are stored per user and can be filtered by vendor or realtor

### Security
- Email domain validation for KW Singapore realtors and Property Lim Brothers users
- Role-based access control
- User authentication required for all enquiry operations

## Usage Examples

### Testing the System
1. Login with a @kwsingapore.com email (e.g., `test@kwsingapore.com`) or @propertylimbrothers.com email (e.g., `test@propertylimbrothers.com`)
2. You'll be automatically redirected to `/vendors` (not dashboard)
3. Select a vendor and click "Connect with [Vendor]"
4. Select services and submit enquiry
5. View your enquiries at `/enquiries`

### Admin Testing
1. Login with admin credentials (`isabelle@chiefmedia.sg` / `admin123`)
2. You'll be automatically redirected to `/admin/enquiries`
3. View and manage all enquiries
4. Approve or reject pending enquiries 