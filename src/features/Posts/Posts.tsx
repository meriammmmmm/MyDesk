import React, { useState, useEffect } from 'react'
import { updateCurrentUser } from '../../services/apiAuth'
import Button from '@material-ui/core/Button'
import Stepper from '@material-ui/core/Stepper'
import Step from '@material-ui/core/Step'
import StepLabel from '@material-ui/core/StepLabel'
import StepConnector from '@material-ui/core/StepConnector'
import Typography from '@material-ui/core/Typography'

import { message } from 'antd'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import Organization from '@src/components/Organization/Organization'
import Password from '@src/components/Password/Password'
import Establishment from '@src/components/Establishment/Establishment'
import QontoStepIcon from './QontoStepIcon'
import { useSelector } from 'react-redux'

import { PlaceOrder } from '@src/components/Stepper/Stepper'

const QontoConnector = withStyles({
  alternativeLabel: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  active: {
    '& $line': {
      borderColor: '#FC4C02',
    },
  },
  line: {
    borderColor: 'transparent',
    borderTopWidth: 3,
    borderRadius: 1,
    width: 0,
  },
})(StepConnector)

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  stepperRoot: {
    padding: '10px 28px',
    borderRadius: '10px',
    background: '#E5F4FD',
    width: '652px',
  },
  stepLabel: {
    fontSize: '15px',
    lineHeight: '36.8px',
    textAlign: 'center',
    color: '#57a6bd',
    '&.MuiStepLabel-active': {
      backgroundColor: '#FFFFFF',
      borderRadius: '4px',
      padding: '4px',
    },
  },
}))

function getSteps() {
  return ['My profile', 'Organisation', 'Contact details']
}

const steps = getSteps()

const FormBoat = () => {
  const user = useSelector((state: any) => state.auth.user)
  const classes = useStyles()
  const [activeStep, setActiveStep] = useState(0)
  const [establishmentData, setEstablishmentData] = useState({
    fullName: '',
    username: '',
    email: user?.user?.email,
  })
  const [locationData, setLocationData] = useState({
    id: user?.user?.id,
    organization: '',
    organizationName: '',
    address: '',
  })
  const [contactData, setContactData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    email: user?.user?.email,
  })
  const [advertData, setAdvertData] = useState({
    Advertising: '',
  })
  const [serviceData, setServiceData] = useState({
    cleaning: false,
    Painting: false,
    rigging: false,
    SailMakers: false,
    Electrics: false,
    Plumbing: false,
    mechanics: false,
    deliveries: false,
    catering: false,
    music: false,
    CarRentals: false,
    handleCarRentalsChange: false,
    otherServices: '',
  })

  useEffect(() => {
    fetchCurrentUser()
  }, [])

  const fetchCurrentUser = async () => {
    try {
    } catch (error: any) {
      console.error('Error fetching current user:', error.message)
    }
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const isStepDataValid = () => {
    switch (activeStep) {
      case 0:
        return establishmentData.fullName !== '' && establishmentData.username !== ''
      case 1:
        return (
          locationData.organization !== '' &&
          locationData.organizationName !== '' &&
          locationData.address !== ''
        )
      case 2:
        return (
          contactData.currentPassword !== '' &&
          contactData.newPassword !== '' &&
          contactData.confirmPassword !== ''
        )
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    try {
      const combinedData = {
        ...establishmentData,
        ...locationData,
        ...contactData,
        ...serviceData,
        ...advertData,
      }
      await updateCurrentUser(combinedData)
      message.success('Profile updated successfully')
    } catch (error: any) {
      console.error('Error updating profile:', error.message)
      message.error('Failed to update profile')
    }
  }

  const handleConfirm = () => {
    if (isStepDataValid()) {
      if (activeStep === steps.length - 2) {
        handleSubmit()
        handleNext()
      } else {
        handleNext()
      }
    } else {
      message.warning('Please fill out all required fields before confirming.')
    }
  }

  const getStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <Establishment formData={establishmentData} setFormData={setEstablishmentData} />
      case 1:
        return <Organization formData={locationData} setFormData={setLocationData} />
      case 2:
        return <Password formData={contactData} setFormData={setContactData} />
      default:
        return <Establishment formData={establishmentData} setFormData={setEstablishmentData} />
    }
  }

  return (
    <section className="register-boat-services">
      <div className="register-boat-services-right"></div>
      <div className="form-boat">
        <section className="form-boat-section">
          <section className={classes.root}>
            <Stepper
              classes={{ root: classes.stepperRoot }}
              activeStep={activeStep}
              connector={<QontoConnector />}
            >
              {steps.map((label, index) => (
                <Step key={index}>
                  <StepLabel
                    StepIconComponent={(props) => (
                      <QontoStepIcon
                        {...props}
                        icon={index === 0 ? 'profile' : index === 1 ? 'organization' : 'security'}
                      />
                    )}
                    classes={{ label: classes.stepLabel }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <div>
              {activeStep === getSteps().length ? (
                <div>
                  <button>Submit All</button>
                </div>
              ) : (
                <div>{getStepContent(activeStep)}</div>
              )}
              <div>
                {activeStep === steps.length ? (
                  <div>
                    <Typography className={classes.instructions}>
                      All steps completed - you're finished
                    </Typography>
                    <Button onClick={handleReset} className={classes.button}>
                      Reset
                    </Button>
                  </div>
                ) : (
                  activeStep !== 2 && (
                    <>
                      <Button
                        onClick={handleConfirm}
                        className="edit-profile-button"
                        variant="outlined"
                      >
                        Confirm
                      </Button>
                    </>
                  )
                )}
              </div>
            </div>
          </section>
        </section>
        {activeStep === 1 && (
          <div className="organization-stepper">
            <PlaceOrder />
          </div>
        )}
      </div>
    </section>
  )
}

export default FormBoat
