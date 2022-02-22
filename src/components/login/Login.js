import { Form, Input, Button } from "antd";
import bg from "../../asset/bg2.png";
const styles = {
    loginContainer:{
        width:"100vw",
        height:"100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        backgroundImage:`url(${bg})`,
        backgroundSize:"container",
        backgroundRepeat:"no-repeat",
        backgroundPosition:"center",
        backgroundColor:"rgba(250,250,210,.5)"
    },
    formStyle:{
        backgroundColor: "rgba(250,250,210,.5)",
        width:"40%",
        border:"1px solid #f5f7f9",
        borderRadius:"10px",
        paddingTop:"24px"
    }
};
export function Login(props) {

    const onFinish = (values) => {
        console.log("Success:", values);
        // props.history.push('/menu')
        localStorage.setItem("token",values.username);
        window.location.reload();
    };
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return  <div style={styles.loginContainer}>
                <div style={styles.formStyle}>
                    <Form
                        // name="basic"
                        // size="middle"
                        autoComplete="off"
                        labelCol={{
                            span: 6,
                        }}
                        name="normal_login"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        style={{width:"80%",margin:"0 auto"}}
                        wrapperCol={{
                            span: 18,
                        }}
                    >
                        <Form.Item
                            label="用户名"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入用户名",
                                },
                            ]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="密码"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "请输入密码",
                                },
                            ]}
                        >
                            <Input.Password/>
                        </Form.Item>

                        <Form.Item
                            style={{textAlign:"end"}}
                            wrapperCol={{
                                offset: 8,
                                span: 16,
                            }}
                        >
                            <Button htmlType="submit"
                                type="primary"
                            >
                                登录
                            </Button>
                        </Form.Item>
                    </Form>

                </div>
            </div>;
}
