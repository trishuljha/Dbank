import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory } from './dbank.did.js';
export { idlFactory } from './dbank.did.js';

export const canisterId = process.env.DBANK_CANISTER_ID;

const agentOptions = {
  verifyQuerySignatures: false,
};

const agent = new HttpAgent(agentOptions);

if (process.env.NODE_ENV !== "production") {
  agent.fetchRootKey().catch(err => {
    console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
    console.error(err);
  });
}

export const createActor = (canisterId, options = {}) => {
  const agentOptions = { verifyQuerySignatures: false, ...options?.agentOptions };
  const agent = new HttpAgent(agentOptions);
  
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...options?.actorOptions,
  });
};

export const dbank = createActor(canisterId);
