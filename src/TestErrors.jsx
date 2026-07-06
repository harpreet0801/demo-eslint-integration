import { useState, useEffect } from 'react'

// This file contains INTENTIONAL errors to demonstrate ESLint

function TestErrors() {
  // ERROR 1: Unused variable
  const unusedVariable = "This is never used"
  
  // ERROR 2: Variable declared but never used
  let anotherUnusedVar = 42
  
  // ERROR 3: React Hook dependency issue
  const [count, setCount] = useState(0)
  const [name, setName] = useState("Test")
  
  useEffect(() => {
    // Missing 'name' in dependency array - ESLint will warn
    console.log(`Count is ${count} and name is ${name}`)
  }, [count]) // Should include 'name' here
  
  // ERROR 4: Conditional hook usage (hooks must be at top level)
  if (count > 5) {
    const [error, setError] = useState(false) // This is wrong!
  }
  
  // ERROR 5: Undefined variable usage
  console.log(undefinedVar)
  
  // ERROR 6: Comparison with == instead of ===
  if (count == "5") {
    console.log("Bad comparison")
  }
  
  return (
    <div>
      <h1>Test Component with Errors</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  )
}

export default TestErrors

// Made with Bob
