## API Gateway Endpoint

Stage: prod

Invoke URL:
https://xkjh30d0ha.execute-api.ap-south-1.amazonaws.com/prod

Contact Endpoint:
https://xkjh30d0ha.execute-api.ap-south-1.amazonaws.com/prod/contact

## API Gateway Endpoint

**Stage:** `prod`

### Direct API Gateway Invoke URL

`https://xkjh30d0ha.execute-api.ap-south-1.amazonaws.com/prod`

### Direct Contact Endpoint (Testing Only)

`https://xkjh30d0ha.execute-api.ap-south-1.amazonaws.com/prod/contact`

> This endpoint is used for backend testing and troubleshooting.

---

## CloudFront Public Endpoint

**Distribution ID:** `E37CQ9A0LRCCFU`

**Distribution Domain:**

`https://d343tuwzqee0su.cloudfront.net`

### Public Contact Endpoint (Production)

`https://d343tuwzqee0su.cloudfront.net/api/contact`

> This is the endpoint used by the portfolio website. CloudFront rewrites `/api/contact` to `/contact` using the `rewrite-api-path` CloudFront Function before forwarding the request to API Gateway.

---

## Deployment Validation

Verified:

* CloudFront forwards `/api/contact` to API Gateway.
* Lambda executes successfully.
* DynamoDB stores the submission.
* Amazon SES sends an email notification.
* HTTPS is enabled through CloudFront.
