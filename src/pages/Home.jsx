import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Tasks from '../components/Tasks';
import MainLayout from '../layouts/MainLayout';
import GroupChat from "../components/GroupChat";
import ExternalWebsite from "../components/ExternalSite";
import UserList from "../components/UserList";

const Home = () => {
    const authState = useSelector(state => state.authReducer);
    const { isLoggedIn } = authState;

    useEffect(() => {
        document.title = authState.isLoggedIn ? `${authState.username}'s tasks` : "SLiYp";
    }, [authState]);

    const externalUrl = 'https://user-service-ib7aiys5la-el.a.run.app/';

    // Open the external website in a new tab
    const openWebsiteInNewTab = () => {
        window.open(externalUrl, '_selfn');
    };

    const [activeComponent, setActiveComponent] = useState(null);

    const openUserList = () => {
        setActiveComponent('UserList');
    };

    const openGroupChat = () => {
        setActiveComponent('GroupChat');
    };

    const openTasks = () => {
        setActiveComponent('Tasks');
    };

    return (
        <>
            <MainLayout>
                <div className="flex">
                    <div className="w-1/4 bg-gray-200 p-4">
                        {/* Sidebar */}
                        <h1 className='text-lg'>Welcome {authState.username}</h1>
                        <h2 className='text-lg mt-4'>
                            <button onClick={openUserList}>Open User List</button>
                        </h2>
                        <h3 className='text-lg mt-4'>
                            <button onClick={openGroupChat}>Open Group Chat</button>
                        </h3>
                        <h2 className='text-lg mt-4'>
                            <button onClick={openTasks}>Open User Tasks</button>
                        </h2>
                    </div>
                    <div className="w-3/4 p-4">
                        {/* Main Content */}
                        {isLoggedIn ? (
                            <>
                                <h1 className='text-lg mt-8 border-b border-b-gray-300'>Welcome {authState.username}</h1>
                                {/* Render the active component */}
                                {activeComponent === 'UserList' && <UserList />}
                                {activeComponent === 'GroupChat' && <GroupChat />}
                                {activeComponent === 'Tasks' && <Tasks />}
                            </>
                        ) : (
                            <div className='bg-primary text-white h-[40vh] py-8 text-center'>
                                <h1 className='text-2xl'> Welcome to SLiYp</h1>
                                <Link to="/signup" className='mt-10 text-xl block space-x-2 hover:space-x-4'>
                                    <span className='transition-[margin]'>Join now to manage your tasks</span>
                                    <span className='relative ml-4 text-base transition-[margin]'><i className="fa-solid fa-arrow-right"></i></span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </MainLayout>
        </>
    )
}

export default Home;
