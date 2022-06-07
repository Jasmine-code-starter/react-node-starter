import { Result } from "antd";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={<Link to="/login">Back Login</Link>}
      />
    </div>
  );
};

export default NotFound;
