import { Button, Form, Input, message, Select, DatePicker } from 'antd';
import './index.css';
const { Option } = Select;

const Profile = () => {
    const [form] = Form.useForm();

    const onFinish = async(values: any) => {
        console.log(values, 'values');

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
                name="lassword"
                rules={[{ required: true, message: 'Please enter lastName!' }]}
                className="login-item"
            >
                <Input placeholder="Please enter lastName"/>
            </Form.Item>

            <Form.Item name="gender" label="Gender" rules={[{ required: true }]} className="login-item">
                <Select placeholder="Please Select a the gender" allowClear>
                <Option value="0">male</Option>
                <Option value="1">female</Option>
                <Option value="2">other</Option>
                </Select>
            </Form.Item>

            <Form.Item name="birthDate" label="Birthdate" rules={[{ required: true, message: "yyyy-MM-DD" }]} className="login-item">
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