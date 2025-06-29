import { Alert } from 'react-bootstrap'

function AlertMessage({visible, variant, message}) {
  return (
    <>
      {visible && <div style={{height:58}}></div>}
      {visible && <Alert variant={variant}>{message}</Alert>}
    </>
  )
}

export default AlertMessage