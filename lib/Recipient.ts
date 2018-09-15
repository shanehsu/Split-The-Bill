/**
 * 一個付款人
 */
export class Recipient {
    /** 比例 */
    public share: number

    /** 付款的金額 */
    public split: number

    constructor(
        /** 付款人的名字 */ public name: string
    ) {
        this.share = 1
        this.split = 0
    }
}
