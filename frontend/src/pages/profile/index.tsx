import { Button, Form, Input, message, Select, DatePicker } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './index.css';
const { Option } = Select;

const Profile = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    const onFinish = async(values: any) => {

        const userId: string = JSON.stringify(JSON.parse(localStorage.getItem('userId')!));
        const { data } = await axios.put(`http://127.0.0.1:3007/api/user/update/${userId}`, values);
        if (data.status === 1) {
            message.error(data.message);
            return;
        }

        if (data.status === 0) {
            message.success(data.message);
        }

        localStorage.setItem('token', data.token);
        navigate('/');

      };

      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };

      const onReset = () => {
        form.resetFields();
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
                className="login-form profile-form"
            >
            <Form.Item
                label="FirstName"
                name="firstname"
                rules={[{ required: true, message: 'Please enter firstName!', validateTrigger: 'onBlur' }]}
                className="login-item"
            >
                <Input placeholder="Please enter firstName"/>
            </Form.Item>

            <Form.Item
                label="LastName"
                name="lastname"
                rules={[{ required: true, message: 'Please enter lastName!' }]}
                className="login-item"
            >
                <Input placeholder="Please enter lastName"/>
            </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]} className="login-item">
                <Select placeholder="Please Select a the gender" allowClear>
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
                </Select>
            </Form.Item>

            <Form.Item name="birthdate" label="Birthdate" rules={[{ required: true, message: "yyyy/MM/DD" }]} className="login-item">
                <DatePicker format="YYYY-MM-DD"/>
            </Form.Item>

            <Form.Item className="profile-btn-container">
                <Button type="primary" htmlType="submit" className="profile-btn">
                Submit
                </Button>
                <Button htmlType="button" onClick={onReset} className="profile-reset-btn">
                Reset
                </Button>
            </Form.Item>
        </Form>
        </div>
    )
}

export default Profile;