// Libs
import React from 'react'
import Paper from '@material-ui/core/Paper'
import Firebase from 'firebase'
import { useHistory } from 'react-router-dom'

// Components
import Stepper from './Stepper'
import { setPersistentData } from '../../services/utils'

// Form steps
import PhoneNumber from './forms/PhoneNumber'
import Captcha from './forms/Captcha'
import SecurityCode from './forms/SecurityCode'

enum STEPS {
  PHONE_NUMBER = 0,
  CAPTCHA = 1,
  SECURITY_CODE = 2,
}

interface IValidationData {
  step: number
  phoneNumber: string
  recaptchaVerifier?: Firebase.auth.RecaptchaVerifier
  confirmationResult?: Firebase.auth.ConfirmationResult
}

export default function IndexView() {
  const [validationData, setValidationData] = React.useState<IValidationData>({
    step: 0,
    phoneNumber: '',
  })

  const history = useHistory()

  async function sendSms(recaptchaVerifier: any) {
    try {
      const confirmationResult = await Firebase.auth().signInWithPhoneNumber(
        validationData.phoneNumber,
        recaptchaVerifier,
      )
      return confirmationResult
    } catch (e) {
      alert('Error: ' + e.message)
      setValidationData({
        ...validationData,
        step: 0,
      })
      throw e
    }
  }

  async function checkConfirmationCode(
    code: string,
    confirmationResult: Firebase.auth.ConfirmationResult,
    phoneNumber: string,
  ) {
    try {
      await confirmationResult.confirm(code)
      setPersistentData({ phoneNumber })
      history.push('/profile')
    } catch {
      alert('Bad verification code')
    }
  }

  const handleChangePhoneNumber = (phoneNumber: string) => {
    setValidationData({
      ...validationData,
      step: 1,
      phoneNumber,
    })
  }

  const handleCaptchaCompleted = async (recaptchaVerifier: any) => {
    try {
      const confirmationResult = await sendSms(recaptchaVerifier)

      setValidationData({
        ...validationData,
        step: 2,
        recaptchaVerifier,
        confirmationResult,
      })
    } catch {}
  }

  const handleVerifiedCode = (code: string) => {
    checkConfirmationCode(
      code,
      validationData.confirmationResult!,
      validationData.phoneNumber,
    )
  }

  // Ref for the captcha
  const { step } = validationData
  return (
    <Paper>
      <Stepper activeStep={step} />
      {step === STEPS.PHONE_NUMBER && (
        <PhoneNumber onSubmit={handleChangePhoneNumber} />
      )}
      {step === STEPS.CAPTCHA && (
        <Captcha onCaptchaConfirmed={handleCaptchaCompleted} />
      )}
      {step === STEPS.SECURITY_CODE && (
        <SecurityCode onSecurityCodeConfirmed={handleVerifiedCode} />
      )}
    </Paper>
  )
}
