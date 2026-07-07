import { useState, useEffect } from 'react'

// ⚠️ THIS FILE CONTAINS INTENTIONAL SECURITY VULNERABILITIES FOR TESTING ONLY
// DO NOT USE ANY OF THESE PATTERNS IN PRODUCTION CODE

function TestErrors() {

  const [userInput, setUserInput] = useState('')
  const [userId, setUserId] = useState('')

  // -----------------------------------------------------------------------
  // VULNERABILITY 1: Cross-Site Scripting (XSS)
  // dangerouslySetInnerHTML with user-controlled input allows attackers to
  // inject malicious scripts into the page.
  // CWE-79 | HIGH severity
  // -----------------------------------------------------------------------
  const xssDemo = () => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: userInput }}
      />
    )
  }

  // -----------------------------------------------------------------------
  // VULNERABILITY 2: Hardcoded Secrets / Credentials
  // Secrets committed to source code are exposed to anyone with repo access.
  // CWE-798 | CRITICAL severity
  // -----------------------------------------------------------------------
  const API_KEY = 'sk-prod-abc123secretkey9876'         // eslint-disable-line no-unused-vars
  const DB_PASSWORD = 'SuperSecret@Password123'
  const AWS_SECRET = 'wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY' // eslint-disable-line no-unused-vars

  // -----------------------------------------------------------------------
  // VULNERABILITY 3: Insecure use of eval()
  // eval() executes arbitrary code — attacker can run any JavaScript.
  // CWE-95 | CRITICAL severity
  // -----------------------------------------------------------------------
  const runUserCode = (code) => {
    eval(code) // Never do this!
  }

  // -----------------------------------------------------------------------
  // VULNERABILITY 4: SQL Injection (simulated in frontend query builder)
  // Directly concatenating user input into a query string.
  // CWE-89 | HIGH severity
  // -----------------------------------------------------------------------
  const buildQuery = () => {
    const query = "SELECT * FROM users WHERE id = " + userId
    console.log("Executing query: ", query)
    return query
  }

  // -----------------------------------------------------------------------
  // VULNERABILITY 5: Insecure Direct Object Reference
  // Using user-supplied input directly to access sensitive resources.
  // CWE-639 | MEDIUM severity
  // -----------------------------------------------------------------------
  const fetchUserData = () => {
    fetch(`http://api.example.com/users/${userInput}/admin-data`)
      .then(res => res.json())
      .then(data => console.log(data))
  }

  // -----------------------------------------------------------------------
  // VULNERABILITY 6: Sensitive data in localStorage (no encryption)
  // Storing tokens/passwords in localStorage is accessible via XSS.
  // CWE-312 | MEDIUM severity
  // -----------------------------------------------------------------------
  const storeCredentials = () => {
    localStorage.setItem('auth_token', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    localStorage.setItem('user_password', DB_PASSWORD)
  }

  // -----------------------------------------------------------------------
  // VULNERABILITY 7: Prototype Pollution
  // Merging user-controlled objects without validation.
  // CWE-1321 | HIGH severity
  // -----------------------------------------------------------------------
  const mergeConfig = (userConfig) => { // eslint-disable-line no-unused-vars
    const config = {}
    for (let key in userConfig) {
      config[key] = userConfig[key] // Allows __proto__ pollution
    }
    return config
  }

  useEffect(() => {
    storeCredentials()
    buildQuery()
  }, [userId])

  return (
    <div>
      <h2>⚠️ Vulnerability Test Component</h2>
      <p>This component contains intentional security issues for scanning demo.</p>

      <input
        type="text"
        placeholder="Enter anything..."
        onChange={(e) => setUserInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter user ID..."
        onChange={(e) => setUserId(e.target.value)}
      />

      <button onClick={() => runUserCode(userInput)}>Run Code (eval)</button>
      <button onClick={fetchUserData}>Fetch User Data</button>

      {xssDemo()}
    </div>
  )
}

export default TestErrors
