import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Checkov from './Checkov'

describe('Checkov', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders the Checkov title', () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )
    expect(screen.getByText('Checkov')).toBeInTheDocument()
  })

  it('renders default 5 checkboxes', () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(5)
  })

  it('allows changing the number of checkboxes', () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )

    const input = screen.getByLabelText(/number of checkboxes/i)
    fireEvent.change(input, { target: { value: '10' } })

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(10)
  })

  it('saves checkbox state to localStorage when checked', async () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])

    await waitFor(() => {
      const saved = localStorage.getItem('checkboxState')
      expect(saved).toBeTruthy()
      const state = JSON.parse(saved!)
      expect(state['checkbox-1']).toBe(true)
    })
  })

  it('loads checkbox state from localStorage', () => {
    // Pre-populate localStorage
    const initialState = { 'checkbox-1': true, 'checkbox-3': true }
    localStorage.setItem('checkboxState', JSON.stringify(initialState))

    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).not.toBeChecked()
    expect(checkboxes[2]).toBeChecked()
  })

  it('resets all checkboxes when reset button is clicked', async () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )

    const checkboxes = screen.getAllByRole('checkbox')
    fireEvent.click(checkboxes[0])
    fireEvent.click(checkboxes[1])

    await waitFor(() => {
      expect(checkboxes[0]).toBeChecked()
      expect(checkboxes[1]).toBeChecked()
    })

    const resetButton = screen.getByRole('button', { name: /reset all/i })
    fireEvent.click(resetButton)

    await waitFor(() => {
      expect(checkboxes[0]).not.toBeChecked()
      expect(checkboxes[1]).not.toBeChecked()
      expect(localStorage.getItem('checkboxState')).toBeNull()
    })
  })

  it('shows reset confirmation message', async () => {
    vi.useFakeTimers()

    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )

    const resetButton = screen.getByRole('button', { name: /reset all/i })
    fireEvent.click(resetButton)

    expect(screen.getByText('Reset Complete!')).toBeInTheDocument()

    // Advance timers and wait for the state update
    vi.advanceTimersByTime(1001)

    await vi.runAllTimersAsync()

    expect(screen.getByText('Reset All')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('limits number of checkboxes to max 50', () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )

    const input = screen.getByLabelText(/number of checkboxes/i)
    fireEvent.change(input, { target: { value: '100' } })

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(50)
  })

  it('limits number of checkboxes to min 1', () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )

    const input = screen.getByLabelText(/number of checkboxes/i) as HTMLInputElement
    fireEvent.change(input, { target: { value: '0' } })

    // The component defaults to 5 when value is 0 (parsed as falsy)
    // So we need to check that it doesn't go below 1 with an explicit -1 or empty
    fireEvent.change(input, { target: { value: '-5' } })

    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(1)
  })

  it('renders back to dashboard link', () => {
    render(
      <BrowserRouter>
        <Checkov />
      </BrowserRouter>
    )
    const backLink = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })
})
