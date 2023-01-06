import {BigInt, Bytes} from "@graphprotocol/graph-ts"
import {LogMessagePublished as LogMessagePublishedEvent,} from "../generated/CoreBridge/CoreBridge"
import {Transfered,} from "../generated/schema"

export function handleLogMessagePublished(
  event: LogMessagePublishedEvent
): void {
  const isForMayan = event.params.sender.toHexString().toLowerCase() == '0x05b70fb5477a93be33822bfb31fdaf2c171970df'
  if(!isForMayan) {
    return;
  }
  const id =  event.transaction.hash.concatI32(event.logIndex.toI32());
  let entity = Transfered.load(id);
  if(!entity) {
    entity = new Transfered(id);
  }
  entity.timestamp = event.block.timestamp;
  entity.blockNumber = event.block.number;
  entity.swapSequence = event.params.sequence;
  entity.transactionHash = event.transaction.hash;
  const transferSeq = Bytes.fromUint8Array(event.params.payload.slice(103, 111));
  const transferSeqBE = Bytes.fromUint8Array(transferSeq.reverse());
  entity.transferSequence = BigInt.fromUnsignedBytes(transferSeqBE);
  entity.save();
}
