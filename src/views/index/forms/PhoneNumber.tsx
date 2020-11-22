// Libs
import React from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

// Components
import Row from '../../../components/Row'

interface Props {
  onSubmit: (phoneNumber: string) => void
}

export default function ProfileView(props: Props) {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')

  const onNumberChange = (
    event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPhoneNumber(
      (event as React.FormEvent<HTMLInputElement>).currentTarget.value,
    )
  }

  const handleSubmit = () => {
    if (phoneNumber) {
      // TODO : Check valid phone number
      props.onSubmit(phoneNumber)
    } else {
      alert('Add a valid phone number')
    }
  }

  return (
    <>
      <Row>
        <TextField
          id="standard-basic"
          label="Phone number"
          type="text"
          value={phoneNumber}
          onChange={onNumberChange}
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
