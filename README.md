# Next13 + WebSockets
A sample implementation of how to handle Websockets with Nextjs 13 `app dir`, `socket.io` and `colyseus`.

#### This is a playground to quickly figure out Nextjs stuff

Testing out these ideas
- [x] A central Typescript typings between all projects
- [x] A central database to be used between all projects
- [x] Handling of websockets in Nextjs
- [x] Handling of auth between Nextjs and Colyseus
- [ ] Handling of auth between Nextjs and Socket.io
- [ ] Room mgmt between Nextjs and Socket.io
- [x] Room mgmt between Nextjs and Colyseus

## Pointers
- To avoid duplicate events on `socket.io`, always `socket.off()` on the `useEffect()` cleanup section (return). That prevents memory leaks.
- To avoid duplicate events/memory leakage on `colyseus`, refactor the `onJoin` so it can be run on the `cleanup` part in `useEffect`


## Setup
Run `pnpm i` on all 3 projects (i.e.`colyseus`,`nextjs`,`socketio`)
Open 3 terminals, run `npm run dev` on all of them.
