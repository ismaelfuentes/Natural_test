// Libs
import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { useHistory, withRouter } from 'react-router-dom'

// Components
import { removePersistentData } from '../services/utils'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    title: {
      flexGrow: 1,
    },
  }),
)

const AppBarComponent = withRouter((props) => {
  const classes = useStyles()
  const history = useHistory()

  const { pathname } = props.location

  const handleClickLogOut = () => {
    removePersistentData()
    history.push('/')
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={classes.title}>
          Natural Test
        </Typography>
        {pathname === '/profile' && (
          <Button color="inherit" onClick={handleClickLogOut}>
            Log out
          </Button>
        )}
      </Toolbar>
    </AppBar>
  )
})

export default AppBarComponent
