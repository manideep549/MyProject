# Salesforce DevOps CI/CD Pipeline using GitHub Actions

This project demonstrates a **Salesforce DevOps CI/CD pipeline implementation using GitHub Actions**.  
The pipeline automates **code quality checks, test execution, validation, approval gates, and deployment** to ensure reliable Salesforce releases.

---

## 🚀 Project Overview

This CI/CD pipeline enforces best practices for Salesforce development by integrating:

- Static Code Analysis using **PMD**
- Automated **Apex Test Execution**
- **Code Coverage Validation (minimum 75%)**
- **Salesforce Metadata Validation**
- **Approval gates for sensitive metadata changes**
- **Automated Deployment to Production**

The goal of this project is to simulate a **real-world Salesforce DevOps workflow used in enterprise environments**.

---

## 🛠 Technologies Used

- **Salesforce CLI (sf CLI)**
- **GitHub Actions**
- **PMD Static Code Analyzer**
- **Apex Test Framework**
- **Git Version Control**
- **GitHub Environments for Approval Gates**

---

## 📂 Project Structure
├── force-app/
│ └── main/default/
│
├── .github/
│ └── workflows/
│ ├── salesforce-quality.yml
│ └── salesforce-deploy.yml
│
├── Testclass
├── sfdx-project.json
└── README.md


---

## ⚙️ CI/CD Pipeline Workflow

The pipeline follows the below automated workflow:
Developer Push Code
│
▼
PMD Static Code Analysis
│
▼
Run Apex Tests
(Code Coverage ≥ 75%)
│
▼
Salesforce Metadata Validation
│
▼
Profile / PermissionSet Change Detection
│
▼
Manual Approval (if required)
│
▼
Production Deployment


---

## 🔍 Pipeline Stages

### 1. Code Push
Developers push code to the repository branches:

- `dev`
- `uat`
- `main`

---

### 2. Static Code Analysis
PMD runs automated checks for:

- Apex best practices
- Code design issues
- Security violations

If violations are found, the pipeline fails.

---

### 3. Apex Test Execution
The pipeline dynamically reads test classes from the **`Testclass` file** and executes them using Salesforce CLI.

Example:
ManideepServiceTest


---

### 4. Code Coverage Validation

The pipeline verifies that **minimum 75% Apex code coverage** is achieved.

If coverage < 75%, deployment is blocked.

---

### 5. Metadata Validation

Salesforce CLI performs a **validation deployment** to ensure metadata can deploy successfully.

---

### 6. Sensitive Metadata Detection

The pipeline checks if changes were made to:
force-app/main/default/profiles
force-app/main/default/permissionsets


If detected, **manual approval is required before deployment**.

---

### 7. Production Deployment

After all checks pass and approvals are completed, the pipeline deploys metadata to Salesforce:

---

## 🔐 Security

Authentication to Salesforce is handled securely using:

Stored in **GitHub Secrets**.

---

## 📊 Key Features

- Automated CI/CD pipeline
- Code quality enforcement using PMD
- Mandatory Apex test execution
- Minimum code coverage enforcement
- Approval gate for sensitive metadata changes
- Secure Salesforce authentication
- Automated production deployment

---

## 📷 Architecture Diagram

The following diagram represents the CI/CD pipeline architecture:

*(Add your architecture diagram image here)*

---

## 🎯 Benefits of this Pipeline

- Improves **code quality**
- Prevents **unsafe deployments**
- Enforces **Salesforce development standards**
- Enables **controlled and secure production releases**
- Simulates **enterprise-level Salesforce DevOps practices**

---

## 👨‍💻 Author

**Manideep Godavarthi**

Salesforce Developer | DevOps Enthusiast

---

## ⭐ Future Improvements

Possible enhancements for this pipeline:

- Delta deployments (deploy only changed metadata)
- Parallel Apex test execution
- PR validation pipeline
- Automated rollback strategy
- Integration with Salesforce DevOps Center

---
