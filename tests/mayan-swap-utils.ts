import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Redeemed } from "../generated/MayanSwap/MayanSwap"

export function createRedeemedEvent(
  emitterChainId: i32,
  emitterAddress: Bytes,
  sequence: BigInt
): Redeemed {
  let redeemedEvent = changetype<Redeemed>(newMockEvent())

  redeemedEvent.parameters = new Array()

  redeemedEvent.parameters.push(
    new ethereum.EventParam(
      "emitterChainId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(emitterChainId))
    )
  )
  redeemedEvent.parameters.push(
    new ethereum.EventParam(
      "emitterAddress",
      ethereum.Value.fromFixedBytes(emitterAddress)
    )
  )
  redeemedEvent.parameters.push(
    new ethereum.EventParam(
      "sequence",
      ethereum.Value.fromUnsignedBigInt(sequence)
    )
  )

  return redeemedEvent
}
