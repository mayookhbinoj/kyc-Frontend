import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAppDispatch } from '../../store/Configure';
import { useNavigate } from 'react-router-dom';
import { reset } from '../../reducers/slice/authSlice';
import { useSelector } from 'react-redux';
import { userState } from '../../Interfaces/slice';
import Button from '../Button/Button';
import { getUsers, kycReject, kycsucess } from '../../actions/adminAction';
import adminService from '../../service.ts/AdminService';

const AdminHomeForm: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { users } = useSelector((state: { user: userState }) => state.user);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string>('');

    const handleStatusChange = (id: string, newStatus: string) => {
        Swal.fire({
            title: `Are you sure you want to ${newStatus.toLowerCase()} this request?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: newStatus === 'Approved' ? '#28a745' : '#dc3545',
            cancelButtonColor: '#6c757d',
            confirmButtonText: `Yes, ${newStatus}`,
        }).then((result) => {
            if (result.isConfirmed) {
                if (newStatus === 'Approved') {
                    dispatch(kycsucess(id));
                    Swal.fire('Approved!', 'The KYC request has been approved.', 'success');
                } else if (newStatus === 'Rejected') {
                    dispatch(kycReject(id));
                    Swal.fire('Rejected!', 'The KYC request has been rejected.', 'error');
                }
            }
        });
    };

    const handleLogout = () => {
        dispatch(reset());
        adminService.logout("/logout");
        navigate('/');
    };

    const handleViewKYC = (imageUrl: string) => {
        setSelectedImage(imageUrl);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage('');
    };

    const handleApprove = (id: string) => {
        handleStatusChange(id, 'Approved');
    };

    const handleReject = (id: string) => {
        handleStatusChange(id, 'Rejected');
    };

    const totalUsers = users.length;
    const approvedCount = users.filter((user) => user.kycDetails?.status === 'Approved').length;
    const rejectedCount = users.filter((user) => user.kycDetails?.status === 'Rejected').length;
    const pendingCount = users.filter((user) => user.kycDetails?.status === 'pending').length;

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    return (
        <div className="w-full px-4 py-8">
            <div className="flex justify-between items-center mb-6 px-6 py-4 bg-white shadow rounded-lg">
                <div className="flex items-center space-x-4">
                    <h1 className="text-2xl font-semibold text-gray-800">Hello Admin</h1>
                    <div className="h-6 border-l-2 border-gray-300"></div>
                </div>
                <div>
                    <a
                        href="#"
                        onClick={handleLogout}
                        className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                        Logout
                    </a>
                </div>
            </div>

            <div className="mb-6 grid grid-cols-4 gap-6">
                <div className="bg-blue-100 p-6 text-center rounded-lg shadow-lg">
                    <p className="text-lg text-blue-500">Total Users</p>
                    <p className="text-3xl font-bold text-blue-700">{totalUsers}</p>
                </div>
                <div className="bg-green-100 p-6 text-center rounded-lg shadow-lg">
                    <p className="text-lg text-green-500">Approved</p>
                    <p className="text-3xl font-bold text-green-700">{approvedCount}</p>
                </div>
                <div className="bg-red-100 p-6 text-center rounded-lg shadow-lg">
                    <p className="text-lg text-red-500">Rejected</p>
                    <p className="text-3xl font-bold text-red-700">{rejectedCount}</p>
                </div>
                <div className="bg-yellow-100 p-6 text-center rounded-lg shadow-lg">
                    <p className="text-lg text-yellow-500">Pending</p>
                    <p className="text-3xl font-bold text-yellow-700">{pendingCount}</p>
                </div>
            </div>

            <h2 className="text-2xl font-medium mb-6 text-gray-700">Users KYC Status</h2>
            <table className="w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Full Name</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Aadhaar Name</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Status</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Email</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">View Image</th>
                        <th className="py-4 px-6 text-left text-sm font-medium text-gray-600">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id} className="border-b hover:bg-gray-50">
                            <td className="py-4 px-6 text-sm text-gray-800">{user.kycDetails?.fullName || 'Not Submitted kyc'}</td>
                            <td className="py-4 px-6 text-sm text-gray-800">{user.kycDetails?.aadhaarName || 'Not Submitted kyc'}</td>
                            <td className="py-4 px-6 text-sm text-gray-800">{user.kycDetails?.status || 'Not Submitted kyc'}</td>
                            <td className="py-4 px-6 text-sm text-gray-800">{user.email}</td>
                            <td className="py-4 px-6 text-sm text-gray-800">
                                <Button
                                    type="button"
                                    label="View KYC Image"
                                    onClick={() => handleViewKYC(user.kycDetails?.aadhaarImageId || '')}
                                />
                            </td>
                            <td className="py-4 px-6 flex space-x-4">
                                {user.isKycSubmit === "NotSubmitted" ? (
                                    <div></div>
                                ) : (
                                    <>
                                        {(user.kycDetails?.status === "pending" || user.kycDetails?.status === "Rejected") && (
                                            <Button
                                                type="button"
                                                label="Approve"
                                                onClick={() => handleApprove(user._id)}
                                            />
                                        )}
                                        {user.kycDetails?.status === "Approved" && (
                                            <Button
                                                type="button"
                                                label="Reject"
                                                onClick={() => handleReject(user._id)}
                                            />
                                        )}
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-4 rounded-lg">
                        <img src={selectedImage} alt="KYC pending" className="max-w-full max-h-96" />
                        <button
                            onClick={closeModal}
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminHomeForm;
