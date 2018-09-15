import { OffsetStrategy } from './OffsetStrategy'
import { Pool } from '../Pool'
import { Recipient } from '../Recipient'

export class PercentOffsetStrategy extends OffsetStrategy {
    constructor(
        private adjustment: number
    ) {
        super()
    }
    run(pool: Pool, recipient: Recipient) {
        recipient.share *= 1.0 + this.adjustment
    }
}
