# Chief Media Platform

A Next.js application for KW Singapore realtors and Property Lim Brothers users to connect with vendors and manage their media needs.

## Features

- **Email Code Authentication**: Secure login for KW Singapore realtors and Property Lim Brothers users using email verification codes
- **Vendor Connections**: Browse and connect with media vendors
- **Admin Dashboard**: Manage enquiries and platform administration
- **Responsive Design**: Modern UI with Tailwind CSS

## Getting Started

### Prerequisites

1. Node.js 18+ or Bun
2. SendGrid account for email verification

### Environment Setup

Create a `.env.local` file in the project root:

```env
# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key-here
SENDGRID_FROM_EMAIL=noreply@chiefmedia.sg

# Application Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-here
```

### Installation

```bash
# Install dependencies
bun install

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Authentication

- **KW Singapore Realtors**: Use email code authentication with @kwsingapore.com emails
- **Property Lim Brothers Users**: Use email code authentication with @propertylimbrothers.com emails
- **Admin Users**: Traditional password authentication
- **Other Users**: Traditional password authentication

For detailed setup instructions, see [SSO_SETUP.md](./SSO_SETUP.md).

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
