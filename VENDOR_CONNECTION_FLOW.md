# Vendor Connection Flow Documentation

## Overview
This document describes the vendor connection flow implemented for the Chief Media platform, allowing KW Singapore realtors and Property Lim Brothers users to connect with verified vendors.

## User Roles & Access

### Realtors (KW Singapore & Property Lim Brothers)
- **Email Requirement**: Must use `@kwsingapore.com` or `@propertylimbrothers.com` email addresses
- **Access**: Can browse vendors, submit enquiries, and book meetings
- **Login**: Standard login with KW Singapore or Property Lim Brothers email validation

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
- **Connect Button**: Only visible to authenticated KW Singapore and Property Lim Brothers realtors

### 3. Enquiry Submission
- **Service Selection**: Choose specific services of interest
- **Enquiry Form**: Submit interest in selected offerings
- **Validation**: Ensures KW Singapore or Property Lim Brothers email requirement
- **Storage**: Enquiry saved to system for admin review

### 4. Pricing Reveal
- **After Enquiry**: Pricing becomes visible for selected services
- **Transparency**: Encourages choices based on offerings, not just price
- **Booking**: Option to proceed with meeting booking

### 5. Meeting Booking (`/vendors/[id]/book-meeting`)
- **Calendar Selection**: Choose available date and time slots
- **Meeting Type**: Video call, phone call, or in-person
- **Confirmation**: Receive booking confirmation and details

## User Experience

### For Realtors
- **Seamless Access**: Quick login with company email
- **Vendor Discovery**: Browse and filter vendors by services
- **Easy Connection**: One-click enquiry submission
- **Meeting Booking**: Schedule consultations directly
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
- **KW Singapore & Property Lim Brothers Only**: Strict email domain validation
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
1. Login with any `@kwsingapore.com` or `@propertylimbrothers.com` email
2. Browse vendors at `/vendors`
3. Click "Connect" on any vendor
4. Select services and submit enquiry
5. Book meeting after pricing reveal

### Vendor Experience
- Vendors are managed through admin dashboard
- No direct login access required
- Profile information is static and managed by admin 