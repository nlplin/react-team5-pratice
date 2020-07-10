import React, { Component } from "react";
import { Button, Table, pagination } from 'antd';
import { PlusOutlined, DeleteOutlined, FormOutlined } from '@ant-design/icons';
import { reqGetSubject } from '@api/edu/subject.js'
import { getSubjectList } from './redux'
import { connect } from 'react-redux'

import './index.css'
const columns = [
  { title: '分类名称', dataIndex: 'title', key: 'title' },
  {
    title: '操作',
    dataIndex: '',
    key: 'x',
    width: 200,
    render: () => <>
      <Button type="primary" className="primary-btn"><FormOutlined /></Button>
      <Button type="danger"><DeleteOutlined /></Button>
    </>,
  },
];
// const data = [
//   {
//     key: 1,
//     name: 'SPIDER-MAN',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.',
//   },
//   {
//     key: 2,
//     name: 'IRON-MAN',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.',
//   },
//   {
//     key: 3,
//     name: 'THOR',
//     age: 29,
//     address: 'Jiangsu No. 1 Lake Park',
//     description: 'This not expandable',
//   },
//   {
//     key: 4,
//     name: 'HULK',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.',
//   },
// ];
@connect(
  state => ({ subjectList: state.subjectList }),
  // 这里传入的是一个异步action.但是在展示组件中使用的函数,是通过connect进行封装之后的,虽然函数名一样,但是并不是同一个函数
  { getSubjectList }
)
class Subject extends Component {
  currentPage = 1
  state = {
    subject: {}
  }

  componentDidMount(page, pageSize) {
    this.props.getSubjectList(1, 10)
    // this.getPageSizeChange(1, 10)
  }
  // getPageSizeChange = async (page, pageSize) => {
  //   const result = await reqGetSubject(page, pageSize)
  //   this.setState({
  //     subject: result
  //   })
  // }
  handleOnchange = (page, pageSize) => {
    // console.log(page, pageSize)
    this.props.getSubjectList(page, pageSize)
    this.currentPage = page
  }
  handleShowPage = (current, size) => {
    console.log(current, size)
    this.props.getSubjectList(current, size)
    this.currentPage = current
  }
  // handleCurrent = () => {

  // }
  render() {
    console.log(this.props)
    return <div className='subject'>
      <Button type="primary" className="primary-button"><PlusOutlined />新建</Button>
      <Table
        columns={columns}
        expandable={{
          expandedRowRender: record => <p style={{ margin: 0 }}>{record.description}</p>,
          rowExpandable: record => record = true,
        }}
        dataSource={this.props.subjectList.items}
        // dataSource={this.state.subject.items}

        rowKey='_id'
        pagination={{
          total: this.props.subjectList.total,
          showQuickJumper: true,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '15'],
          // defaultPageSize: 5,
          onChange: this.handleOnchange,
          onShowSizeChange: this.handleShowPage,
          current: this.currentPage
        }}
      />,
    </div>
  }
}
export default Subject



