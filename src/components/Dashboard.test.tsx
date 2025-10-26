import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from './Dashboard'

describe('Dashboard', () => {
  it('renders the dashboard title', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByText('My Apps Dashboard')).toBeInTheDocument()
  })

  it('renders Checkov link', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    const checkovLink = screen.getByRole('link', { name: /checkov/i })
    expect(checkovLink).toBeInTheDocument()
    expect(checkovLink).toHaveAttribute('href', '/checkov')
  })

  it('renders Browser Size link', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    const browserSizeLink = screen.getByRole('link', { name: /browser size/i })
    expect(browserSizeLink).toBeInTheDocument()
    expect(browserSizeLink).toHaveAttribute('href', '/window-size')
  })

  it('displays descriptions for each app', () => {
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    )
    expect(screen.getByText(/creating and managing checklists/i)).toBeInTheDocument()
    expect(screen.getByText(/browser window dimensions/i)).toBeInTheDocument()
  })
})
