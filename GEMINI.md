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

## 2. Continuous Code Scanning on Modifications

**CRITICAL DIRECTIVE:** All significant code modifications must be validated using the Endor Labs `scan` tool before a task is considered complete.

To prevent the introduction of new vulnerabilities, secrets, or insecure patterns, a scan must be performed after implementing changes.

**Required Workflow:**
1.  **Modify:** Complete the requested code changes, bug fixes, or feature additions.
2.  **Scan:** Invoke the `scan` tool targeting the repository path. Ensure `scan_types` includes, at a minimum: `vulnerabilities`, `secrets`, and `sast`.
3.  **Remediate:** Review the returned findings. If the scan reveals new issues (e.g., exposed secrets, insecure coding patterns, or new vulnerable transitive dependencies) introduced by your recent changes, you must immediately correct the code to remediate the findings before concluding the execution phase.

## General Security Best Practices

*   **Zero Secrets:** Never hardcode secrets, API keys, passwords, or tokens in the source code or configuration files. Always utilize environment variables.
*   **Dependency Updates:** When instructed to update existing dependencies, enforce the same Endor Labs pre-installation checks as you would for new dependencies.
*   **Secure by Default:** When generating new components or server configurations, prioritize secure defaults (e.g., proper CORS configuration, input validation, and secure headers).