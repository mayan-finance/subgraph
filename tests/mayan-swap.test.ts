import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, BigInt } from "@graphprotocol/graph-ts"
import { Redeemed } from "../generated/schema"
import { Redeemed as RedeemedEvent } from "../generated/MayanSwap/MayanSwap"
import { handleRedeemed } from "../src/mayan-swap"
import { createRedeemedEvent } from "./mayan-swap-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let emitterChainId = 123
    let emitterAddress = Bytes.fromI32(1234567890)
    let sequence = BigInt.fromI32(234)
    let newRedeemedEvent = createRedeemedEvent(
      emitterChainId,
      emitterAddress,
      sequence
    )
    handleRedeemed(newRedeemedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("Redeemed created and stored", () => {
    assert.entityCount("Redeemed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "Redeemed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "emitterChainId",
      "123"
    )
    assert.fieldEquals(
      "Redeemed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "emitterAddress",
      "1234567890"
    )
    assert.fieldEquals(
      "Redeemed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "sequence",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
