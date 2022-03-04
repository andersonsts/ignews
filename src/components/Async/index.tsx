import { useEffect, useState } from "react"

export function Async() {
  const [isButtonVisible, setIsButtonVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsButtonVisible(true)
    }, 1000);

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <div>
      Hello World
      {!isButtonVisible && <button>Button</button>}
    </div>
  )
}