# Project Instructions and Security Defaults

This document outlines the foundational security mandates and workflows for this JavaScript web application. Gemini CLI must strictly adhere to these guidelines when proposing, modifying, or analyzing code within this repository.

## 1. Mandatory Pre-installation Dependency Checks

**CRITICAL DIRECTIVE:** Never execute `npm install <package>` to add a new dependency without first verifying its security posture using Endor Labs.

Before introducing any new npm package to the project, you must verify it for risks and known vulnerabilities.

**Required Workflow:**
1.  **Identify:** Determine the exact package name and version to be installed.
2.  **Risk Check:** Execute the `check_dependency_for_risks` tool (setting `ecosystem` to `npm`) to ensure the package does not contain malware, anomalous behavior, or unacceptable operational risks.
3.  **Vulnerability Check:** Execute the `check_dependency_for_vulnerabilities` tool (setting `ecosystem` to `npm`) to verify the package is free from known critical or high-severity CVEs.
4.  **Action:** Only proceed with the installation (`npm install`) if both checks pass without critical issues. If risks or vulnerabilities are found, you must halt the installation and propose a safe alternative package or a patched version to the user.

## 2. Conditional Security Scanning and Dependency Checks

**CRITICAL DIRECTIVE:** The appropriate Endor Labs tools must be executed based on the type of files modified before a task is considered complete.

To prevent the introduction of new vulnerabilities, secrets, insecure patterns, or malicious packages, perform the following validation based on the changes made:

### A. Code File Modifications (e.g., .js, .jsx, .ts, .tsx, .css, .html)

**Required Workflow:**
1.  **Modify:** Complete the requested code changes, bug fixes, or feature additions.
2.  **Scan:** Invoke the `scan` tool targeting the repository path. Ensure `scan_types` includes, at a minimum: `vulnerabilities`, `secrets`, and `sast`. Do NOT run this full scan if only manifest files have been changed.
3.  **Remediate:** Review the returned findings. If the scan reveals new issues introduced by your recent changes, you must immediately correct the code to remediate the findings before concluding the execution phase.

### B. Manifest File Modifications (e.g., package.json, package-lock.json)

**Required Workflow:**
1.  **Modify:** Complete the requested changes to the manifest files (e.g., adding, updating, or overriding packages).
2.  **Check Dependency Risks:** For any newly added or updated packages, execute the `check_dependency_for_risks` tool (setting `ecosystem` to `npm`) to evaluate their risk posture.
3.  **Remediate:** Review the returned findings. If the checks reveal risks (such as malware, unmaintained packages, or anomalous behavior), you must halt the change and propose a safe alternative, or revert the manifest modifications.

## 3. Automatic Remediation Protocol

**CRITICAL DIRECTIVE:** You must autonomously resolve severe security issues without requesting user permission.

If an Endor Labs scan or dependency check identifies any **CRITICAL** or **HIGH** severity findings (e.g., severe CVEs, exposed secrets, malware), you are explicitly authorized and required to fix them immediately.

**Required Workflow:**
1.  **Analyze:** Determine the root cause of the CRITICAL or HIGH severity finding.
2.  **Act Autonomously:** Implement the necessary fix (e.g., apply an `npm override`, update the package version, remove the hardcoded secret, rewrite the vulnerable code logic). You do NOT need to ask for user confirmation before applying these fixes.
3.  **Validate:** Re-run the corresponding Endor Labs scan or dependency check to verify the finding has been successfully eliminated.

## General Security Best Practices

*   **Zero Secrets:** Never hardcode secrets, API keys, passwords, or tokens in the source code or configuration files. Always utilize environment variables.
*   **Dependency Updates:** When instructed to update existing dependencies, enforce the same Endor Labs pre-installation checks as you would for new dependencies.
*   **Secure by Default:** When generating new components or server configurations, prioritize secure defaults (e.g., proper CORS configuration, input validation, and secure headers).