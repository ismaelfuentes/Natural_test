// Libs
import React from 'react'
import Firebase from 'firebase'

// Components
import Row from '../../../components/Row'

interface Props {
  onCaptchaConfirmed: (
    recaptchaVerifier: Firebase.auth.RecaptchaVerifier,
  ) => void
}

export default function ProfileView(props: Props) {
  const { onCaptchaConfirmed } = props
  React.useEffect(() => {
    const recaptchaVerifier = new Firebase.auth.RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'normal',
        callback: () => {
          onCaptchaConfirmed(recaptchaVerifier)
        },
        'expired-callback': function () {
          alert('Captcha expired')
          window.location.reload()
        },
      },
    )

    recaptchaVerifier.render()
  }, [onCaptchaConfirmed])

  const captchaRef = React.useRef(null)
  return (
    <>
      <Row>
        <div id="recaptcha-container" ref={captchaRef} />
      </Row>
    </>
  )
}
