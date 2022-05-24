import './index.css';
import { Menu, MenuProps  } from 'antd';
import { useState } from 'react';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { AgGridReact } from 'ag-grid-react';

const { Header, Footer, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


const Main = () => {
    const items: MenuItem[] = [
        getItem('人员', '1', <PieChartOutlined />),
        getItem('团队', '2', <DesktopOutlined />),
    ];
    const [collapsed] = useState(false);

    const userCenterUrl = '/profile';

    const [rowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxster", price: 72000}
    ]);
    
    const [columnDefs] = useState([
        { field: 'FirstName' },
        { field: 'LastName' },
        { field: 'Gender' },
        { field: 'Birth Date' }
    ])

    return (
        <div className="layout-container">
            <Layout>
                <Sider>
                    <div className="logo">原创人力</div>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={items}/>
                </Sider>
                <Layout>
                    <Header>
                        <div className="user-center">
                        <a href={userCenterUrl}>User Center</a>
                        </div>
                    </Header>
                    <Content className="layout-content">
                    <div className="ag-theme-alpine" style={{height: 400, width: 803}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}>
                        </AgGridReact>
                    </div>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        </div>
    )
}


export default Main;