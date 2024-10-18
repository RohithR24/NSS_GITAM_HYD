"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { 
  Users, FileText, Bell, Handshake, 
  Settings, LogOut, ChevronRight 
} from 'lucide-react'



interface ActivityProps{

    action: string;
    user: string;
    time: string;
}

interface DashBoardProps{
    title: string;
    icon: React.JSX.Element;
    count: number;
    link: string;
}

interface QuickActionProps{
    title: string;
    icon: React.JSX.Element;
    count: number;
    link: string;
}

const DashboardCard = ( {title, icon, count, link}:DashBoardProps ) => (
  <div className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow">
    <div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-3xl font-bold text-blue-600 mt-2">{count}</p>
    </div>
    <div className="text-blue-500">{icon}</div>
  </div>
)

const QuickAction = ( {title, icon, link }: QuickActionProps) => (
  <a 
    href={link} 
    className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:bg-blue-50 transition-colors"
  >
    <div className="flex items-center">
      <div className="mr-4 text-blue-500">{icon}</div>
      <span className="font-medium text-gray-700">{title}</span>
    </div>
    <ChevronRight className="text-gray-400" />
  </a>
)

export default function AdminDashboard() {
 
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [dashboardData, setDashboardData] = useState<DashBoardProps[]>()
  const [recentActivity, setRecentActivity]  = useState<ActivityProps[]>()

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const data = [
          { title: 'Team Members', icon: <Users size={24} />, count: 15, link: '/admin/team' },
          { title: 'Initiatives', icon: <FileText size={24} />, count: 8, link: '/admin/initiatives' },
          { title: 'Announcements', icon: <Bell size={24} />, count: 3, link: '/admin/announcements' },
          { title: 'Collaborations', icon: <Handshake size={24} />, count: 5, link: '/admin/collaborations' },
        ]
        setDashboardData(data)

        const activity = [
          { action: 'Added new team member', user: 'John Doe', time: '2 hours ago' },
          { action: 'Updated initiative details', user: 'Jane Smith', time: '4 hours ago' },
          { action: 'Posted new announcement', user: 'Mike Johnson', time: '1 day ago' },
          { action: 'Added new collaboration', user: 'Sarah Williams', time: '2 days ago' },
        ]
        setRecentActivity(activity)

        setIsLoading(false)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
        setError('Failed to load dashboard data. Please try again.')
        setIsLoading(false)
      }
    }

    fetchDashboardData()
  }, [])

  const quickActions = [
    { title: 'Add New Team Member', icon: <Users size={20} />, link: '/admin/team/new' },
    { title: 'Create New Initiative', icon: <FileText size={20} />, link: '/admin/initiatives/new' },
    { title: 'Post Announcement', icon: <Bell size={20} />, link: '/admin/announcements/new' },
    { title: 'Add Collaboration', icon: <Handshake size={20} />, link: '/admin/collaborations/new' },
  ]

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/nss-logo.png" alt="NSS Logo" />
                <span className="ml-2 text-xl font-semibold text-gray-800">NSS Admin</span>
              </div>
            </div>
            <div className="flex items-center">
              <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Settings size={20} />
              </button>
              <button 
                //onClick={() => router.push('/logout')}
                className="ml-4 p-2 rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            { dashboardData && dashboardData.map((item, index) => (
              <DashboardCard key={index} {...item} />
            ))}
          </div>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {quickActions && quickActions.map((action, index) => (
              <QuickAction count={0} key={index} {...action} />
            ))}
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
              <ul className="divide-y divide-gray-200">
                {recentActivity && recentActivity.map((item, index) => (
                  <li key={index}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">{item.action}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {item.time}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <Users className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {item.user}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}