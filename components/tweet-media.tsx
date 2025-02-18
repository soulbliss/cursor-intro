'use client'

import {
    type TwitterComponents,
    TweetContainer,
    TweetHeader,
    TweetMedia,
    enrichTweet,
    useTweet
} from 'react-tweet'
import type { Tweet } from 'react-tweet/api'

type Props = {
    tweet: Tweet
    components?: TwitterComponents
}

export const TweetMediaOnly = ({ tweet: t, components }: Props) => {
    const tweet = enrichTweet(t)
    return (
        <TweetContainer>
            <TweetHeader tweet={tweet} components={components} />
            {tweet.mediaDetails?.length ? (
                <TweetMedia tweet={tweet} components={components} />
            ) : null}
        </TweetContainer>
    )
}

export const TweetMediaWrapper = ({ id }: { id: string }) => {
    const { data, error, isLoading } = useTweet(id)

    if (isLoading) {
        return (
            <div className="h-32 bg-accent animate-pulse rounded-md" />
        )
    }

    if (error || !data) {
        return null
    }

    return (
        <div className="w-full overflow-hidden rounded-md">
            <TweetMediaOnly tweet={data} />
        </div>
    )
} 