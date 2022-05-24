import { Button, Form, Input, message } from 'antd';
import './index.css';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const navigate = useNavigate();
    const onFinish = async(values: {username: string; password: string}) => {
        const { data } = await axios.post('http://127.0.0.1:3007/api/user/register', values);
        if (data.status === 1) {
            message.error(data.message);
            return;
        }

        if (data.status === 0) {
            message.success(data.message);
        }

        localStorage.setItem('token', data.token);
        navigate('/login');

      };


      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div className="login-container">
            <Form validateTrigger={['onBlur', 'onChange']}
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                className="login-form"
            >
            <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please enter userName!', validateTrigger: 'onBlur' }]}
                className="login-item"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter password!' }]}
                className="login-item"
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Login In
                </Button>
            </Form.Item>
        </Form>
        </div>
    )

}

export default Register;