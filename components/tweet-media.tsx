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


const isEnrichableTweet = (tweet: unknown): tweet is Tweet => {
    if (!tweet || typeof tweet !== 'object') return false
    const t = tweet as Record<string, any>
    if (!t.user || !t.entities) return false
    const e = t.entities
    return (
        Array.isArray(e.hashtags) &&
        Array.isArray(e.user_mentions) &&
        Array.isArray(e.urls) &&
        Array.isArray(e.symbols)
    )
}

export const TweetMediaOnly = ({ tweet: t, components }: Props) => {
    let tweet
    try {
        if (!isEnrichableTweet(t)) return null
        tweet = enrichTweet(t)
    } catch {
        return null
    }

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