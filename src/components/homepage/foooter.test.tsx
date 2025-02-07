import { render, screen } from '@testing-library/react'
import { describe, expect } from 'vitest'
import Footer from './footer'
import { MemoryRouter } from 'react-router-dom'

describe('Footer', () => {
   it('should have a right link to the privacy policy page', () => {
      render(
         <MemoryRouter>
            <Footer />
         </MemoryRouter>
      )

      const privactPolicyLink = screen.getByTestId('@footer/privacy-policy')
      const href = privactPolicyLink.getAttribute('href')
      expect(href).toBe('/privacy-policy')
   })
})
