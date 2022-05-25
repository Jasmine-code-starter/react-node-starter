import { Button, Form, Input, message } from 'antd';
import './index.css';
import axios  from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const onFinish = async(values: {username: string; password: string}) => {
        const { data } = await axios.post('http://127.0.0.1:3007/api/user/login', values);
        if (data.status === 1) {
            message.error(data.message);
            return;
        }

        if (data.status === 0) {
            message.success(data.message);
        }

        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.id);
        navigate('/');

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
                label="UserName"
                name="username"
                rules={[{ required: true, message: '请输入用户名!', validateTrigger: 'onBlur' }]}
                className="login-item"
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
                className="login-item"
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                Login
                </Button>
            </Form.Item>
        </Form>
        </div>
    )

}

export default Login;