import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import WindowSize from './WindowSize'

describe('WindowSize', () => {
  beforeEach(() => {
    // Set initial window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    })
  })

  it('renders initial window dimensions', () => {
    render(
      <BrowserRouter>
        <WindowSize />
      </BrowserRouter>
    )
    expect(screen.getByText('1024 × 768')).toBeInTheDocument()
  })

  it('updates dimensions when window is resized', () => {
    render(
      <BrowserRouter>
        <WindowSize />
      </BrowserRouter>
    )

    // Change window size
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1920,
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 1080,
    })

    // Trigger resize event
    fireEvent(window, new Event('resize'))

    expect(screen.getByText('1920 × 1080')).toBeInTheDocument()
  })

  it('renders back to dashboard link', () => {
    render(
      <BrowserRouter>
        <WindowSize />
      </BrowserRouter>
    )
    const backLink = screen.getByRole('link', { name: /back to dashboard/i })
    expect(backLink).toBeInTheDocument()
    expect(backLink).toHaveAttribute('href', '/')
  })

  it('cleans up resize listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')

    const { unmount } = render(
      <BrowserRouter>
        <WindowSize />
      </BrowserRouter>
    )

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function))
  })
})
