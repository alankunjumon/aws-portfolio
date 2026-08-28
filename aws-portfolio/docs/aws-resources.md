# AWS Resources Used

This document describes every AWS service used in the **AWS Serverless Portfolio Website** project and its purpose within the architecture.

---

# Architecture Overview

The portfolio follows a fully serverless AWS architecture.

User Browser

↓

Amazon CloudFront (HTTPS + CDN)

├── Amazon S3 (Static Website)

└── API Gateway (/api/contact)

↓

AWS Lambda (Python Backend)

├── Amazon DynamoDB (Stores Contact Messages)

└── Amazon SES (Email Notifications)

CloudFront serves the frontend globally while forwarding `/api/contact` requests to API Gateway, which invokes a Lambda function to process contact requests.

---

# Amazon S3

**Purpose**

Hosts the static frontend of the portfolio website.

**Resources Stored**

* HTML pages
* CSS stylesheets
* JavaScript files
* Images and assets
* Resume PDF

**Why S3**

* Fully managed object storage.
* Highly durable and scalable.
* No server management required.

---

# Amazon CloudFront

**Purpose**

Acts as the Content Delivery Network (CDN) for the portfolio.

**Responsibilities**

* Serves the website over HTTPS.
* Caches static assets globally.
* Routes `/api/*` requests to API Gateway.
* Reduces latency for visitors.

**Configuration**

* Default Origin → Amazon S3
* API Origin → Amazon API Gateway
* Viewer Protocol Policy → Redirect HTTP to HTTPS

---

# Amazon API Gateway

**Purpose**

Provides the backend REST API used by the contact form.

**Endpoint**

`POST /api/contact`

**Responsibilities**

* Receives contact form requests.
* Invokes AWS Lambda.
* Returns JSON responses to the frontend.

---

# AWS Lambda

**Runtime**

Python

**Purpose**

Processes contact form submissions.

**Responsibilities**

* Validates incoming data.
* Stores messages in DynamoDB.
* Sends email notifications using Amazon SES.
* Returns HTTP responses.

---

# Amazon DynamoDB

**Table**

`PortfolioMessages`

**Purpose**

Stores every contact form submission.

**Attributes**

* MessageID
* Name
* Email
* Message
* Timestamp

**Why DynamoDB**

* Serverless NoSQL database.
* Automatic scaling.
* Low latency.

---

# Amazon SES

**Purpose**

Sends email notifications after successful contact form submissions.

**Configuration**

* Verified sender identity.
* Verified recipient identity (SES sandbox mode).

**Email Includes**

* Visitor name.
* Visitor email.
* Message.
* Submission timestamp.

---

# AWS IAM

**Purpose**

Provides secure permissions between AWS services.

**Lambda Permissions**

* DynamoDB PutItem
* SES SendEmail
* CloudWatch Logs

The project follows the **Principle of Least Privilege**.

---

# Amazon CloudWatch

**Purpose**

Monitors backend execution.

**Used For**

* Lambda execution logs.
* Error debugging.
* API request monitoring.

---

# AWS Services Summary

| Service            | Role                          |
| ------------------ | ----------------------------- |
| Amazon S3          | Static website hosting        |
| Amazon CloudFront  | HTTPS CDN and request routing |
| Amazon API Gateway | REST API endpoint             |
| AWS Lambda         | Serverless backend            |
| Amazon DynamoDB    | Contact message storage       |
| Amazon SES         | Email notifications           |
| AWS IAM            | Secure service permissions    |
| Amazon CloudWatch  | Monitoring and logging        |
