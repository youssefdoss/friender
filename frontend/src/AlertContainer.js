import Alert from "react-bootstrap/Alert";

/** Alert: Renders alert page for auth
 *
 * Props:
 * - alerts: Array of alert objects to display
 *
 * { Login, Signup, UserProfileEditForm } -> Alert
 */

function AlertContainer({ alerts }) {
  return (
    <>
    {console.log('in alerts', alerts)}
    {alerts.messages.length === 1 ? (
      alerts.messages.map((message) => (
        <Alert className="my-3" key={message} variant={alerts.type}>
          {message}
        </Alert>
      ))
    ) : (
      alerts.messages.map((message, i) => (
        <Alert className="my-3" key={i} variant={alerts.type}>
          {`${Object.keys(message)}: ${message[Object.keys(message)]}`}
        </Alert>
      ))
    )}
    </>
  );
}

export default AlertContainer;
