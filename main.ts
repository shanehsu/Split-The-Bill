import { Pool } from './lib/Pool'
import { Recipient } from './lib/Recipient'
import { UsageOffsetStrategy } from './lib/strategies/UsageOffsetStrategy'
import { PercentOffsetStrategy } from './lib/strategies/PercentOffsetStrategy'
import { settle } from './lib/settle'

const energy = new Pool('能源', 7868, 1992)

const recipients = [
    new Recipient('徐鵬鈞'),
    new Recipient('楊淯茗'),
    new Recipient('柯冠宇'),
    new Recipient('林佳瑩')
]

const adjustments = [
    [
        new UsageOffsetStrategy(353.5),
        new UsageOffsetStrategy(0.150 * 740 * 2), // 150W 的伺服器
        new PercentOffsetStrategy(0.25)           // 我的電腦比較耗電
    ],
    [
        new UsageOffsetStrategy(188.1),
        new UsageOffsetStrategy(0.150 * 740 * 2)  // 150W 的伺服器
    ],
    [
        new UsageOffsetStrategy(160.9)
    ],
    [
        new UsageOffsetStrategy(69.4)
    ]
]

settle(energy, recipients, adjustments)
for (const recipient of recipients) {
    console.log(`${recipient.name} 要繳 ${recipient.split}`)
}

/**
 * (7868/1992)*(353.5+188.1+160.9+69.4+0.3*740)+3942.294
 */
