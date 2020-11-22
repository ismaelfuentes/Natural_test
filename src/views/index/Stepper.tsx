// Libs
import React from 'react'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'

// Components
import Row from '../../components/Row'

// Props
interface Props {
  activeStep: number
}

export default function StepperComponent(props: Props) {
  const { activeStep = 0 } = props
  const steps = ['Phone Number', 'Captcha Validation', 'Security Code']

  return (
    <Row>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Row>
  )
}
