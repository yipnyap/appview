'use client';

import FeedList from '@/components/data-display/feed-list'
import {Heading} from '@/components/shared/text'
import {useResourceStore, useResourceUIStore} from '@/lib/states'
import {useEffect} from 'react'

export default function Home() {
    const {currentResource} = useResourceStore()
    const {loading} = useResourceUIStore()

    useEffect(() => {
        console.log('currentResource', currentResource)
    }, [currentResource])

    return (
        <>
            <div className="flex flex-row items-center justify-between">
                <Heading>Feed</Heading>
            </div>
            {!loading && (
                <>
                    {currentResource.standalone && (
                        <FeedList feedID="Guest" />
                    )}

                    {!currentResource.standalone && (
                        <FeedList feedID={currentResource.id} feedType="pack" />
                    )}
                </>
            )}
        </>
    );
}
