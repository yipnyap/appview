'use client'

import {useState} from 'react'
import {PanelRightClose, PanelRightOpen, SearchIcon} from 'lucide-react'
import {Text} from '@/components/shared/text'
import Tooltip from '@/components/shared/tooltip'
import UserNavbar from '@/components/layout/navbar/user-navbar'

export default function ContextBar() {
    // It's a boolean, but key is stupid.
    const [collapsed, setCollapsed] = useState<any>(false)
    return (
        <div className={`flex h-screen ${collapsed ? 'w-14' : 'w-80'}`}>
            <div className="flex flex-col w-full">
                <div className={`relative flex ${collapsed ? 'flex-col justify-center items-center mt-3' : 'h-14 border-b gap-2'}`}>
                    {collapsed && (
                        <div className="flex items-center gap-2">
                            <UserNavbar/>
                        </div>
                    )}

                    <div className="flex justify-end items-center w-full gap-2 p-3">
                        <div className="flex justify-start items-center gap-1">
                            <Tooltip key={collapsed} content={collapsed ? 'Expand' : 'Collapse'}>
                                <div
                                    className="inline-flex items-center justify-center h-8 w-8 p-1.5 rounded cursor-pointer hover:inner-border hover:inner-border-[#e5e5e5] hover:dark:inner-border-[#2e2e2e] hover:unicorn:inner-border-outline/25"
                                    onClick={() => setCollapsed(!collapsed)}>
                                    {collapsed ? (
                                        <PanelRightOpen className="w-4 h-4"/>
                                    ) : (
                                        <PanelRightClose className="h-6 w-6"/>
                                    )}
                                </div>
                            </Tooltip>
                        </div>

                        {!collapsed && (
                            <>
                                {/* Search button */}
                                <div
                                    className="flex flex-grow items-center py-1.5 px-2 rounded bg-n-1 dark:bg-n-7 cursor-pointer hover:inner-border hover:inner-border-[#e5e5e5] hover:dark:inner-border-[#2e2e2e] hover:unicorn:inner-border-outline/25">
                                    <div className="mr-1.5">
                                        <SearchIcon className="w-3 h-3"/>
                                    </div>
                                    <Text size="sm">Search</Text>
                                </div>

                                {/* User avatar */}
                                <div className="flex justify-end items-center gap-2">
                                    <UserNavbar />
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}