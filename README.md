# Next13 + WebSockets
A sample implementation of how to handle Websockets with Nextjs 13 `app dir`, `socket.io` and `colyseus`.

#### This is a playground to quickly figure out Nextjs stuff

Testing out these ideas
- A central Typescript typings between all projects
- A central database to be used between all projects
- Handling of websockets in Nextjs
- Handling of auth between Nextjs and Colyseus
- Handling of auth between Nextjs and Socket.io
- Room mgmt between Nextjs and Socket.io
- Room mgmt between Nextjs and Colyseus

## Pointers
To avoid duplicate events, always `socket.off()` on the `useEffect()` cleanup section (return). That prevents memory leaks.

## Setup
Open 3 terminals, run `npm run dev` on all of them.
