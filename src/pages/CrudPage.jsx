import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Spin, Modal, Form, Input } from 'antd';
import { EditFilled, DeleteFilled } from '@ant-design/icons';

const CrudPage = () => {
    const [employeesData, setEmployeesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
       getEmployees();
    }, []);

    const getEmployees = () => {
         setLoading(true);
        axios.get('http://localhost:3001/employees')
            .then(response => {
                setEmployeesData(response.data);
                console.log('Employees:', response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const addNewEmployee = (values) => {
        const payload = {
            id: (employeesData.length + 1).toString(), // Simple ID generation
            name: values.employeeName,
            position: values.position
        }

        axios.post('http://localhost:3001/employees', payload)
            .then(response => {
                setEmployeesData([...employeesData, response.data]);
                console.log('Employees:', response.data);
            })
            .catch(error => {
                console.error('Error fetching employees:', error);
            })
            .finally(() => {
                setLoading(false);
                setIsCreateModalVisible (false);
                getEmployees();
            });
    };

    const updateEmployee = (values) => {
        console.log('values', values);
        const payload = {
            id: values.employeeId,
            name: values.employeeName,
            position: values.position
        }

        axios.put(`http://localhost:3001/employees/${values.employeeId}`, payload)
            .then(response => {
                console.log('Updated Employee:', response.data);
            })
            .catch(error => {
                console.error('Error updating employee:', error);
            }).finally(() => {
                setIsModalVisible(false);
                getEmployees();
            })
    };

    const deleteEmployee = (employeeId) => {
        axios.delete(`http://localhost:3001/employees/${employeeId}`)
            .then(response => {
                console.log('Deleted Employee:', response.data);
            })
            .catch(error => {
                console.error('Error deleting employee:', error);
            }).finally(() => {
                getEmployees();
            })
    };



    if (loading) return <Spin size="large" style={{ display: 'block', margin: 'auto' }} />;

    return (
        <div className='container mx-auto p-4'>
            <h1>CRUD Page</h1>

            <div className="flex  items-center justify-center gap-3">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-bold mb-4">Employees</h1>
                    <p>List of employees fetched from the JSON server:</p>
                </div>
                <div>
                    <Button type="primary" onClick={() => {
                        setIsCreateModalVisible(true);
                        form.resetFields();
                    }}>
                        Add Employee
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center mt-4">
                <ul>
                    {employeesData?.length > 0 ? employeesData.map(employee => (
                        <li key={employee.id}>
                            <div>
                                <span>
                                    {employee.name} - {employee.position}
                                </span>
                                <span>
                                    <EditFilled style={{ color: 'blue', marginLeft: '10px', cursor: 'pointer' }} onClick={() => {
                                         setIsModalVisible(true); 
                                         form.setFieldsValue({ employeeName: employee.name, position: employee.position, employeeId: employee.id });
                                          }} />
                                    <DeleteFilled style={{ color: 'red', marginLeft: '10px', cursor: 'pointer' }} onClick={() => deleteEmployee(employee.id)} />
                                </span>
                            </div>
                        </li>
                    )) : <li>No employees found.</li>}
                </ul>
            </div>



            <Modal
                title="Update Employee"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isModalVisible}
                footer={null}
                onCancel={() => setIsModalVisible(false)}
            >


                <Form form={form} onFinish={(values) => updateEmployee(values)}>
                    <Form.Item label="Employee ID" name="employeeId" >
                        <Input disabled={true} />
                    </Form.Item>
                    <Form.Item label="Employee Name" name="employeeName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Position" name="position">
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Update Employee
                    </Button>
                </Form>
            </Modal>

            <Modal
                title="Create Employee"
                closable={{ 'aria-label': 'Custom Close Button' }}
                open={isCreateModalVisible}
                footer={null}
                onCancel={() => setIsCreateModalVisible(false)}
            >
                <Form form={form} onFinish={(values) => addNewEmployee(values)}>
                    <Form.Item label="Employee Name" name="employeeName">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Position" name="position">
                        <Input />
                    </Form.Item>

                    <Button type="primary" htmlType="submit">
                        Create Employee
                    </Button>
                </Form>
            </Modal>
        </div>
    );
};

export default CrudPage;