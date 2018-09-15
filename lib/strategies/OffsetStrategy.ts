import { Recipient } from './../Recipient'
import { Pool } from './../Pool';

export abstract class OffsetStrategy {
    run(pool: Pool, recipient: Recipient) {
        throw new Error('只能使用子類別的方法')
    }

    constructor() { }
}
