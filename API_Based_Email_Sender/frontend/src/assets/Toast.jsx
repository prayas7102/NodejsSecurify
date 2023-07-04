import Toast from 'react-bootstrap/Toast';

function BasicExample({ messg }) {
  return (
    <Toast bg='danger'>
      <Toast.Body>{messg}</Toast.Body>
    </Toast>
  );
}

export default BasicExample;