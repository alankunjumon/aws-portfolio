import json
import os
import uuid
from datetime import datetime, timezone

import boto3
from botocore.exceptions import ClientError

# -------------------------------------------------------------------
# AWS Clients
# -------------------------------------------------------------------

dynamodb = boto3.resource("dynamodb")
ses = boto3.client("ses")

# -------------------------------------------------------------------
# Environment Variables
# -------------------------------------------------------------------

TABLE_NAME = os.environ["TABLE_NAME"]
SENDER_EMAIL = os.environ["SENDER_EMAIL"]
RECIPIENT_EMAIL = os.environ["RECIPIENT_EMAIL"]

table = dynamodb.Table(TABLE_NAME)

# -------------------------------------------------------------------
# Lambda Handler
# -------------------------------------------------------------------

def lambda_handler(event, context):
    try:
        # -----------------------------------------------------------
        # Parse request body
        # API Gateway sends body as a JSON string.
        # -----------------------------------------------------------
        body = json.loads(event["body"])

        name = body.get("name", "").strip()
        email = body.get("email", "").strip().lower()
        message = body.get("message", "").strip()

        # -----------------------------------------------------------
        # Validation
        # -----------------------------------------------------------

        if not name or not email or not message:
            return response(
                400,
                {"message": "Name, email and message are required."}
            )

        if "@" not in email or "." not in email:
            return response(
                400,
                {"message": "Please enter a valid email address."}
            )

        if len(name) > 100:
            return response(400, {"message": "Name is too long."})

        if len(email) > 254:
            return response(400, {"message": "Email is too long."})

        if len(message) > 5000:
            return response(400, {"message": "Message exceeds 5000 characters."})

        # -----------------------------------------------------------
        # Generate metadata
        # -----------------------------------------------------------

        submission_id = str(uuid.uuid4())
        timestamp = datetime.now(timezone.utc).isoformat()

        # -----------------------------------------------------------
        # Store submission in DynamoDB
        # -----------------------------------------------------------

        table.put_item(
            Item={
                "submissionId": submission_id,
                "name": name,
                "email": email,
                "message": message,
                "timestamp": timestamp,
            }
        )

        # -----------------------------------------------------------
        # Send notification email through Amazon SES
        # -----------------------------------------------------------

        ses.send_email(
            Source=SENDER_EMAIL,
            Destination={
                "ToAddresses": [RECIPIENT_EMAIL]
            },
            ReplyToAddresses=[email],
            Message={
                "Subject": {
                    "Data": f"New Portfolio Contact: {name}"
                },
                "Body": {
                    "Text": {
                        "Data": (
                            f"New contact form submission\n\n"
                            f"Name: {name}\n"
                            f"Email: {email}\n\n"
                            f"Message:\n"
                            f"{message}\n\n"
                            f"Submitted At (UTC): {timestamp}\n"
                            f"Submission ID: {submission_id}"
                        )
                    }
                }
            }
        )

        # -----------------------------------------------------------
        # Success response
        # -----------------------------------------------------------

        return response(
            200,
            {"message": "Message sent successfully."}
        )

    except ClientError as error:
        # AWS service errors (SES, DynamoDB, etc.)
        print(f"AWS Client Error: {error}")

        return response(
            500,
            {
                "message": "AWS service error.",
                "error": str(error)
            }
        )

    except Exception as error:
        # Unexpected runtime errors
        print(f"Unhandled Error: {error}")

        return response(
            500,
            {
                "message": "Internal server error.",
                "error": str(error)
            }
        )


# -------------------------------------------------------------------
# Helper Function
# Creates consistent API responses with CORS headers.
# -------------------------------------------------------------------

def response(status_code, body):
    return {
        "statusCode": status_code,
        "headers": {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Content-Type": "application/json",
        },
        "body": json.dumps(body),
    }