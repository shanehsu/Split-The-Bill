import { OffsetStrategy } from './OffsetStrategy'
import { Pool } from '../Pool'
import { Recipient } from '../Recipient'

export class UsageOffsetStrategy extends OffsetStrategy {
    constructor(
        private adjustment: number
    ) {
        super()
    }
    run(pool: Pool, recipient: Recipient) {
        const { amount, usage } = pool

        recipient.split += amount / usage * this.adjustment
        pool.usage -= this.adjustment
        pool.amount -= amount / usage * this.adjustment
    }
}
