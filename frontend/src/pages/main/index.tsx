import './index.css';
import { Menu, MenuProps  } from 'antd';
import { useEffect, useState } from 'react';
import { PieChartOutlined, DesktopOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { AgGridReact } from 'ag-grid-react';
import axios from 'axios';
import moment from 'moment';
import { IUser } from '../../model/user.model';

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
        getItem('User List', '1', <PieChartOutlined />),
        getItem('Profile', '2', <DesktopOutlined />),
    ];
    const [rowData, setRowData] = useState();

    const userCenterUrl = '/profile';

    useEffect(() => {
        axios.get('http://127.0.0.1:3007/api/user')
        .then(result => result.data.map((item: IUser, index: number) => ({...item, index: index + 1})))
        .then(data => setRowData(data))
    }, []);

    const [columnDefs, setColumnDefs] = useState([
        {headerName: '#',  field: 'index'},
        {field: 'firstname', filter: true},
        {field: 'lastname', filter: true},
        {field: 'gender'},
        {headerName: 'Date of Birth',  field: 'birthdate', valueFormatter: (data: any) => {
            return moment(data.value).format('MM/DD/YYYY');

        }}
      ]);

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
                        items={items}/>
                </Sider>
                <Layout>
                    <Header>
                        <div className="user-center">
                            <a href={userCenterUrl}>User Center</a>
                            <a>Album</a>
                        </div>
                    </Header>
                    <Content className="layout-content">
                    <div className="ag-theme-alpine" style={{height: 400, width: 800, maxWidth: 1200}}>
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={columnDefs}
                            animateRows={true}
                        >
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