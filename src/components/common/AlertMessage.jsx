import { Alert } from 'react-bootstrap'
import { AsyncStatus } from '../../utils/constants'

function AlertMessage({status, variant, message}) {
  return (
    <>
      {status!==AsyncStatus.FAIL && <div style={{height:58}}></div>}
      {status===AsyncStatus.FAIL && <Alert variant={variant}>{message}</Alert>}
    </>
  )
}

export default AlertMessage