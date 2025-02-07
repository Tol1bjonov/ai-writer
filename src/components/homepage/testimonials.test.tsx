import { describe } from 'vitest'
import Testimonials from './testimonials'
import { render, screen } from '@testing-library/react'

describe('Testimonials', () => {
   it('should render the testimonials photo', () => {
      render(<Testimonials />)

      screen.debug()
      const photo = screen.getByTestId('@testimonials/photo')
      expect(photo).toBeInTheDocument()
   })
})
