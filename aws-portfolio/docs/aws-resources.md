# AWS Resources — Portfolio Project

## Region

**AWS Region:** `ap-south-1 (Mumbai)`

---

## Amazon S3

**Bucket Name:** `alank-portfolio-ap-south-1`

**Purpose:** Stores the static portfolio website files (HTML, CSS, JavaScript, images).

**Security Configuration**

* Block Public Access: Enabled (all four settings ON).
* Object Ownership: Bucket Owner Enforced (ACLs disabled).
* Access Method: Private bucket accessible only through CloudFront Origin Access Control (OAC).

---

## Amazon CloudFront

**Distribution ID:** `E37CQ9A0LRCCFU`

**Distribution Domain:** `d343tuwzqee0su.cloudfront.net`

**Purpose:** Serves the portfolio globally over HTTPS and routes API requests to API Gateway.

**Configuration**

* Default Root Object: `index.html`
* HTTPS: Enabled (CloudFront default certificate)
* Origin Access Control: Enabled for S3.
* CloudFront Function: `rewrite-api-path`

---

## Amazon DynamoDB

**Table Name:** `PortfolioContacts`

**Partition Key:** `submissionId` (String)

**Billing Mode:** On-Demand

**Purpose:** Stores contact form submissions.

---

## AWS Lambda

**Function Name:** `portfolio-contact-handler`

**Runtime:** Python 3.12

**Purpose:** Processes contact form submissions, stores data in DynamoDB, and sends notification emails through Amazon SES.

---

## IAM

**Execution Role:** `portfolio-lambda-role`

**Permissions**

* DynamoDB (`PutItem` on `PortfolioContacts`)
* Amazon SES (`SendEmail`)
* CloudWatch Logs
* AWS-managed KMS for Lambda environment variables

**Purpose:** Provides least-privilege access for the Lambda function.

---

## Amazon API Gateway

**API Name:** `portfolio-contact-api`

**API ID:** `xkjh30d0ha`

**Stage:** `prod`

**Resource**

* `POST /contact`

**Direct Backend Endpoint (Testing)**

`https://xkjh30d0ha.execute-api.ap-south-1.amazonaws.com/prod/contact`

**Purpose:** Receives contact form requests from CloudFront and invokes the Lambda function.

---

## Amazon SES

**Verified Sender Identity:** `alankunjumon1305@gmail.com`

**Purpose:** Sends email notifications whenever a visitor submits the portfolio contact form.

---

## Public Endpoints

### CloudFront Website (Production)

`https://d343tuwzqee0su.cloudfront.net`

### CloudFront Contact API (Used by Frontend)

`https://d343tuwzqee0su.cloudfront.net/api/contact`

### API Gateway Contact API (Testing Only)

`https://xkjh30d0ha.execute-api.ap-south-1.amazonaws.com/prod/contact`
