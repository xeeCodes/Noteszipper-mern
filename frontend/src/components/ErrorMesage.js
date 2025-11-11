import React, { Children } from 'react'
import { Alert } from 'react-bootstrap'
function ErrorMesage({variant='info',children}) {
  return (
   <>
   <Alert variant={variant} style={{fontSize:"20px"}}>

    <strong>{children}</strong>
   </Alert>
   
   </>
  )
}

export default ErrorMesage
