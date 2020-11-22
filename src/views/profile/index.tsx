// Libs
import React from 'react'
import { useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import Axios from 'axios'

// Components
import Row from '../../components/Row'

// Components
import { getPersistentData } from '../../services/utils'

interface State {
  loading: boolean
  phoneNumber: string
  name: string
  email: string
  userExists: boolean
}

const defaultState = {
  loading: true,
  phoneNumber: '',
  name: '',
  email: '',
  userExists: false,
}

export default function ProfileView() {
  const history = useHistory()
  const [profile, setProfile] = React.useState<State>(defaultState)

  React.useEffect(() => {
    // Func to retrieve the user data from our api
    const getUserDate = async (phoneNumber: string) => {
      // Lets use https just for simplicity
      const response = await Axios.get(
        `https://kqrn19rq6i.execute-api.eu-west-2.amazonaws.com/default/user?phoneNumber=${phoneNumber.replaceAll(
          '+',
          '%2B',
        )}`,
      )
      const data = response.data
      const userExists = !!data.phoneNumber
      const state = {
        ...defaultState,
        ...data,
        phoneNumber,
        loading: false,
        userExists,
      }
      setProfile(state)
    }

    // Read the browser saved phone number
    const phoneNumber = getPersistentData().phoneNumber
    if (!phoneNumber) {
      alert('No logged User')
      history.push('/')
      return
    }

    getUserDate(phoneNumber)
  }, [history])

  // Save input value in state
  const handleInputChange = (key: string, value: string) => {
    setProfile({
      ...profile,
      [key]: value,
    })
  }

  // Check the fields before sending them
  const checkValidFields = () => {
    // Simple for this test project
    return (
      profile.name &&
      profile.email &&
      profile.name.length > 0 &&
      /^\S+@\S+$/.test(profile.email)
    )
  }

  // Send the form data to the api
  const handleSaveProfile = async () => {
    if (!checkValidFields()) {
      alert('Fill the fields with valid values')
      return
    }

    const dataToSend = {
      phoneNumber: profile.phoneNumber,
      name: profile.name,
      email: profile.email,
    }

    // NOTE: Since AWS is rejecting PUT because of CORS even when it has the same privileges than POST... so since it's just a test i will skip it and use always POST
    //const request = profile.userExists ? Axios.put : Axios.post
    await Axios.post(
      'https://kqrn19rq6i.execute-api.eu-west-2.amazonaws.com/default/user',
      dataToSend,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    setProfile({
      ...profile,
      userExists: true,
    })

    alert('User saved')
  }

  return (
    <Paper>
      {profile.loading ? (
        <Row>
          <span>Loading...</span>
        </Row>
      ) : (
        <>
          <Row>
            <TextField
              label="Phone Number"
              type="text"
              value={profile.phoneNumber}
              disabled
              fullWidth
            />
          </Row>
          <Row>
            <TextField
              label="Name"
              type="text"
              value={profile.name}
              onChange={(event) => {
                handleInputChange('name', event.currentTarget.value)
              }}
              fullWidth
            />
          </Row>
          <Row>
            <TextField
              label="Email"
              type="text"
              value={profile.email}
              onChange={(event) => {
                handleInputChange('email', event.currentTarget.value)
              }}
              fullWidth
            />
          </Row>
          <Row>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveProfile}
            >
              {profile.userExists ? 'Save changes' : 'Create user'}
            </Button>
          </Row>
        </>
      )}
    </Paper>
  )
}
