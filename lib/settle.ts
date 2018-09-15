import { OffsetStrategy } from './strategies/OffsetStrategy'
import { Recipient } from './Recipient'
import { Pool } from './Pool';

export function settle(
    pool: Pool,
    recipients: Recipient[],
    adjustments: OffsetStrategy[][]
) {
    const { amount } = pool
    const _adjustments = adjustments

    if (adjustments.length > recipients.length) {
        throw new Error('調整的數量太多')
    }

    // 做調整
    for (let i = 0; i < recipients.length; ++i) {
        const recipient = recipients[i]
        const adjustments = _adjustments[i]

        for (const adjustment of adjustments) {
            adjustment.run(pool, recipient)
        }
    }

    console.log(pool.amount, pool.usage)
    for (const recipient of recipients) {
        console.log(`${recipient.name} 要繳 ${recipient.split}`)
    }

    for (const recipient of recipients) {
        console.log(recipient)
    }

    // 分剩下的部分
    const totalShare = recipients.reduce((lhs, rhs) => lhs + rhs.share, 0)
    const eachShare = pool.amount / totalShare
    const eachUsage = pool.usage / totalShare

    console.log(totalShare, eachShare, eachUsage)

    for (const recipient of recipients) {
        console.log(recipient.name, recipient.split, eachShare, recipient.share)

        recipient.split += eachShare * recipient.share
        pool.amount -= eachShare * recipient.share
        pool.usage -= eachUsage * recipient.share

        console.log(recipient.name, recipient.split)
    }

    // 把金額調整到第一個人下
    let allocated = 0
    for (let i = 1; i < recipients.length; ++i) {
        const recipient = recipients[i]
        recipient.split = Math.floor(recipient.split)

        allocated += recipient.split
    }

    recipients[0].split = amount - allocated
}
