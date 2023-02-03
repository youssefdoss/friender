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
      <Alert className="mb-3" variant={alerts.type}>
        <ul>
          {alerts.messages.map((message) => (
            <li key={message}>{message}</li>
          ))}
        </ul>
      </Alert>
    </>
  );
}

export default AlertContainer;
