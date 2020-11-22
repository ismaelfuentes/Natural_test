// Libs
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// Components
import Row from '../../../components/Row'

interface Props {
  onSecurityCodeConfirmed: (code: string) => void
}

export default function ProfileView(props: Props) {
  const [code, setCode] = React.useState<string>('')

  const onCodeChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCode((event as React.FormEvent<HTMLInputElement>).currentTarget.value)
  }

  const handleSubmit = () => {
    if (code) {
      props.onSecurityCodeConfirmed(code)
    } else {
      alert('The security code is not correct')
    }
  }

  return (
    <>
      <Row>
        <TextField
          id="standard-basic"
          label="Verification code"
          type="text"
          value={code}
          onChange={onCodeChange}
          fullWidth
        />
      </Row>
      <Row>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Send
        </Button>
      </Row>
    </>
  )
}
