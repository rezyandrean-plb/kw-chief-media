# Vendors API Documentation

This document describes the API endpoints for managing vendors in the admin system.

## Base URL
All endpoints are prefixed with `/api/admin/vendors`

## Authentication
All endpoints require admin authentication via custom headers:
- `X-User-Email`: User's email address
- `X-User-Role`: Must be "admin"
- `X-User-Id`: User's ID

## Data Models

### Vendor Interface
```typescript
interface Vendor {
  id: string;
  name: string;
  company: string;
  services: string[];
  location: string;
  rating: number;
  projects: number;
  experience: string;
  description: string;
  specialties: string[];
  status: 'active' | 'inactive' | 'pending';
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}
```

### Vendor Form Data
```typescript
interface VendorFormData {
  name: string;
  company: string;
  services: string[];
  location: string;
  rating: number;
  projects: number;
  experience: string;
  description: string;
  specialties: string[];
  status: 'active' | 'inactive' | 'pending';
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  image: string;
}
```

## API Endpoints

### 1. GET /api/admin/vendors
Get all vendors with optional filtering.

**Query Parameters:**
- `status` (optional): Filter by status ('active', 'inactive', 'pending', 'all')
- `search` (optional): Search in name, company, description, or location
- `location` (optional): Filter by specific location

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "TUBEAR",
      "company": "TUBEAR",
      "services": ["virtual-staging", "photography"],
      "location": "Singapore",
      "rating": 5.0,
      "projects": 50,
      "experience": "5+ years",
      "description": "Specializing in virtual staging...",
      "specialties": ["Virtual Staging", "Digital Decluttering"],
      "status": "active",
      "contact": {
        "email": "hello@tubear.sg",
        "phone": "+65 9123 4567",
        "address": "Singapore"
      },
      "image": "/images/vendors/tubear.svg",
      "createdAt": "2024-01-15",
      "updatedAt": "2024-01-20"
    }
  ],
  "message": "Vendors fetched successfully"
}
```

### 2. GET /api/admin/vendors/:id
Get a specific vendor by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "TUBEAR",
    // ... vendor data
  }
}
```

### 3. POST /api/admin/vendors
Create a new vendor.

**Request Body:**
```json
{
  "name": "New Vendor",
  "company": "New Company",
  "services": ["photography", "videography"],
  "location": "Singapore",
  "rating": 5.0,
  "projects": 0,
  "experience": "2+ years",
  "description": "New vendor description",
  "specialties": ["Photography", "Videography"],
  "status": "pending",
  "contact": {
    "email": "contact@newvendor.com",
    "phone": "+65 1234 5678",
    "address": "Singapore"
  },
  "image": "/images/vendors/new-vendor.svg"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "6",
    "name": "New Vendor",
    // ... created vendor data
  },
  "message": "Vendor created successfully"
}
```

### 4. PUT /api/admin/vendors/:id
Update an existing vendor.

**Request Body:** (All fields are optional for partial updates)
```json
{
  "name": "Updated Vendor Name",
  "status": "active",
  "rating": 4.5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Updated Vendor Name",
    // ... updated vendor data
  },
  "message": "Vendor updated successfully"
}
```

### 5. DELETE /api/admin/vendors/:id
Delete a vendor.

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Deleted Vendor",
    // ... deleted vendor data
  },
  "message": "Vendor deleted successfully"
}
```

### 6. GET /api/admin/vendors/active
Get only active vendors.

**Response:**
```json
{
  "success": true,
  "data": [
    // ... active vendors only
  ],
  "message": "Active vendors fetched successfully"
}
```

### 7. GET /api/admin/vendors/search
Search vendors by query.

**Query Parameters:**
- `q` (required): Search query
- `status` (optional): Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    // ... matching vendors
  ],
  "message": "Found 3 vendors matching \"photography\""
}
```

### 8. GET /api/admin/vendors/location/:location
Get vendors by specific location.

**Query Parameters:**
- `status` (optional): Filter by status

**Response:**
```json
{
  "success": true,
  "data": [
    // ... vendors in specified location
  ],
  "message": "Found 5 vendors in Singapore"
}
```

## Error Responses

### 401 Unauthorized
```json
{
  "error": "Unauthorized"
}
```

### 400 Bad Request
```json
{
  "error": "Name is required"
}
```

### 404 Not Found
```json
{
  "error": "Vendor not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Validation Rules

### Required Fields (for creation):
- `name`: Non-empty string
- `company`: Non-empty string
- `location`: Non-empty string
- `description`: Non-empty string
- `contact.email`: Valid email format
- `contact.phone`: Non-empty string
- `contact.address`: Non-empty string

### Optional Fields:
- `services`: Array of strings
- `rating`: Number (default: 5.0)
- `projects`: Number (default: 0)
- `experience`: String
- `specialties`: Array of strings
- `status`: 'active' | 'inactive' | 'pending' (default: 'pending')
- `image`: String

## Available Services
- virtual-staging
- photography
- virtual-tours
- 3d-rendering
- brand-consulting
- videography
- podcast-production
- live-streaming
- graphic-design
- web-design
- content-writing
- personal-branding
- content-creation

## Implementation Notes

### Strapi Integration
The API integrates with Strapi CMS at `https://cheerful-bouquet-5ddcfa597e.strapiapp.com` and includes:
- Data transformation between Strapi format and application format
- Proper error handling for Strapi API responses
- Authentication via custom headers

### Frontend Integration
The admin vendors page (`/admin/vendors`) has been updated to:
- Fetch vendors from the API instead of using mock data
- Handle CRUD operations through API calls
- Include delete confirmation dialogs
- Show proper error messages and success notifications
- Support real-time status updates and filtering

### Security
- All endpoints require admin authentication
- Input validation on both client and server side
- Proper error handling without exposing sensitive information
