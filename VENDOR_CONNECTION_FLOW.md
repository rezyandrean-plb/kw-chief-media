# Vendor Connection Flow Documentation

## Overview
This document describes the vendor connection flow implemented for the Chief Media platform, allowing KW Singapore realtors to connect with verified vendors.

## User Roles & Access

### Realtors (KW Singapore)
- **Email Requirement**: Must use `@kwsingapore.com` email addresses
- **Access**: Can browse vendors, submit enquiries, and book meetings
- **Login**: Standard login with KW Singapore email validation

### Vendors
- **Access**: No direct login access initially
- **Management**: All vendor data managed through admin dashboard
- **Profile**: Static profiles with offerings and portfolio

### Admin (Isabelle)
- **Login**: `isabelle@chiefmedia.sg` / `admin123`
- **Access**: Full admin dashboard to manage enquiries and vendor connections
- **Features**: View, approve, reject, and track all enquiries

## Connection Flow

### 1. Vendor Discovery
- Realtors browse vendors on `/vendors` page
- View vendor specialties, experience, and basic information
- Filter by service type and search functionality

### 2. Vendor Detail View (`/vendors/[id]`)
- **Portfolio Section**: View vendor's work samples and projects
- **Offerings Section**: See available services (pricing hidden initially)
- **Connect Button**: Only visible to authenticated KW Singapore realtors

### 3. Enquiry Submission
- **Service Selection**: Choose specific services of interest
- **Enquiry Form**: Submit interest in selected offerings
- **Validation**: Ensures KW Singapore email requirement
- **Storage**: Enquiry saved to system for admin review

### 4. Pricing Reveal
- **After Enquiry**: Pricing becomes visible for selected services
- **Transparency**: Encourages choices based on offerings, not just price
- **Booking**: Option to proceed with meeting booking

### 5. Meeting Booking (`/vendors/[id]/book-meeting`)
- **Calendar Selection**: Choose available date and time slots
- **Meeting Type**: Video call, phone call, or in-person
- **Additional Notes**: Include specific requirements or questions
- **Confirmation**: Meeting details saved and confirmation sent

### 6. Admin Management (`/admin/enquiries`)
- **Dashboard**: View all enquiries with status tracking
- **Status Management**: Approve, reject, or mark as completed
- **Filtering**: Filter by status (pending, approved, completed)
- **Details**: View full enquiry details and meeting information

## Technical Implementation

### Authentication System
- **Email Validation**: Automatic role assignment based on email domain
- **KW Singapore**: `@kwsingapore.com` emails get realtor role
- **Admin Access**: Specific admin credentials for Isabelle
- **Session Management**: Local storage for user persistence

### Data Management
- **Enquiry Context**: React context for managing enquiry data
- **Local Storage**: Persistent storage for enquiries and user data
- **Real-time Updates**: Immediate UI updates when status changes

### File Structure
```
src/
├── app/
│   ├── vendors/
│   │   ├── page.tsx              # Vendor listing
│   │   └── [id]/
│   │       ├── page.tsx          # Vendor detail
│   │       └── book-meeting/
│   │           └── page.tsx      # Meeting booking
│   ├── admin/
│   │   └── enquiries/
│   │       └── page.tsx          # Admin dashboard
│   └── dashboard/
│       └── page.tsx              # User dashboard
├── lib/
│   ├── auth.tsx                  # Authentication system
│   └── enquiries.tsx             # Enquiry management
└── components/
    └── AnimatedBackground.tsx    # UI components
```

## Key Features

### For Realtors
- **Vendor Discovery**: Browse and filter verified vendors
- **Portfolio Review**: View vendor work before connecting
- **Service Selection**: Choose specific services of interest
- **Meeting Booking**: Schedule consultations with vendors
- **Status Tracking**: Monitor enquiry and booking status

### For Admins
- **Enquiry Management**: View and manage all enquiries
- **Status Control**: Approve, reject, or complete enquiries
- **Vendor Oversight**: Monitor vendor-realtor connections
- **Data Analytics**: Track connection success rates

### For Vendors
- **Profile Showcase**: Display portfolio and offerings
- **Lead Generation**: Receive qualified enquiries from realtors
- **Meeting Coordination**: Schedule consultations through platform

## Security & Validation

### Email Validation
- **KW Singapore Only**: Strict email domain validation
- **Role Assignment**: Automatic role based on email domain
- **Admin Access**: Restricted admin login credentials

### Data Protection
- **Local Storage**: Secure data persistence
- **Validation**: Input validation on all forms
- **Access Control**: Role-based access to features

## Future Enhancements

### Planned Features
- **Vendor Dashboard**: Direct vendor access to manage enquiries
- **Notification System**: Email/SMS notifications for status changes
- **Calendar Integration**: Sync with external calendar systems
- **Payment Processing**: Integrated payment for services
- **Review System**: Vendor and realtor rating system

### Technical Improvements
- **Database Integration**: Replace local storage with proper database
- **API Development**: RESTful API for all operations
- **Real-time Updates**: WebSocket integration for live updates
- **Mobile App**: Native mobile application
- **Analytics Dashboard**: Advanced reporting and analytics

## Testing Instructions

### Admin Access
1. Login with: `isabelle@chiefmedia.sg` / `admin123`
2. Navigate to `/admin/enquiries`
3. View and manage enquiries

### Realtor Flow
1. Login with any `@kwsingapore.com` email
2. Browse vendors at `/vendors`
3. Click "Connect" on any vendor
4. Select services and submit enquiry
5. Book meeting after pricing reveal

### Vendor Experience
1. Vendor profiles are static (no login required)
2. All interactions managed through admin dashboard
3. Portfolio and offerings visible to all users

## Support & Maintenance

### Admin Responsibilities
- **Enquiry Management**: Regular review and processing of enquiries
- **Vendor Onboarding**: Adding new vendors to the platform
- **System Monitoring**: Ensuring smooth operation of the platform
- **User Support**: Assisting realtors and vendors with issues

### Technical Maintenance
- **Regular Updates**: Keep dependencies and security patches current
- **Performance Monitoring**: Monitor system performance and user experience
- **Backup Management**: Regular data backups and recovery procedures
- **Security Audits**: Periodic security reviews and updates 