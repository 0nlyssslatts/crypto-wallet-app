import { Layout } from "antd"

const contentStyle = {
    textAlign: 'center',
    color: '#fff',
    minHeight: 'calc(100vh - 60px)',
    backgroundColor: '#001529',
    padding: '1rem',
}

export default function AppContent(){
    return(
        <Layout.Content style={contentStyle}>Content</Layout.Content>
    )
}