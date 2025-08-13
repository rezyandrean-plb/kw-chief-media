# Studios Admin API Documentation

## Overview

The Studios Admin API provides a complete CRUD interface for managing studio facilities. The API integrates with a Strapi backend at `https://cheerful-bouquet-5ddcfa597e.strapiapp.com` and provides a consistent interface for the admin panel.

## API Endpoints

### Base URL
- **Development**: `http://localhost:3000/api/admin/studios`
- **Production**: `https://your-domain.com/api/admin/studios`

### Authentication
All endpoints require admin authentication. Users must be logged in with an admin role to access these endpoints.

---

## 1. Get All Studios

**GET** `/api/admin/studios`

Retrieves all studios with optional filtering.

### Query Parameters
- `status` (optional): Filter by status (`active`, `inactive`, `maintenance`, `all`)
- `search` (optional): Search in name, address, or description

### Example Request
```bash
curl -X GET "http://localhost:3000/api/admin/studios?status=active&search=north" \
  -H "Content-Type: application/json"
```

### Example Response
```json
{
  "success": true,
  "data": [
    {
      "id": "1",
      "name": "North Studio",
      "address": "5 Ang Mo Kio Industrial Park 2A AMK Tech II #05-08 S567760",
      "description": "High-quality property photography with professional lighting and state-of-the-art equipment.",
      "image": "/images/studio/north-studio.webp",
      "status": "active",
      "equipment": ["Professional Cameras", "Lighting Equipment", "Audio Equipment", "Green Screen"],
      "operatingHours": "Monday: 9:00 AM - 6:00 PM, Tuesday: 9:00 AM - 6:00 PM",
      "contact": {
        "email": "north@chiefmedia.sg",
        "phone": "+65 9123 4567"
      },
      "createdAt": "2024-01-15",
      "updatedAt": "2024-01-20"
    }
  ],
  "total": 1
}
```

---

## 2. Get Studio by ID

**GET** `/api/admin/studios/:id`

Retrieves a specific studio by its ID.

### Example Request
```bash
curl -X GET "http://localhost:3000/api/admin/studios/1" \
  -H "Content-Type: application/json"
```

### Example Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "North Studio",
    "address": "5 Ang Mo Kio Industrial Park 2A AMK Tech II #05-08 S567760",
    "description": "High-quality property photography with professional lighting and state-of-the-art equipment.",
    "image": "/images/studio/north-studio.webp",
    "status": "active",
    "equipment": ["Professional Cameras", "Lighting Equipment", "Audio Equipment", "Green Screen"],
    "operatingHours": "Monday: 9:00 AM - 6:00 PM, Tuesday: 9:00 AM - 6:00 PM",
    "contact": {
      "email": "north@chiefmedia.sg",
      "phone": "+65 9123 4567"
    },
    "createdAt": "2024-01-15",
    "updatedAt": "2024-01-20"
  }
}
```

---

## 3. Create Studio

**POST** `/api/admin/studios`

Creates a new studio.

### Request Body
```json
{
  "name": "New Studio",
  "address": "123 Studio Street",
  "description": "A new studio facility",
  "image": "https://example.com/studio-image.jpg",
  "status": "active",
  "equipment": ["Camera", "Lighting", "Audio Equipment"],
  "operatingHours": "Monday: 9:00 AM - 6:00 PM, Tuesday: 9:00 AM - 6:00 PM",
  "contact": {
    "email": "studio@example.com",
    "phone": "+1234567890"
  }
}
```

### Required Fields
- `name`: Studio name
- `address`: Studio address
- `description`: Studio description
- `contact.email`: Contact email
- `contact.phone`: Contact phone

### Example Request
```bash
curl -X POST "http://localhost:3000/api/admin/studios" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Studio",
    "address": "123 Studio Street",
    "description": "A new studio facility",
    "status": "active",
    "equipment": ["Camera", "Lighting"],
    "operatingHours": "Monday: 9:00 AM - 6:00 PM",
    "contact": {
      "email": "studio@example.com",
      "phone": "+1234567890"
    }
  }'
```

### Example Response
```json
{
  "success": true,
  "data": {
    "id": "13",
    "name": "New Studio",
    "address": "123 Studio Street",
    "description": "A new studio facility",
    "image": "",
    "status": "active",
    "equipment": ["Camera", "Lighting"],
    "operatingHours": "Monday: 9:00 AM - 6:00 PM",
    "contact": {
      "email": "studio@example.com",
      "phone": "+1234567890"
    },
    "createdAt": "2024-01-21",
    "updatedAt": "2024-01-21"
  },
  "message": "Studio created successfully"
}
```

---

## 4. Update Studio

**PUT** `/api/admin/studios/:id`

Updates an existing studio.

### Request Body
Same structure as Create Studio, but all fields are optional.

### Example Request
```bash
curl -X PUT "http://localhost:3000/api/admin/studios/1" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Studio Name",
    "description": "Updated description"
  }'
```

### Example Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "Updated Studio Name",
    "address": "5 Ang Mo Kio Industrial Park 2A AMK Tech II #05-08 S567760",
    "description": "Updated description",
    "image": "/images/studio/north-studio.webp",
    "status": "active",
    "equipment": ["Professional Cameras", "Lighting Equipment", "Audio Equipment", "Green Screen"],
    "operatingHours": "Monday: 9:00 AM - 6:00 PM, Tuesday: 9:00 AM - 6:00 PM",
    "contact": {
      "email": "north@chiefmedia.sg",
      "phone": "+65 9123 4567"
    },
    "createdAt": "2024-01-15",
    "updatedAt": "2024-01-21"
  },
  "message": "Studio updated successfully"
}
```

---

## 5. Delete Studio

**DELETE** `/api/admin/studios/:id`

Deletes a studio by ID.

### Example Request
```bash
curl -X DELETE "http://localhost:3000/api/admin/studios/1" \
  -H "Content-Type: application/json"
```

### Example Response
```json
{
  "success": true,
  "data": {
    "id": "1",
    "name": "North Studio",
    "address": "5 Ang Mo Kio Industrial Park 2A AMK Tech II #05-08 S567760",
    "description": "High-quality property photography with professional lighting and state-of-the-art equipment.",
    "image": "/images/studio/north-studio.webp",
    "status": "active",
    "equipment": ["Professional Cameras", "Lighting Equipment", "Audio Equipment", "Green Screen"],
    "operatingHours": "Monday: 9:00 AM - 6:00 PM, Tuesday: 9:00 AM - 6:00 PM",
    "contact": {
      "email": "north@chiefmedia.sg",
      "phone": "+65 9123 4567"
    },
    "createdAt": "2024-01-15",
    "updatedAt": "2024-01-20"
  },
  "message": "Studio deleted successfully"
}
```

---

## Error Responses

### Unauthorized (401)
```json
{
  "error": "Unauthorized"
}
```

### Not Found (404)
```json
{
  "error": "Studio not found"
}
```

### Bad Request (400)
```json
{
  "error": "Name is required"
}
```

### Internal Server Error (500)
```json
{
  "error": "Internal server error"
}
```

---

## Data Models

### Studio Object
```typescript
interface Studio {
  id: string;
  name: string;
  address: string;
  description: string;
  image: string;
  status: 'active' | 'inactive' | 'maintenance';
  equipment: string[];
  operatingHours: string;
  contact: {
    email: string;
    phone: string;
  };
  createdAt: string;
  updatedAt: string;
}
```

### Studio Form Data
```typescript
interface StudioFormData {
  name: string;
  address: string;
  description: string;
  image: string;
  status: 'active' | 'inactive' | 'maintenance';
  equipment: string[];
  operatingHours: string;
  contact: {
    email: string;
    phone: string;
  };
}
```

---

## Implementation Details

### File Structure
```
src/
├── app/
│   └── api/
│       └── admin/
│           └── studios/
│               ├── route.ts              # GET /, POST /
│               └── [id]/
│                   └── route.ts          # GET /:id, PUT /:id, DELETE /:id
├── lib/
│   ├── strapi-api.ts                     # Strapi API integration
│   └── studios-data.ts                   # Shared data types
└── app/
    └── admin/
        └── studios/
            └── page.tsx                  # Admin UI
```

### Key Features
- **Authentication**: All endpoints require admin authentication
- **Data Validation**: Input validation for required fields
- **Error Handling**: Comprehensive error handling with appropriate HTTP status codes
- **Strapi Integration**: Seamless integration with Strapi CMS
- **Type Safety**: Full TypeScript support with proper interfaces
- **Filtering**: Support for status and search filtering
- **Operating Hours**: Flexible operating hours format conversion

### Strapi Integration
The API integrates with Strapi CMS at `https://cheerful-bouquet-5ddcfa597e.strapiapp.com` and handles:
- Data format conversion between Strapi and application formats
- Operating hours parsing and formatting
- Error handling for Strapi API responses
- Authentication and authorization

---

## Testing

The API has been tested with:
- ✅ GET all studios with filtering
- ✅ GET studio by ID
- ✅ POST create studio
- ✅ PUT update studio
- ✅ DELETE studio
- ✅ Error handling
- ✅ Authentication

All endpoints are working correctly and integrated with the Strapi backend.
