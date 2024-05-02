import { useUser } from "contexts/UserContext";
import { MessageReceive } from "proto/protocol/chat/protocol_pb";
import React from "react";

const MessageItem: React.FC<{
    message: MessageReceive
}> = ({ message: { userId, userImageUrl, userName, message, time } }) => {
    const { user } = useUser();

    const isMine = userId === user.uid
    const date = time?.toDate()

    const formattedDate = date ? formatDate(date) : undefined

    return (
        <div className={`flex ${isMine && 'flex-row-reverse'} items-stretch gap-2`}>
            <div className="w-12 h-12">
                {userImageUrl ?
                    <img src={userImageUrl} className="w-12 h-12 rounded-full object-cover" alt="plm" /> :
                    <div className="w-12 h-12 rounded-full bg-purple-300">
                        {userName[0].toUpperCase()}
                    </div>
                }
            </div>
            <div className="flex-1 flex flex-col gap-1">
                <div className="text-xs flex flex-row-reverse justify-between">
                    <p className="pl-2 font-bold">
                        {userName}
                    </p>
                    <p>
                        {formattedDate}
                    </p>
                </div>
                <div className={`flex-1 py-1 px-3 rounded-xl ${isMine ? 'bg-purple-300 text-dark-1' : 'bg-dark-1 text-purple-300'} font-bold`}>
                    {message}
                </div>
            </div>
        </div>
    )
}

export default MessageItem

const MS_IN_SEC = 1000
const SEC_IN_MIN = 60
const MIN_IN_HOUR = 60
const HOUR_IN_DAY = 24
const DAY_IN_WEEK = 7

const lessThanAWeekAgo = (date: Date, now: number): boolean => {
    const lastWeekTime = now - (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY * DAY_IN_WEEK)
    return date.getTime() > lastWeekTime
}

const lessThanADayAgo = (date: Date, now: number): boolean => {
    const lastDayTime = now - (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY)
    return date.getTime() > lastDayTime
}

const lessThanAnHourAgo = (date: Date, now: number): boolean => {
    const lastHourTime = now - (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR)
    return date.getTime() > lastHourTime
}

const lessThanAMinAgo = (date: Date, now: number): boolean => {
    const lastMinTime = now - (MS_IN_SEC * SEC_IN_MIN)
    return date.getTime() > lastMinTime
}

const xDaysAgo = (date: Date, now: number): number => {
    return Math.floor((now - date.getTime()) / (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR * HOUR_IN_DAY))
}

const xHoursAgo = (date: Date, now: number): number => {
    return Math.floor((now - date.getTime()) / (MS_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR))
}

const xMinsAgo = (date: Date, now: number): number => {
    return Math.floor((now - date.getTime()) / (MS_IN_SEC * SEC_IN_MIN))
}

const xSecsAgo = (date: Date, now: number): number => {
    return Math.floor((now - date.getTime()) / (MS_IN_SEC))
}

const formatDate = (date: Date): string => {
    const now = Date.now()
    if (!lessThanAWeekAgo(date, now)) {
        const timeHourMin = date?.toLocaleTimeString()
        const timeMonthDay = date?.toLocaleDateString()
        return `${timeHourMin}, ${timeMonthDay}`
    }

    if (!lessThanADayAgo(date, now)) {
        return `${xDaysAgo(date, now)} days ago`
    }

    if (!lessThanAnHourAgo(date, now)) {
        return `${xHoursAgo(date, now)} hours ago`
    }

    if (!lessThanAMinAgo(date, now)) {
        return `${xMinsAgo(date, now)} mins ago`
    }

    return `${xSecsAgo(date, now)} secs ago`
}
