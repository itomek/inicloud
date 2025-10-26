import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

interface CheckboxState {
  [key: string]: boolean
}

export default function Checkov() {
  const [numBoxes, setNumBoxes] = useState<number>(5)
  const [checkboxState, setCheckboxState] = useState<CheckboxState>({})
  const [resetMessage, setResetMessage] = useState<boolean>(false)

  // Load checkbox state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('checkboxState')
    if (saved) {
      try {
        setCheckboxState(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to parse saved checkbox state:', e)
      }
    }
  }, [])

  // Save checkbox state to localStorage whenever it changes
  useEffect(() => {
    if (Object.keys(checkboxState).length > 0) {
      localStorage.setItem('checkboxState', JSON.stringify(checkboxState))
    } else {
      localStorage.removeItem('checkboxState')
    }
  }, [checkboxState])

  const handleCheckboxChange = (id: string, checked: boolean) => {
    setCheckboxState(prev => ({
      ...prev,
      [id]: checked
    }))
  }

  const handleReset = () => {
    setCheckboxState({})
    localStorage.removeItem('checkboxState')
    setResetMessage(true)
    setTimeout(() => setResetMessage(false), 1000)
  }

  const handleNumBoxesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 5
    setNumBoxes(Math.min(Math.max(value, 1), 50))
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white transition-colors p-5">
      <Link
        to="/"
        className="inline-block mb-4 text-blue-600 dark:text-blue-400 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <div className="container mx-auto max-w-screen-lg flex flex-col items-center justify-center min-h-[80vh]">
        <h1 className="text-center mb-10 text-3xl md:text-4xl font-semibold">
          Checkov
        </h1>

        <div className="input-section mb-10 text-center">
          <label htmlFor="numBoxes" className="block mb-4 font-medium text-lg">
            Number of checkboxes:
          </label>
          <input
            type="number"
            id="numBoxes"
            min="1"
            max="50"
            value={numBoxes}
            onChange={handleNumBoxesChange}
            className="p-4 text-lg border-2 border-gray-300 dark:border-gray-600 rounded-lg w-30 text-center bg-white dark:bg-gray-900 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400"
          />
        </div>

        <div className="checkbox-container mb-10 grid grid-cols-5 gap-5 md:gap-8 w-full px-5 md:px-10 justify-items-center">
          {Array.from({ length: numBoxes }, (_, i) => i + 1).map((i) => {
            const checkboxId = `checkbox-${i}`
            return (
              <div
                key={checkboxId}
                className="checkbox-item flex items-center justify-center p-4 md:p-5 w-full border-none bg-transparent transition-colors rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 active:scale-95"
              >
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={checkboxState[checkboxId] || false}
                  onChange={(e) => handleCheckboxChange(checkboxId, e.target.checked)}
                  className="w-10 h-10 md:w-12 md:h-12 cursor-pointer accent-blue-600 dark:accent-blue-500"
                />
              </div>
            )
          })}
        </div>

        <button
          onClick={handleReset}
          className={`reset-btn w-full max-w-sm md:max-w-md px-6 py-4 md:py-5 text-white border-none rounded-xl text-lg font-semibold cursor-pointer transition-all mt-5 ${
            resetMessage
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-red-600 hover:bg-red-700'
          } hover:-translate-y-0.5 active:translate-y-0`}
        >
          {resetMessage ? 'Reset Complete!' : 'Reset All'}
        </button>
      </div>
    </div>
  )
}
