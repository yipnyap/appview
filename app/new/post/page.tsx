'use client'
import {useState} from 'react'
import {useUserAccountStore} from '@/lib/states'
import UserAvatar from '@/components/shared/user/avatar'
import {Heading, Text} from '@/components/shared/text'
import {Editor} from '@/components/novel'

export default function NewPost() {
    const {user} = useUserAccountStore()
    const [editorIsOpen, setEditorIsOpen] = useState(false)

    return (
        <div className="flex flex-col mx-auto w-full max-w-3xl">
            editorIsOpen: {editorIsOpen ? 'true - editor is mounted! - ' : 'false - '} AI is unavailable <br/>
            user: {user ? 'true' : 'false'} <br/>
            universeConnected: {user?.universeConnected ? 'true' : 'false'}

            <div className="py-14">
                {!editorIsOpen && (
                    <div className="flex items-center w-full bg-n-7 p-4 space-x-4 border rounded-lg"
                         onClick={() => setEditorIsOpen(true)}>
                        <UserAvatar user={user || {
                            id: 1,
                            username: 'johndoe',
                            nickname: 'John Doe',
                            avatar: 'https://cdn.discordapp.com/avatars/96876194712018944/cc2e74005ac5b978e62da06200049385.webp?size=4096',
                        }}
                                    className="inline-flex items-center justify-center h-10 w-10 bg-n-1 rounded overflow-hidden dark:bg-n-7"/>
                        <Heading size="sm" className="text-alt font-semibold">Speak {`'`}yo mind.</Heading>
                    </div>
                )}

                {editorIsOpen && (
                    <div className="flex flex-col justify-center w-full bg-n-7 p-6 space-y-4 border rounded-lg"
                         onClick={() => setEditorIsOpen(true)}>
                        <div className="flex items-center">
                            <UserAvatar user={user || {
                                id: 1,
                                username: 'johndoe',
                                nickname: 'John Doe',
                                avatar: 'https://cdn.discordapp.com/avatars/96876194712018944/cc2e74005ac5b978e62da06200049385.webp?size=4096',
                            }}
                                        className="inline-flex items-center justify-center h-10 w-10 bg-n-1 rounded overflow-hidden dark:bg-n-7"/>
                            <div className="flex flex-col ml-3">
                                <Text>{user?.nickname || 'Not signed in'}</Text>
                                <Text
                                    className="text-alt">{user?.username || '_universe.devsrv.internal.yipnyap.me'}</Text>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <Editor/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
