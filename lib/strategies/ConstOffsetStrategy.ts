import { OffsetStrategy } from './OffsetStrategy'
import { Pool } from '../Pool'
import { Recipient } from '../Recipient'

export class ConstOffsetStrategy extends OffsetStrategy {
    constructor(
        private adjustment: number
    ) {
        super()
    }
    run(pool: Pool, recipient: Recipient) {
        recipient.split += this.adjustment
        const { amount, usage } = pool

        recipient.split += this.adjustment
        pool.amount -= this.adjustment
        pool.usage -= usage / amount * this.adjustment
    }
}
