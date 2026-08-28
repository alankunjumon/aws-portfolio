# Deployment Guide

This guide explains how to deploy the AWS Serverless Portfolio Website using AWS managed services.

---

# Deployment Architecture

The application consists of:

* Amazon S3 for static website hosting.
* Amazon CloudFront for HTTPS and CDN.
* Amazon API Gateway for backend API requests.
* AWS Lambda for serverless backend processing.
* Amazon DynamoDB for storing contact messages.
* Amazon SES for sending email notifications.

---

# Step 1 — Upload Frontend to Amazon S3

Upload the following project files to the S3 bucket.

```text
index.html
architecture.html
css/
js/
assets/
```

The `assets` folder contains the downloadable resume and project assets.

---

# Step 2 — Configure CloudFront

Configure CloudFront with two origins.

| Origin      | Purpose                         |
| ----------- | ------------------------------- |
| Amazon S3   | Static website assets           |
| API Gateway | `/api/contact` backend endpoint |

### Behaviors

| Path Pattern  | Origin      |
| ------------- | ----------- |
| Default (`*`) | Amazon S3   |
| `/api/*`      | API Gateway |

Enable HTTPS redirection for viewers.

---

# Step 3 — Deploy AWS Lambda

Deploy the Python backend (`contact_handler.py`) as an AWS Lambda function.

The Lambda function should:

* Validate incoming requests.
* Store messages in DynamoDB.
* Send notifications through Amazon SES.
* Return JSON responses.

---

# Step 4 — Configure API Gateway

Create a REST API endpoint.

**Endpoint**

`POST /api/contact`

Integrate the endpoint with the Lambda function.

Enable CORS if required.

---

# Step 5 — Configure DynamoDB

Create a DynamoDB table named `PortfolioMessages`.

The table stores:

* Visitor name.
* Email.
* Message.
* Timestamp.
* Unique message identifier.

---

# Step 6 — Configure Amazon SES

Verify sender and recipient email identities.

Grant the Lambda IAM role permission to call `ses:SendEmail`.

---

# Step 7 — CloudFront Invalidation

Whenever frontend files change:

1. Upload updated files to S3.
2. Create a CloudFront invalidation.

### Recommended Invalidations

Frontend update:

```text
/index.html
```

Resume update:

```text
/assets/*
```

Complete frontend refresh:

```text
/*
```

---

# Deployment Verification Checklist

* Website loads over HTTPS.
* Homepage loads through CloudFront.
* Architecture page opens correctly.
* Contact form sends successfully.
* DynamoDB receives a new record.
* Amazon SES sends an email notification.
* Resume download works from the `assets` folder.

---

# Project Maintenance

### Frontend Changes

* Upload updated files to Amazon S3.
* Run a CloudFront invalidation.

### Backend Changes

* Update the Lambda function.
* Redeploy the Lambda function.
* Test the API Gateway endpoint.

### Monitoring

Use Amazon CloudWatch Logs to verify Lambda execution and troubleshoot backend issues.
