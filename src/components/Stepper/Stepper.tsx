import { Stepper, Step } from 'react-form-stepper'
import { useState } from 'react'

export const PlaceOrder = () => {
  const [goSteps, setGoSteps] = useState(0)

  return (
    <div>
      <Stepper activeStep={goSteps}>
        <Step onClick={() => setGoSteps(0)} label="Generate Token">
          {goSteps > 0 ? <span>&#10003;</span> : '1'}
        </Step>
        <Step onClick={() => setGoSteps(1)} label="Verify Token">
          {goSteps > 1 ? <span>&#10003;</span> : '2'}
        </Step>
        <Step onClick={() => setGoSteps(2)} label="Done">
          {goSteps > 2 ? <span>&#10003;</span> : '3'}
        </Step>
      </Stepper>

      {goSteps === 0 && (
        <div>
          <p>Domain</p>
          <div className="input-stepper">
            <input className="input_tag" placeholder="Enter Domain Name" />
            <button className="btn" onClick={() => setGoSteps(1)}>
              Generate Token
            </button>
          </div>
        </div>
      )}

      {goSteps === 1 && (
        <div>
          <p>Domain</p>
          <div className="input-stepper">
            <input className="input_tag" placeholder="Enter Domain Name" />
            <button className="btn" onClick={() => setGoSteps(2)}>
              Verify Token
            </button>
          </div>
        </div>
      )}

      {goSteps === 2 && (
        <div>
          <p>Domain</p>
          <div className="input-stepper">
            <input className="input_tag" placeholder="Enter Domain Name" />
            <button className="btn" onClick={() => setGoSteps(3)}>
              Submit{' '}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
