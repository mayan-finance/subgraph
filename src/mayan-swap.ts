import { Redeemed as RedeemedEvent } from "../generated/MayanSwap/MayanSwap"
import { Redeemed } from "../generated/schema"

export function handleRedeemed(event: RedeemedEvent): void {
  let entity = new Redeemed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.emitterChainId = event.params.emitterChainId
  entity.emitterAddress = event.params.emitterAddress
  entity.sequence = event.params.sequence

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
